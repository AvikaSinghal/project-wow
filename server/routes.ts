import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateTherapeuticResponse, generateSessionTitle } from "./services/therapeutic-responses";
import { insertSessionSchema, insertMessageSchema, loginSchema, registerSchema } from "@shared/schema";
import { authenticateToken, optionalAuth, generateToken, type AuthRequest } from "./auth";
import cookieParser from "cookie-parser";
import session from "express-session";
import { sessionManager } from "./session-manager";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());
  
  // Configure session middleware for guest session tracking
  app.use(session({
    secret: 'wishes-on-windmills-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const user = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        passwordHash: validatedData.password, // Will be hashed in storage
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      });

      const token = generateToken(user.id, user.username, user.email);
      
      res.json({
        message: "User registered successfully",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await storage.validatePassword(user, validatedData.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user.id, user.username, user.email);
      
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid login data", errors: error.errors });
      } else {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Failed to login" });
      }
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUserById(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Session routes (updated to support user authentication)
  // Get all sessions (with proper user/guest filtering)
  app.get("/api/sessions", optionalAuth, async (req: AuthRequest, res) => {
    try {
      if (req.user) {
        // Return user's sessions if authenticated
        const sessions = await storage.getUserSessions(req.user.id);
        res.json(sessions);
      } else {
        // For guest users, return only sessions for this browser session
        const browserSessionId = req.session.id;
        const sessions = await storage.getSessionsByToken(browserSessionId);
        res.json(sessions);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Create new session
  app.post("/api/sessions", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      const sessionData = {
        ...validatedData,
        userId: req.user ? req.user.id : null, // null for guest sessions
        sessionToken: req.user ? null : req.session.id // store browser session ID for guests
      };
      const session = await storage.createSession(sessionData);
      
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid session data", errors: error.errors });
      } else {
        console.error("Error creating session:", error);
        res.status(500).json({ message: "Failed to create session" });
      }
    }
  });

  // Get session with messages (with ownership verification)
  app.get("/api/sessions/:id", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      if (isNaN(sessionId)) {
        return res.status(400).json({ message: "Invalid session ID" });
      }

      const session = await storage.getSessionWithMessages(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Verify ownership for security
      if (req.user) {
        // For authenticated users, check user ownership
        if (session.userId !== req.user.id) {
          return res.status(403).json({ message: "Access denied" });
        }
      } else {
        // For guest users, check browser session token
        const sessionData = await storage.getSession(sessionId);
        if (sessionData?.sessionToken !== req.session.id) {
          return res.status(403).json({ message: "Access denied" });
        }
      }

      res.json(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  // Send message to AI and save conversation
  app.post("/api/sessions/:id/messages", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      if (isNaN(sessionId)) {
        return res.status(400).json({ message: "Invalid session ID" });
      }

      const { content } = req.body;
      if (!content || typeof content !== "string") {
        return res.status(400).json({ message: "Message content is required" });
      }

      // Check if session exists
      const session = await storage.getSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Get conversation history
      const existingMessages = await storage.getMessagesBySession(sessionId);
      const conversationHistory = existingMessages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));

      // Save user message
      const userMessage = await storage.createMessage({
        sessionId,
        content,
        role: "user",
        isCrisisDetected: false
      });

      // Generate AI response
      const aiResponse = await generateTherapeuticResponse(content, conversationHistory);

      // Save AI message
      const assistantMessage = await storage.createMessage({
        sessionId,
        content: aiResponse.response,
        role: "assistant",
        isCrisisDetected: aiResponse.isCrisisDetected
      });

      // Generate session title if this is the first exchange
      if (existingMessages.length === 0) {
        const title = await generateSessionTitle([
          { role: "user", content },
          { role: "assistant", content: aiResponse.response }
        ]);
        await storage.updateSession(sessionId, { title });
      }

      res.json({
        userMessage: {
          id: userMessage.id,
          content: userMessage.content,
          role: userMessage.role,
          timestamp: userMessage.timestamp,
          isCrisisDetected: userMessage.isCrisisDetected
        },
        assistantMessage: {
          id: assistantMessage.id,
          content: assistantMessage.content,
          role: assistantMessage.role,
          timestamp: assistantMessage.timestamp,
          isCrisisDetected: assistantMessage.isCrisisDetected
        },
        isCrisisDetected: aiResponse.isCrisisDetected,
        suggestedResources: aiResponse.suggestedResources
      });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Get all sessions with messages (for session history)
  app.get("/api/sessions-with-messages", optionalAuth, async (req: AuthRequest, res) => {
    try {
      let sessions;
      if (req.user) {
        // Get sessions for authenticated user
        sessions = await storage.getUserSessionsWithMessages(req.user.id);
      } else {
        // For guest users, get only sessions for this browser session
        const browserSessionId = req.session.id;
        sessions = await storage.getSessionsWithMessagesByToken(browserSessionId);
      }
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions with messages:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Delete session (with ownership verification)
  app.delete("/api/sessions/:id", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      if (isNaN(sessionId)) {
        return res.status(400).json({ message: "Invalid session ID" });
      }

      const session = await storage.getSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Verify ownership for security
      if (req.user) {
        // For authenticated users, check user ownership
        if (session.userId !== req.user.id) {
          return res.status(403).json({ message: "Access denied" });
        }
      } else {
        // For guest users, check browser session token
        if (session.sessionToken !== req.session.id) {
          return res.status(403).json({ message: "Access denied" });
        }
      }

      const deleted = await storage.deleteSession(sessionId);
      if (deleted) {
        res.json({ message: "Session deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete session" });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      res.status(500).json({ message: "Failed to delete session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
