// Shared contact-form rules. The Cloudflare Worker mirrors these checks server-side.
import { profile } from "@/lib/portfolioData";

export const CONTACT_LIMITS = { name: 120, email: 200, message: 5000 };

// conventional shape check: something@domain.tld, with at least two letters
// after the last dot so typos like "user@g.c" are caught before sending.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

export function validateEmail(value) {
  const email = String(value ?? "").trim();
  if (!email) return "Please enter your email address.";
  if (email.length > CONTACT_LIMITS.email) return "That email address is too long.";
  if (email.includes("..")) return "That email address doesn't look right — check for a typo.";
  if (email.split("@")[0].length > 64) return "That email address doesn't look right — check for a typo.";
  if (!EMAIL_RE.test(email)) return "That email address doesn't look right — check for a typo.";
  return "";
}

// Returns only the fields that failed, each with a friendly message.
export function validateContact(form) {
  const errors = {};
  const name = String(form.name ?? "").trim();
  const message = String(form.message ?? "").trim();

  if (!name) errors.name = "Please tell me your name.";
  else if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "That name is a little too long.";

  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;

  if (!message) errors.message = "Please add a message.";
  else if (message.length < 10) errors.message = "Please add a little more detail — at least 10 characters.";
  else if (message.length > CONTACT_LIMITS.message) errors.message = "That message is too long — please keep it under 5,000 characters.";

  return errors;
}

// Any failure becomes plain, non-technical copy. 400s already carry friendly text.
export function friendlySendError(status, serverMessage) {
  if (status === 400 && serverMessage) return serverMessage;
  if (status === 429) return "Too many messages just now — please wait a minute and try again.";
  if (status === 413) return "That message is too long to send.";
  if (status === 403) return "This page isn't allowed to send messages right now. Please try again in a moment.";
  if (status >= 500)
    return `The message couldn't be delivered right now. Please email me directly at ${profile.email}.`;
  return "Your message wasn't sent. Please try again.";
}