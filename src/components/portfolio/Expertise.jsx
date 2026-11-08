import TiltCard from "./TiltCard";
import { expertise, domains, tools } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import TagCloud from "./TagCloud";

const cardMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay },
});

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative border-t border-border bg-surface-2/40 pt-24 pb-14 sm:pt-32 sm:pb-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" kicker="Capability Map" title="The Expertise Matrix" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((group, gi) => (
            <TiltCard
              key={group.title}
              {...cardMotion(gi * 0.08)}
              max={4}
              className="relative overflow-hidden rounded-xl border border-border bg-surface/40 p-5"
            >
              <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {group.title}
              </h3>
              <TagCloud items={group.items} accent="cyan" />
            </TiltCard>
          ))}
        </div>

        <TiltCard
          {...cardMotion()}
          max={3}
          className="relative mt-5 overflow-hidden rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Domains & Genres
          </h3>
          <TagCloud items={domains} accent="amber" />
        </TiltCard>

        <TiltCard
          {...cardMotion()}
          max={3}
          className="relative mt-5 overflow-hidden rounded-xl border border-border bg-surface/40 p-5"
        >
          <h3 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            Tools & Production
          </h3>
          <TagCloud items={tools} accent="ghost" />
        </TiltCard>
      </div>
    </section>
  );
}