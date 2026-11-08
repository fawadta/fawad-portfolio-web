import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile, heroPulse } from "@/lib/portfolioData";

export default function Hero() {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[360px] w-[360px] rounded-full bg-amber/5 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:min-h-[min(calc(100vh-4rem),760px)]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                {profile.isAvailable !== false && (
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success/60" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    profile.isAvailable !== false ? "bg-success" : "bg-muted-foreground"
                  }`}
                />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {profile.isAvailable !== false
                  ? "Available for Unity & XR roles"
                  : "Not taking new roles right now"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-bold leading-[0.92] tracking-tight text-ghost"
            >
              <span className="block text-[clamp(3rem,11vw,8.5rem)]">FAWAD</span>
              <span className="block text-[clamp(3rem,11vw,8.5rem)] text-stroke">
                AHMAD
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                View Work
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = profile.resume?.trim();
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ghost transition-colors hover:border-cyan/60 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Download Résumé
                <Download size={15} />
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-ghost transition-colors hover:border-cyan/60 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Get in Touch
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative rounded-xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  // technical_pulse
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber">
                  <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-amber" />
                  Quest 3 · VisionOS
                </span>
              </div>

              <dl className="space-y-3.5">
                {heroPulse.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {row.k}
                    </dt>
                    <dd className="text-right font-display text-sm font-medium text-ghost">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Unity", "C#", "Photon"].map((t) => (
                  <div
                    key={t}
                    className="rounded-md border border-border bg-ink/40 px-2 py-2.5 text-center font-mono text-[11px] uppercase tracking-widest text-cyan"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}