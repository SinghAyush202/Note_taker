import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { Note } from "../models/Note";

const router = Router();
router.use(requireAuth);

// List
router.get("/", async (req, res) => {
  const userId = (req as any).user.sub as string;
  const notes = await Note.find({ userId }).sort({ createdAt: -1 });
  res.json({ notes });
});

// Create
router.post("/", async (req, res) => {
  try {
    const userId = (req as any).user.sub as string;
    const { title, content } = z.object({
      title: z.string().max(120).optional(),
      content: z.string().min(1).max(5000)
    }).parse(req.body);

    const note = await Note.create({ userId, title, content });
    res.status(201).json({ note });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || "Invalid input" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { id } = req.params;

  const result = await Note.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Note not found" });
  res.json({ ok: true });
});

export default router;
