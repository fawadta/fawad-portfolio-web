import { motion } from "framer-motion";
import { proofPoints } from "@/lib/portfolioData";

export default function ProofStrip() {
  return (
    <section className="border-y border-border bg-surface-2/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
          {proofPoints.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="px-4 py-7 text-center sm:py-9"
            >
              <div className="font-display text-3xl font-bold text-ghost sm:text-4xl">
                {p.value}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
                {p.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}