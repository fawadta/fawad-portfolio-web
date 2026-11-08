import TiltCard from "./TiltCard";
import { profile } from "@/lib/portfolioData";

const rows = [
  { label: "Location", value: profile.location },
  { label: "Role", value: profile.title },
  { label: "Experience", value: profile.experience },
  { label: "Focus", value: profile.focus },
];

const equipped = ["Unity", "C#", "Photon"];

export default function ProfileCard() {
  return (
    <TiltCard
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative overflow-hidden rounded-xl border border-border bg-surface/50 backdrop-blur-sm"
    >
      <span className="edge-chase" aria-hidden="true" />

      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
          // profile
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
          build 2026
        </span>
      </div>

      <dl className="px-5 sm:px-6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 border-b border-border/60 py-3.5 last:border-b-0"
          >
            <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-right text-[13px] font-medium leading-snug text-ghost">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-border px-5 py-4 sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Equipped
        </span>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {equipped.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-cyan/30 bg-cyan/5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-cyan transition-colors hover:border-cyan/60 hover:bg-cyan/10"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}