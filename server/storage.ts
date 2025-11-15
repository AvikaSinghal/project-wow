import { sessions, messages, users, type Session, type Message, type User, type InsertSession, type InsertMessage, type InsertUser, type ChatSession, type ChatMessage } from "@shared/schema";
import { db } from "./db";
import { eq, desc, isNull } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserById(userId: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  updateUser(userId: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  validatePassword(user: User, password: string): Promise<boolean>;

  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getSession(sessionId: number): Promise<Session | undefined>;
  getAllSessions(): Promise<Session[]>;
  getUserSessions(userId: number): Promise<Session[]>;
  getGuestSessions(): Promise<Session[]>;
  getSessionsByToken(sessionToken: string): Promise<Session[]>;
  updateSession(sessionId: number, updates: Partial<InsertSession>): Promise<Session | undefined>;
  deleteSession(sessionId: number): Promise<boolean>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySession(sessionId: number): Promise<Message[]>;
  deleteMessage(messageId: number): Promise<boolean>;

  // Combined operations
  getSessionsWithMessages(): Promise<ChatSession[]>;
  getUserSessionsWithMessages(userId: number): Promise<ChatSession[]>;
  getSessionsWithMessagesByToken(sessionToken: string): Promise<ChatSession[]>;
  getSessionWithMessages(sessionId: number): Promise<ChatSession | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        passwordHash: hashedPassword,
      })
      .returning();
    return user;
  }

  async getUserById(userId: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async updateUser(userId: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHash);
  }

  // Session operations
  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db.insert(sessions).values(session).returning();
    return newSession;
  }

  async getSession(sessionId: number): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    return session;
  }

  async getAllSessions(): Promise<Session[]> {
    return await db.select().from(sessions).orderBy(desc(sessions.updatedAt));
  }

  async getUserSessions(userId: number): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(desc(sessions.updatedAt));
  }

  async getGuestSessions(): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(isNull(sessions.userId))
      .orderBy(desc(sessions.updatedAt));
  }

  async getSessionsByToken(sessionToken: string): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
      .orderBy(desc(sessions.updatedAt));
  }





  async updateSession(sessionId: number, updates: Partial<InsertSession>): Promise<Session | undefined> {
    const [session] = await db
      .update(sessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(sessions.id, sessionId))
      .returning();
    return session;
  }

  async deleteSession(sessionId: number): Promise<boolean> {
    // Delete all messages for this session first
    await db.delete(messages).where(eq(messages.sessionId, sessionId));
    
    // Delete the session
    const result = await db.delete(sessions).where(eq(sessions.id, sessionId));
    return (result.rowCount ?? 0) > 0;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessagesBySession(sessionId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.sessionId, sessionId))
      .orderBy(messages.timestamp);
  }

  async deleteMessage(messageId: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, messageId));
    return (result.rowCount ?? 0) > 0;
  }

  // Combined operations
  async getSessionsWithMessages(): Promise<ChatSession[]> {
    const sessionsArray = await this.getAllSessions();
    
    return Promise.all(
      sessionsArray.map(async (session) => {
        const sessionMessages = await this.getMessagesBySession(session.id);
        return {
          ...session,
          messages: sessionMessages.map(msg => ({
            id: msg.id,
            content: msg.content,
            role: msg.role as "user" | "assistant",
            timestamp: msg.timestamp,
            isCrisisDetected: msg.isCrisisDetected || false,
          })),
        };
      })
    );
  }

  async getUserSessionsWithMessages(userId: number): Promise<ChatSession[]> {
    const userSessions = await this.getUserSessions(userId);
    
    return Promise.all(
      userSessions.map(async (session) => {
        const sessionMessages = await this.getMessagesBySession(session.id);
        return {
          ...session,
          messages: sessionMessages.map(msg => ({
            id: msg.id,
            content: msg.content,
            role: msg.role as "user" | "assistant",
            timestamp: msg.timestamp,
            isCrisisDetected: msg.isCrisisDetected || false,
          })),
        };
      })
    );
  }

  async getSessionsWithMessagesByToken(sessionToken: string): Promise<ChatSession[]> {
    const tokenSessions = await this.getSessionsByToken(sessionToken);
    
    return Promise.all(
      tokenSessions.map(async (session) => {
        const sessionMessages = await this.getMessagesBySession(session.id);
        return {
          ...session,
          messages: sessionMessages.map(msg => ({
            id: msg.id,
            content: msg.content,
            role: msg.role as "user" | "assistant",
            timestamp: msg.timestamp,
            isCrisisDetected: msg.isCrisisDetected || false,
          })),
        };
      })
    );
  }

  async getSessionWithMessages(sessionId: number): Promise<ChatSession | undefined> {
    const session = await this.getSession(sessionId);
    if (!session) return undefined;

    const sessionMessages = await this.getMessagesBySession(sessionId);
    return {
      ...session,
      messages: sessionMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role as "user" | "assistant",
        timestamp: msg.timestamp,
        isCrisisDetected: msg.isCrisisDetected || false,
      })),
    };
  }
}

export const storage = new DatabaseStorage();