

import sgMail from '@sendgrid/mail';
import { env } from "../env";

if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
}

export async function sendOtpEmailSendGrid(to: string, code: string): Promise<void> {
  if (!env.SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not configured");
  }

  const msg = {
    to,
    from: env.SMTP_FROM || 'noreply@yourdomain.com',
    subject: 'Your Notes App Verification Code',
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
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[DEBUG] OTP email sent via SendGrid to ${to}`);
  } catch (error) {
    console.error('[ERROR] SendGrid email failed:', error);
    throw error;
  }
}