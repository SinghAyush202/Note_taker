import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import notesRoutes from "./routes/notes";
import { env } from "./env";
export function buildApp() {
    const app = express();
    app.use(helmet());
    app.use(cors({ origin: env.FRONTEND_URL }));
    app.use(express.json());
    app.get("/api/health", (_req, res) => res.json({ ok: true }));
    app.use("/api/auth", authRoutes);
    app.use("/api/notes", notesRoutes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, _req, res, _next) => {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    });
    return app;
}
