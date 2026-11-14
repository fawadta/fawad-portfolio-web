import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Send, Gamepad2, CheckCircle2, Loader2 } from "lucide-react";
import { profile } from "@/lib/portfolioData";
import { CONTACT_ENDPOINT } from "@/lib/contactConfig";
import { CONTACT_LIMITS, validateContact, friendlySendError } from "@/lib/contactValidation";
import BinaryRain from "./BinaryRain";
import ContactChannel from "@/components/portfolio/ContactChannel";

const inputClass = (hasError) =>
  `w-full rounded-md border bg-ink/50 px-3.5 py-2.5 text-sm text-ghost placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 ${
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive"
      : "border-border focus:border-cyan focus:ring-cyan"
  }`;

const sendMessage = async (payload) => {
  let response;
  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("The message was not sent. Check your connection and try again.");
  }
  if (response.ok) return;
  const body = await response.json().catch(() => null);
  throw new Error(friendlySendError(response.status, body?.error));
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  // Real visitors take seconds to type; bots submit the moment the page loads.
  const startedAt = useRef(Date.now());
  const messageRef = useRef(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [sendError, setSendError] = useState("");

  // The message field grows with the text instead of adding a scrollbar.
  const growMessage = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(112, el.scrollHeight)}px`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setSendError("");
    if (name === "message") growMessage(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const errors = validateContact(form);
    setFieldErrors(errors);
    setSendError("");
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        company: form.company.trim(),
        elapsedMs: Date.now() - startedAt.current,
      });
      setForm({ name: "", email: "", message: "", company: "" });
      if (messageRef.current) messageRef.current.style.height = "";
      startedAt.current = Date.now();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 8000);
    } catch (err) {
      setStatus("idle");
      setSendError(err.message);
    }
  };

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, accent: true },
    { label: "LinkedIn", value: "linkedin.com/in/fawadta", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", value: "github.com/fawadta", href: profile.github, icon: Github },
    { label: "itch.io", value: "fawadta.itch.io", href: profile.itch, icon: Gamepad2 },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`, icon: Phone },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface-2/60 py-24 sm:py-32"
    >
      <BinaryRain />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            // contact
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight text-ghost sm:text-6xl md:text-7xl">
            LET'S BUILD THE
            <br />
            <span className="text-stroke">NEXT GAME.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground">
            I build for <strong className="font-semibold text-foreground">mobile, PC and XR</strong>.
            I am open to roles, contracts and collaborations. Send a message.{" "}
            <em>I read every message.</em>
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {channels.map((channel) => (
              <ContactChannel key={channel.label} channel={channel} />
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-7"
            noValidate
          >
            <div className="space-y-4">
              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[10000px] top-0 h-0 w-0 overflow-hidden"
              >
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={CONTACT_LIMITS.name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className={inputClass(Boolean(fieldErrors.name))}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1.5 font-mono text-xs text-destructive">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={CONTACT_LIMITS.email}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={inputClass(Boolean(fieldErrors.email))}
                  placeholder="you@example.com"
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1.5 font-mono text-xs text-destructive">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  ref={messageRef}
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  maxLength={CONTACT_LIMITS.message}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className={`${inputClass(Boolean(fieldErrors.message))} min-h-[112px] overflow-hidden`}
                  placeholder="A friend says hello. What are you building, or which role is open? A sentence or two is enough."
                />
                {fieldErrors.message && (
                  <p id="message-error" className="mt-1.5 font-mono text-xs text-destructive">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {sendError && (
                <p role="alert" className="font-mono text-xs text-destructive">
                  {sendError}
                </p>
              )}
              {status === "sent" && (
                <div className="flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/5 px-3 py-2.5">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <p className="font-mono text-xs text-cyan">
                    The message is sent. I will reply soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                {status === "sending" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}