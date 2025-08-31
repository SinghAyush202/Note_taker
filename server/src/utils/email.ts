import nodemailer from "nodemailer";
import crypto from "crypto";
import { env } from "../env";

export function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

let transporter: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  
  console.log("[DEBUG] SMTP Config:", {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER ? env.SMTP_USER.substring(0, 5) + "***" : "none",
    env: env.NODE_ENV
  });
  
  if (env.SMTP_HOST && env.SMTP_PORT) {
    const isGmail = env.SMTP_HOST.includes('gmail');
    
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: env.SMTP_USER && env.SMTP_PASS ? {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      } : undefined,
      
      ...(isGmail && {
        service: 'gmail',
        tls: {
          rejectUnauthorized: false
        }
      })
    });
    
    console.log(`[DEBUG] Created ${isGmail ? 'Gmail' : 'SMTP'} transporter`);
  } else {
    console.log("[DEBUG] No SMTP config, using console fallback");
    transporter = null;
  }
  
  return transporter;
}

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  const t = getTransporter();
  
  if (!t) {
    console.log(`[DEV] OTP for ${to}: ${code}`);
    return;
  }

  const fromEmail = env.SMTP_FROM || "Notes App <no-reply@notes.local>";
  
  try {
    console.log(`[DEBUG] Sending OTP email to ${to}...`);
    
    const result = await t.sendMail({
      from: fromEmail,
      to,
      subject: "Your Notes App Verification Code",
      text: `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1f2937; margin: 0; font-size: 24px;">Notes App</h1>
            </div>
            
            <div style="text-align: center;">
              <h2 style="color: #374151; margin-bottom: 20px; font-size: 20px;">Verify Your Email</h2>
              <p style="color: #6b7280; margin-bottom: 30px; font-size: 16px;">
                Enter this verification code in the app:
              </p>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 20px; margin: 30px 0;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: white; font-family: monospace;">
                  ${code}
                </span>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                This code will expire in <strong>10 minutes</strong>
              </p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px;">
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
          </div>
        </div>
      `
    });
    
    console.log(`[DEBUG] OTP email sent successfully to ${to}. MessageId: ${result.messageId}`);
  } catch (error) {
    console.error("[ERROR] Failed to send email:", error);
    throw new Error("Failed to send verification email");
  }
}