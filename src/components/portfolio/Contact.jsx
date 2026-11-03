import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Send, Gamepad2, CheckCircle2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { profile } from "@/lib/portfolioData";
import { CONTACT_ENDPOINT } from "@/lib/contactConfig";

const sendMessage = async (payload) => {
  if (!CONTACT_ENDPOINT) {
    await base44.functions.invoke("sendContactMessage", payload);
    return;
  }
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Send failed");
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("idle");
      setError(`Couldn't send just now — you can email me directly at ${profile.email}.`);
    }
  };

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, accent: true },
    { label: "LinkedIn", value: "linkedin.com/in/fawadta", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", value: "github.com/fawadta", href: profile.github, icon: Github },
    { label: "itch.io", value: "fawadta.itch.io", href: profile.itch, icon: Gamepad2 },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface-2/60 py-24 sm:py-32"
    >
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
            <span className="text-stroke">NEXT REALITY.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground">
            Open to Unity, XR and cross-platform roles, contracts and collaborations.
            Drop a line — I read every message.
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
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-cyan/50 ${
                    c.accent
                      ? "border-cyan/40 bg-cyan/5"
                      : "border-border bg-surface/40 hover:bg-surface/70"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border ${
                      c.accent
                        ? "border-cyan/50 bg-cyan/10 text-cyan"
                        : "border-border bg-ink/50 text-muted-foreground group-hover:text-cyan"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-ghost">
                      {c.value}
                    </span>
                  </span>
                </a>
              );
            })}
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-4 transition-all hover:border-cyan/50 hover:bg-surface/70"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-ink/50 text-muted-foreground group-hover:text-cyan">
                <Phone size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Phone
                </span>
                <span className="block text-sm font-medium text-ghost">
                  {profile.phone}
                </span>
              </span>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-surface/40 p-6 sm:p-7"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-ink/50 px-3.5 py-2.5 text-sm text-ghost placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  placeholder="Jane Recruiter"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-ink/50 px-3.5 py-2.5 text-sm text-ghost placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  placeholder="jane@studio.com"
                />
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
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-md border border-border bg-ink/50 px-3.5 py-2.5 text-sm text-ghost placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                  placeholder="Tell me about the role or project..."
                />
              </div>

              {error && (
                <p className="font-mono text-xs text-destructive">{error}</p>
              )}
              {status === "sent" && (
                <div className="flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/5 px-3 py-2.5">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <p className="font-mono text-xs text-cyan">
                    Message sent — it's in my inbox. I'll get back to you soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
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