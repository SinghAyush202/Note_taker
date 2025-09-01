import { Schema, model, Types } from "mongoose";
const noteSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    title: { type: String },
    content: { type: String, required: true }
}, { timestamps: true });
export const Note = model("Note", noteSchema);
