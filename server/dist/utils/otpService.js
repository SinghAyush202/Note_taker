import crypto from "crypto";
import { OtpCode } from "../models/otpCode";
import { sendOtpEmail } from "./email";
export class OTPService {
    static OTP_EXPIRY_MINUTES = 10;
    static MAX_ATTEMPTS = 5;
    static RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
    static MAX_OTPS_PER_HOUR = 3;
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static hashCode(code) {
        return crypto.createHash("sha256").update(code).digest("hex");
    }
    static async canSendOTP(email) {
        const oneHourAgo = new Date(Date.now() - this.RATE_LIMIT_WINDOW);
        const recentOTPs = await OtpCode.countDocuments({
            email,
            createdAt: { $gte: oneHourAgo }
        });
        if (recentOTPs >= this.MAX_OTPS_PER_HOUR) {
            return {
                allowed: false,
                message: `Too many OTP requests. Please try again in an hour.`
            };
        }
        return { allowed: true };
    }
    static async requestOTP(email) {
        try {
            // Check rate limiting
            const rateLimitCheck = await this.canSendOTP(email);
            if (!rateLimitCheck.allowed) {
                return { success: false, message: rateLimitCheck.message };
            }
            // Invalidate existing OTPs
            await OtpCode.updateMany({ email, consumed: false }, { $set: { consumed: true } });
            // Generate new OTP
            const code = this.generateOTP();
            const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
            // Store OTP
            await OtpCode.create({
                email,
                codeHash: this.hashCode(code),
                expiresAt,
                consumed: false,
                attempts: 0,
                maxAttempts: this.MAX_ATTEMPTS
            });
            // Send email
            await sendOtpEmail(email, code);
            return {
                success: true,
                message: "OTP sent successfully. Check your email."
            };
        }
        catch (error) {
            console.error("OTP request error:", error);
            return {
                success: false,
                message: "Failed to send OTP. Please try again."
            };
        }
    }
    static async verifyOTP(email, code) {
        try {
            const otpRecord = await OtpCode.findOne({
                email,
                consumed: false
            }).sort({ createdAt: -1 });
            if (!otpRecord) {
                return {
                    success: false,
                    message: "No valid OTP found. Please request a new one."
                };
            }
            // Check expiration
            if (otpRecord.expiresAt.getTime() < Date.now()) {
                return {
                    success: false,
                    message: "OTP has expired. Please request a new one."
                };
            }
            // Check max attempts
            if (otpRecord.attempts >= otpRecord.maxAttempts) {
                await OtpCode.updateOne({ _id: otpRecord._id }, { $set: { consumed: true } });
                return {
                    success: false,
                    message: "Maximum attempts exceeded. Please request a new OTP."
                };
            }
            // Verify code
            const hashedCode = this.hashCode(code);
            if (otpRecord.codeHash !== hashedCode) {
                // Increment attempts
                await OtpCode.updateOne({ _id: otpRecord._id }, { $inc: { attempts: 1 } });
                const remainingAttempts = otpRecord.maxAttempts - (otpRecord.attempts + 1);
                return {
                    success: false,
                    message: "Invalid OTP code.",
                    remainingAttempts: Math.max(0, remainingAttempts)
                };
            }
            // Mark as consumed
            await OtpCode.updateOne({ _id: otpRecord._id }, { $set: { consumed: true } });
            return {
                success: true,
                message: "OTP verified successfully."
            };
        }
        catch (error) {
            console.error("OTP verification error:", error);
            return {
                success: false,
                message: "Failed to verify OTP. Please try again."
            };
        }
    }
}
