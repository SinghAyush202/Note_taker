import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { User } from "../models/User";
import { OtpCode } from "../models/otpCode";
import { sendOtpEmail, sha256 } from "../utils/email";
import { OAuth2Client } from "google-auth-library";
const router = Router();
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
function sign(userId, email) {
    return jwt.sign({ sub: userId, email }, env.JWT_SECRET, { expiresIn: "7d" });
}
// Request OTP
router.post("/request-otp", async (req, res) => {
    try {
        const { email } = z.object({
            email: z.string().email().toLowerCase()
        }).parse(req.body);
        console.log("[DEBUG] Processing OTP request for:", email);
        // Invalidate existing OTPs
        await OtpCode.updateMany({ email, consumed: false }, { $set: { consumed: true } });
        console.log("[DEBUG] Cleared old OTPs");
        // Generate new OTP
        const code = `${Math.floor(100000 + Math.random() * 900000)}`;
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Store OTP
        await OtpCode.create({
            email,
            codeHash: sha256(code),
            expiresAt,
            consumed: false
        });
        console.log("[DEBUG] Created new OTP record");
        // Send email
        await sendOtpEmail(email, code);
        console.log("[DEBUG] Email sent successfully");
        res.json({ message: "OTP sent. Check your inbox." });
    }
    catch (e) {
        console.error("[ERROR] Request OTP failed:", e);
        if (e.issues && e.issues.length > 0) {
            return res.status(400).json({ error: e.issues[0].message });
        }
        res.status(400).json({ error: e?.message || "Invalid request" });
    }
});
// Verify OTP (signup/login)
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, code: rawCode, name } = z.object({
            email: z.string().email().toLowerCase(),
            code: z.string().min(1, "OTP is required"),
            name: z.string().min(1).max(100).optional()
        }).parse(req.body);
        console.log("[DEBUG] Verifying OTP for:", email);
        // Clean and validate the code manually
        const code = rawCode.replace(/\D/g, '');
        if (code.length !== 6) {
            return res.status(400).json({ error: "OTP must be 6 digits" });
        }
        console.log("[DEBUG] Cleaned code length:", code.length);
        // Find the most recent non-consumed OTP
        const found = await OtpCode.findOne({
            email,
            consumed: false
        }).sort({ createdAt: -1 });
        if (!found) {
            console.log("[DEBUG] No OTP found for email:", email);
            return res.status(400).json({ error: "No OTP found. Request a new one." });
        }
        // Check expiration
        if (found.expiresAt.getTime() < Date.now()) {
            console.log("[DEBUG] OTP expired for:", email);
            return res.status(400).json({ error: "OTP expired. Request a new one." });
        }
        // Verify the code
        const hashedCode = sha256(code);
        if (found.codeHash !== hashedCode) {
            console.log("[DEBUG] Invalid OTP for:", email);
            return res.status(400).json({ error: "Incorrect OTP." });
        }
        // Mark as consumed
        found.consumed = true;
        await found.save();
        console.log("[DEBUG] OTP consumed successfully");
        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
            const defaultName = name || email.split("@")[0];
            user = await User.create({
                email,
                name: defaultName,
                provider: "local"
            });
            console.log("[DEBUG] Created new user:", user._id);
        }
        else {
            console.log("[DEBUG] Found existing user:", user._id);
            // Update name if provided and user doesn't have one
            if (name && !user.name) {
                user.name = name;
                await user.save();
            }
        }
        // Generate token
        const token = sign(user.id, user.email);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                provider: user.provider
            }
        });
    }
    catch (e) {
        console.error("[ERROR] Verify OTP failed:", e);
        if (e.issues && e.issues.length > 0) {
            return res.status(400).json({ error: e.issues[0].message });
        }
        res.status(400).json({ error: e?.message || "Invalid request" });
    }
});
// Google Sign-in: verify ID token
router.post("/google-verify", async (req, res) => {
    try {
        const { credential } = z.object({
            credential: z.string().min(10)
        }).parse(req.body);
        console.log("[DEBUG] Verifying Google credential");
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload?.email) {
            console.log("[DEBUG] Google verification failed - no email");
            return res.status(400).json({ error: "Google verification failed." });
        }
        console.log("[DEBUG] Google user verified:", payload.email);
        // Find or create user
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = await User.create({
                email: payload.email,
                name: payload.name || payload.email.split("@")[0],
                picture: payload.picture,
                provider: "google"
            });
            console.log("[DEBUG] Created new Google user:", user._id);
        }
        else {
            console.log("[DEBUG] Found existing Google user:", user._id);
        }
        const token = sign(user.id, user.email);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                provider: user.provider
            }
        });
    }
    catch (e) {
        console.error("[ERROR] Google verify failed:", e);
        res.status(400).json({
            error: "Google verification failed"
        });
    }
});
// Current user
router.get("/me", async (req, res) => {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : "";
    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                provider: user.provider
            }
        });
    }
    catch (error) {
        console.error("[ERROR] Auth verification failed:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
});
export default router;
