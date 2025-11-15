// Session manager for guest users - maps browser sessions to chat sessions
// This provides ChatGPT-like behavior where each browser session has its own chat history

interface GuestSessionData {
  sessionIds: number[];
  lastAccessed: Date;
}

class SessionManager {
  private guestSessions: Map<string, GuestSessionData> = new Map();
  
  // Clean up old sessions every hour
  constructor() {
    setInterval(() => this.cleanupOldSessions(), 60 * 60 * 1000);
  }
  
  // Add a session to a guest's browser session
  addSessionToGuest(browserSessionId: string, chatSessionId: number): void {
    const existing = this.guestSessions.get(browserSessionId) || { 
      sessionIds: [], 
      lastAccessed: new Date() 
    };
    
    if (!existing.sessionIds.includes(chatSessionId)) {
      existing.sessionIds.push(chatSessionId);
    }
    existing.lastAccessed = new Date();
    
    this.guestSessions.set(browserSessionId, existing);
  }
  
  // Get all sessions for a guest's browser session
  getGuestSessions(browserSessionId: string): number[] {
    const data = this.guestSessions.get(browserSessionId);
    if (data) {
      data.lastAccessed = new Date();
      return data.sessionIds;
    }
    return [];
  }
  
  // Remove old sessions (older than 24 hours)
  private cleanupOldSessions(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    Array.from(this.guestSessions.entries()).forEach(([sessionId, data]) => {
      if (data.lastAccessed < cutoff) {
        this.guestSessions.delete(sessionId);
      }
    });
  }
}

export const sessionManager = new SessionManager();