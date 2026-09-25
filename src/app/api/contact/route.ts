import { NextResponse } from "next/server";
import { validateAll, type ContactFields } from "@/lib/contact";

/*
 * POST /api/contact → sends the message to CONTACT_TO_EMAIL via Resend,
 * with reply-to set to the sender so you can answer straight from your inbox.
 *
 * Env vars (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      API key from resend.com
 *   CONTACT_TO_EMAIL    where messages arrive (without a verified domain, it must be your Resend account email)
 *   CONTACT_FROM_EMAIL  optional, e.g. "Portfolio <hola@tudominio.com>" once a domain is verified
 *
 * Spam: hidden honeypot field, minimum fill time, and a basic per-IP limit.
 * The limit lives in memory, so on serverless it's per instance — a brake, not a wall.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clip = (s: unknown, n: number) => (typeof s === "string" ? s.slice(0, n) : "");

const missingEnv = () =>
  (["RESEND_API_KEY", "CONTACT_TO_EMAIL"] as const).filter((k) => !process.env[k]?.trim());

/**
 * GET /api/contact → quick setup check. Only says whether each variable is
 * present (never its value), so it's safe to open in the browser.
 */
export function GET() {
  const missing = missingEnv();
  return NextResponse.json({ ok: missing.length === 0, missing });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bots fill the honeypot or submit instantly: pretend it worked, send nothing.
  if (clip(body.website, 200) || Number(body.elapsed ?? 0) < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const f: ContactFields = {
    firstName: clip(body.firstName, 100).trim(),
    lastName: clip(body.lastName, 100).trim(),
    email: clip(body.email, 200).trim(),
    company: clip(body.company, 150).trim(),
    phone: clip(body.phone, 50).trim(),
    message: clip(body.message, 5000).trim(),
  };
  const errors = validateAll(f);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const lines = [`Nombre: ${f.firstName} ${f.lastName}`, `Email: ${f.email}`];
  if (f.company) lines.push(`Empresa: ${f.company}`);
  if (f.phone) lines.push(`Teléfono: ${f.phone}`);
  const text = [...lines, "", f.message].join("\n");

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without keys: log instead of sending.
      console.info("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL missing — message not sent:\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] missing env:", missingEnv().join(", "));
    return NextResponse.json({ ok: false, error: "not_configured", missing: missingEnv() }, { status: 500 });
  }

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: f.email,
        subject: `Portfolio — ${f.firstName} ${f.lastName}${f.company ? ` (${f.company})` : ""}`,
        text,
      }),
    });
  } catch (err) {
    console.error("[contact] could not reach Resend", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, detail);
    return NextResponse.json({ ok: false, error: "send_failed", status: res.status }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
