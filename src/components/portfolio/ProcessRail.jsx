import { motion } from "framer-motion";
import { processSteps } from "@/lib/portfolioData";

export default function ProcessRail() {
  return (
    <section className="border-t border-border bg-surface-2/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              // how I work
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ghost sm:text-3xl">
              Prototype to ship
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each project uses the same three steps. I use them for store games and for VR apps.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border-t border-border pt-4"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-sm font-semibold uppercase tracking-wide text-ghost">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}