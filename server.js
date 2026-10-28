import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false
});
app.use(generalLimiter);

app.use((req, res, next) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const origin = req.get("origin");
  if (origin && allowedOrigin && origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "al-amine-internal-ai", stage: "starter" });
});

// Private staff-only API protection. This is a development scaffold, not
// a replacement for production identity, role-based access, or audit logs.
function requireInternalAccess(req, res, next) {
  const configuredToken = process.env.INTERNAL_API_TOKEN;
  const auth = req.get("authorization") || "";
  if (!configuredToken || configuredToken.length < 32) {
    return res.status(503).json({ error: "Private API is not configured securely." });
  }
  const providedToken = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!providedToken || providedToken !== configuredToken) {
    return res.status(404).json({ error: "Not found." });
  }
  next();
}

const taskSchema = z.object({
  taskType: z.enum([
    "draft_document",
    "prepare_cv",
    "prepare_letter",
    "prepare_presentation",
    "create_qr_code",
    "review_order"
  ]),
  orderId: z.string().trim().min(1).max(100),
  instructions: z.string().trim().min(10).max(10000)
}).strict();

// No public AI-chat endpoint is exposed. These routes are private staff routes.
// They intentionally return "not implemented" until real AI tools, permissions,
// file-generation functions, and audit logging have been implemented and tested.
app.post("/internal/ai/tasks", requireInternalAccess, (req, res) => {
  const parsed = taskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid task details.",
      issues: parsed.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message
      }))
    });
  }

  return res.status(501).json({
    error: "AI task execution is not implemented yet.",
    status: "scaffold_only",
    acceptedTaskType: parsed.data.taskType,
    orderId: parsed.data.orderId
  });
});

app.use((err, _req, res, _next) => {
  // Do not return stack traces, tokens, or internal error details to clients.
  if (!isProduction) console.error("Request failed:", err?.message || "unknown error");
  res.status(500).json({ error: "An unexpected server error occurred." });
});

app.listen(port, () => {
  console.log(`AL-Amine internal AI starter listening on port ${port}`);
});
