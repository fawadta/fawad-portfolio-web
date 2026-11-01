import { motion } from "framer-motion";
import { expertise, domains, tools } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";

export default function Expertise() {
  return (
    <section id="expertise" className="relative border-t border-border bg-surface-2/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" kicker="Capability Map" title="The Expertise Matrix" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: gi * 0.08 }}
              className="rounded-xl border border-border bg-surface/40 p-5"
            >
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    title={item}
                    className="cursor-default rounded-md border border-border bg-ink/40 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-cyan/60 hover:text-cyan"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mt-5 rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Domains & Genres
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {domains.map((d) => (
              <li
                key={d}
                className="rounded-md border border-border bg-ink/40 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-amber/60 hover:text-amber"
              >
                {d}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mt-5 rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            Tools & Production
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {tools.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-ink/40 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-ghost/40 hover:text-ghost"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}