import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  picture: { type: String },
  provider: { type: String, enum: ["local", "google"], default: "local" }
}, { timestamps: true });

export type UserDoc = {
  _id: string, email: string, name?: string, picture?: string, provider: "local" | "google"
}

export const User = model("User", userSchema);
