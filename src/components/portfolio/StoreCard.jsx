import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function StoreCard({ store = {} }) {
  const { playstore, icon, title, developer, downloads, category, platforms } = store;

  const meta = [downloads, category, platforms].filter(Boolean);

  return (
    <a
      href={playstore}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${title} on Google Play`}
      className="group/store relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-surface to-ink p-5 sm:p-8"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-cyan/20 opacity-25 blur-[80px]" />

      <div className="relative w-full max-w-md rounded-xl border border-border bg-ink/75 p-5 backdrop-blur-sm transition-colors duration-300 group-hover/store:border-cyan/50">
        <div className="flex items-center gap-4">
          {icon && (
            <Image
              src={icon}
              alt={`${title} icon`}
              fittingType="fill"
              className="h-16 w-16 shrink-0 rounded-2xl border border-border sm:h-20 sm:w-20"
            />
          )}
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/80">
              Google Play
            </p>
            <h4 className="mt-1 font-display text-base font-bold leading-tight text-ghost sm:text-lg">
              {title}
            </h4>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{developer}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {meta.map((entry, i) => (
            <span key={entry} className="flex items-center gap-3">
              {i > 0 && <span className="h-3 w-px bg-border" />}
              <span className={i === 0 ? "text-ghost" : undefined}>{entry}</span>
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan transition-colors group-hover/store:text-ghost">
          Open on Google Play
          <ArrowUpRight
            size={13}
            className="transition-transform group-hover/store:translate-x-0.5 group-hover/store:-translate-y-0.5"
          />
        </div>
      </div>
    </a>
  );
}