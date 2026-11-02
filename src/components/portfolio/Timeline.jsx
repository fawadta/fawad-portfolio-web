import { motion } from "framer-motion";
import { experience } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";

const renderPoint = (text) =>
  text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk, i) => {
      if (chunk.startsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-ghost">
            {chunk.slice(2, -2)}
          </strong>
        );
      }
      if (chunk.startsWith("*")) {
        return <em key={i}>{chunk.slice(1, -1)}</em>;
      }
      return chunk;
    });

export default function Timeline() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="03" kicker="Lifecycle" title="Experience Timeline" />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[11px]" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.company + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-10 sm:pl-14"
              >
                <span
                  className={`absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 sm:h-6 sm:w-6 ${
                    job.current
                      ? "border-amber bg-amber/20"
                      : "border-cyan bg-ink"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${
                      job.current ? "bg-amber animate-breathe" : "bg-cyan"
                    }`}
                  />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-bold text-ghost sm:text-2xl">
                    {job.company}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {job.duration}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-cyan">
                  {job.role}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point, pi) => (
                    <li
                      key={pi}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                      <span>{renderPoint(point)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}