import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Recipient is fixed server-side — never taken from the request.
const OWNER_EMAIL = "fawadshah501@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function (req) {
  try {
    const payload = await req.json().catch(() => ({}));
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const message = String(payload.message ?? "").trim();

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return Response.json({ error: "One of the fields is too long." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: OWNER_EMAIL,
      subject: `Portfolio inquiry from ${name}`,
      body: `${message}\n\n— ${name}\n${email}`,
      category: "transactional",
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}