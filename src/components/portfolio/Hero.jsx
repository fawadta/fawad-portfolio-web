import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile, heroRoles } from "@/lib/portfolioData";
import RotatingRoles from "@/components/portfolio/RotatingRoles";
import ProfileCard from "@/components/portfolio/ProfileCard";

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
              className="relative mb-6 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan/35 bg-surface/70 px-3.5 py-2 backdrop-blur"
            >
              <span className="edge-chase" aria-hidden="true" />
              <span className="relative flex h-2 w-2">
                {profile.isAvailable !== false && (
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success/60" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    profile.isAvailable !== false ? "animate-breathe bg-success" : "bg-muted-foreground"
                  }`}
                />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ghost">
                {profile.isAvailable !== false
                  ? "Available for game development & XR roles"
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
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 flex min-h-[1.6em] items-baseline font-mono text-sm tracking-wide text-muted-foreground sm:text-base"
            >
              <span className="whitespace-nowrap">I build&nbsp;</span>
              <RotatingRoles roles={heroRoles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
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
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
}