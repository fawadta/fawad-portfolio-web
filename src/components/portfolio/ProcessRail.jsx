import { motion } from "framer-motion";
import { processSteps } from "@/lib/portfolioData";

export default function ProcessRail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="rounded-xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:p-7"
    >
      <p className="mb-6 border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        How I work
      </p>

      <ol>
        {processSteps.map((step, i) => {
          const last = i === processSteps.length - 1;
          return (
            <li key={step.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/40 bg-ink/60 font-mono text-[11px] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!last && (
                  <span className="w-px flex-1 bg-gradient-to-b from-cyan/40 to-border" />
                )}
              </div>
              <div className={last ? "pb-0" : "pb-6"}>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-ghost">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}