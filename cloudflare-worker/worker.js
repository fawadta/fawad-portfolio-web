// Cloudflare Worker — relays portfolio contact submissions to Brevo.
//
// Variables (Settings → Variables and Secrets):
//   BREVO_API_KEY   (secret)  Brevo → SMTP & API → API Keys
//   TO_EMAIL        (text)    inbox that receives the messages
//   FROM_EMAIL      (text)    a Brevo-verified sender address
//   FROM_NAME       (text)    display name, e.g. "Portfolio Contact"
//   ALLOWED_ORIGINS (text)    comma-separated site origins allowed to post here

const LIMITS = { name: 120, email: 200, message: 5000 };
// At least two characters after the last dot (catches "user@g.c" typos).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;
const DEFAULT_ORIGINS = "https://fawadta.com,https://www.fawadta.com,https://fawadahmad.base44.app";

// Spam guard: a filled honeypot or an instant submit is a bot, and no real
// visitor sends more than RATE_MAX messages per RATE_WINDOW.
const MIN_FILL_MS = 2500;
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentByIp = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const hits = (recentByIp.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 500) {
    for (const [key, times] of recentByIp) {
      if (!times.some((time) => now - time < RATE_WINDOW_MS)) recentByIp.delete(key);
    }
  }
  return hits.length > RATE_MAX;
};

const json = (body, status, cors) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default {
  async fetch(request, env) {
    const allowedOrigins = (env.ALLOWED_ORIGINS || DEFAULT_ORIGINS)
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
    const origin = request.headers.get("Origin") || "";

    const cors = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }
    if (!allowedOrigins.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid request body" }, 400, cors);
    }

    // Bots fill the hidden field and submit faster than a person can type.
    // Answering 200 without sending keeps them from probing for a weakness.
    if (String(payload?.company ?? "").trim()) {
      return json({ success: true }, 200, cors);
    }
    const fillMs = Number(payload?.elapsedMs);
    if (Number.isFinite(fillMs) && fillMs >= 0 && fillMs < MIN_FILL_MS) {
      return json({ success: true }, 200, cors);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (isRateLimited(ip)) {
      return json({ error: "Too many messages sent. Please try again in a few minutes." }, 429, cors);
    }

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !email || !message) {
      return json({ error: "Please fill in your name, email and message." }, 400, cors);
    }
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return json({ error: "One of the fields is a little too long." }, 400, cors);
    }
    if (message.length < MIN_MESSAGE) {
      return json({ error: "Please add a little more detail to your message." }, 400, cors);
    }
    if (email.includes("..") || email.split("@")[0].length > 64 || !EMAIL_RE.test(email)) {
      return json({ error: "That email address doesn't look right — please check it for a typo." }, 400, cors);
    }
    if (!env.BREVO_API_KEY || !env.TO_EMAIL || !env.FROM_EMAIL) {
      return json({ error: "Email service is not configured." }, 500, cors);
    }

    const subject = `New message from ${name.replace(/[\r\n]+/g, " ")} · fawadta.com`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const htmlContent = `
    <div style="background-color: #f3f8fa; padding: 24px 12px; font-family: Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dbe7ec;">
        <tr><td style="background-color: #e9f9fc; border-top: 5px solid #00c2d9; padding: 22px 28px;">
          <a href="https://fawadta.com" style="color: #067a8c; text-decoration: none; font-size: 12px; letter-spacing: 2px; font-weight: bold;">FAWADTA.COM</a>
          <div style="color: #12202b; font-size: 20px; font-weight: bold; margin-top: 6px;">New portfolio message</div>
        </td></tr>
        <tr><td style="padding: 24px 28px; color: #1f2d38;">
          <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 1px; color: #6b7c88;">FROM</p>
          <p style="margin: 0 0 18px; font-size: 16px;"><strong>${safeName}</strong><br>
            <a href="mailto:${safeEmail}" style="color: #067a8c;">${safeEmail}</a></p>
          <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 1px; color: #6b7c88;">MESSAGE</p>
          <div style="border-left: 4px solid #00c2d9; background-color: #f3f8fa; padding: 14px 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #1f2d38;">${escapeHtml(message)}</div>
          <p style="margin: 24px 0 0;"><a href="mailto:${safeEmail}?subject=Re:%20Your%20message%20on%20fawadta.com" style="background-color: #067a8c; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block;">Reply to ${safeName}</a></p>
        </td></tr>
        <tr><td style="padding: 14px 28px; background-color: #f3f8fa; color: #6b7c88; font-size: 12px;">Sent from the contact form at <a href="https://fawadta.com" style="color: #067a8c; text-decoration: none;">fawadta.com</a>. Hit Reply to answer directly.</td></tr>
      </table>
    </div>`;

    let brevoResponse;
    try {
      brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: env.FROM_NAME || "Portfolio Contact", email: env.FROM_EMAIL },
          to: [{ email: env.TO_EMAIL }],
          replyTo: { email, name },
          subject,
          htmlContent,
          textContent: `${message}\n\n— ${name}\n${email}`,
        }),
      });
    } catch {
      return json({ error: "Could not reach the email service." }, 502, cors);
    }

    if (!brevoResponse.ok) {
      // Detail stays in the Worker log for debugging; visitors get plain copy.
      try {
        const body = await brevoResponse.json();
        console.error("Brevo rejected the message", brevoResponse.status, body?.message || body?.code);
      } catch {
        const text = await brevoResponse.text().catch(() => "");
        console.error("Brevo rejected the message", brevoResponse.status, text.slice(0, 300));
      }
      return json(
        { error: "The message couldn't be delivered right now. Please try again in a moment." },
        502,
        cors
      );
    }

    return json({ success: true }, 200, cors);
  },
};