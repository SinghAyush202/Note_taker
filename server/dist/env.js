import { z } from "zod";
import "dotenv/config";
export const env = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(4000),
    FRONTEND_URL: z.string().url(),
    MONGO_URI: z.string().url(),
    JWT_SECRET: z.string().min(16),
    // Email configuration
    EMAIL_PROVIDER: z.enum(["maildev", "gmail", "sendgrid"]).default("maildev"),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().optional(),
    // SendGrid API Key (alternative to SMTP)
    SENDGRID_API_KEY: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().min(10)
}).parse(process.env);
