// Cloudflare Worker — relays portfolio contact submissions to Brevo.
//
// Configure in Cloudflare (Settings → Variables and Secrets):
//   BREVO_API_KEY   (secret)  Brevo → SMTP & API → API Keys
//   TO_EMAIL        (text)    inbox that receives the messages
//   FROM_EMAIL      (text)    a Brevo-verified sender address
//   FROM_NAME       (text)    display name, e.g. "Portfolio Contact"
//   ALLOWED_ORIGINS (text)    comma-separated site origins allowed to post here
//
// The API key never reaches the browser, and message contents are never logged.

const LIMITS = { name: 120, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_ORIGINS = "https://fawadta.com,https://www.fawadta.com,https://fawadahmad.base44.app";

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

    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !email || !message) {
      return json({ error: "Name, email and message are required." }, 400, cors);
    }
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return json({ error: "One of the fields is too long." }, 400, cors);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400, cors);
    }
    if (!env.BREVO_API_KEY || !env.TO_EMAIL || !env.FROM_EMAIL) {
      return json({ error: "Email service is not configured." }, 500, cors);
    }

    const subject = `Portfolio inquiry from ${name.replace(/[\r\n]+/g, " ")}`;

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
          htmlContent: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><hr><p>${escapeHtml(
            name
          )} &lt;${escapeHtml(email)}&gt;</p>`,
          textContent: `${message}\n\n— ${name}\n${email}`,
        }),
      });
    } catch {
      return json({ error: "Could not reach the email service." }, 502, cors);
    }

    if (!brevoResponse.ok) {
      let detail = "";
      try {
        const body = await brevoResponse.json();
        detail = body?.message || body?.code || "";
      } catch {
        detail = (await brevoResponse.text().catch(() => "")).slice(0, 300);
      }
      return json(
        {
          error: `Email service rejected the message (${brevoResponse.status}${
            detail ? `: ${detail}` : ""
          }).`,
        },
        502,
        cors
      );
    }

    return json({ success: true }, 200, cors);
  },
};