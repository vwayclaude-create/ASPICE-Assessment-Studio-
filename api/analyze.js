// Vercel Serverless Function — harness-driven per-process evaluation.
// Replaces the old generic OpenAI chat proxy. Still protected by Supabase JWT.
import { jwtVerify } from "jose";
import { handleEvaluate } from "./_harnessService.js";

const jwtSecret = process.env.SUPABASE_JWT_SECRET
  ? new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)
  : null;

async function verifySupabaseJwt(req) {
  if (!jwtSecret) return { ok: true, skipped: true };
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || !header.startsWith("Bearer ")) return { ok: false, reason: "no_token" };
  const token = header.slice(7).trim();
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return { ok: true, payload };
  } catch {
    return { ok: false, reason: "invalid_token" };
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const auth = await verifySupabaseJwt(req);
  if (!auth.ok) return res.status(401).json({ error: "Unauthorized. Sign in required." });

  try {
    const { legacy, verdict } = await handleEvaluate(req.body || {}, process.env);
    return res.status(200).json({ ...legacy, _verdict: verdict });
  } catch (e) {
    return res.status(502).json({ error: "Harness evaluation failed", detail: String(e?.message || e) });
  }
}
