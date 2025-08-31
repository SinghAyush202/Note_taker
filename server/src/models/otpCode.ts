// Enhanced models/OtpCode.ts
import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  email: { type: String, index: true, required: true },
  codeHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: true },
  consumed: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 5 }
}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpCode = model("OtpCode", otpSchema);
