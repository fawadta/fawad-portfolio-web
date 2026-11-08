import { motion } from "framer-motion";
import DecodeText from "./DecodeText";

export default function SectionHeading({ index, title, kicker }) {
  return (
    <div className="mb-12 sm:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <span className="font-mono text-xs text-cyan">{index}</span>
        <span className="h-px w-10 bg-border" />
        {kicker && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {kicker}
          </span>
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-ghost sm:text-4xl md:text-5xl"
      >
        <DecodeText text={title} />
      </motion.h2>
    </div>
  );
}