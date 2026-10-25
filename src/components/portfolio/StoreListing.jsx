import { Image } from "@/components/ui/image";

const SIZES = {
  frame: {
    card: "p-5 sm:p-7",
    head: "gap-4 sm:gap-5",
    icon: "h-16 w-16 sm:h-20 sm:w-20",
    kicker: "text-[10px]",
    title: "text-base sm:text-xl",
    dev: "text-xs sm:text-sm",
    meta: "mt-4 pt-3 text-[10px] sm:text-[11px]",
  },
  lg: {
    card: "p-7 sm:p-9",
    head: "gap-5 sm:gap-7",
    icon: "h-24 w-24 sm:h-28 sm:w-28",
    kicker: "text-[11px]",
    title: "text-xl sm:text-2xl",
    dev: "text-sm sm:text-base",
    meta: "mt-6 pt-4 text-[11px] sm:text-xs",
  },
};

export default function StoreListing({ store = {}, size = "frame", className = "" }) {
  const s = SIZES[size] || SIZES.frame;
  const meta = [store.downloads, store.category, store.platforms].filter(Boolean);

  return (
    <div
      className={`flex h-full w-full flex-col justify-center rounded-xl border border-border bg-ink/75 backdrop-blur-sm ${s.card} ${className}`}
    >
      <div className={`flex items-center ${s.head}`}>
        {store.icon && (
          <Image
            src={store.icon}
            alt={`${store.title} icon`}
            fittingType="fill"
            className={`shrink-0 rounded-2xl border border-border ${s.icon}`}
          />
        )}
        <div className="min-w-0">
          <p className={`font-mono uppercase tracking-[0.22em] text-cyan/80 ${s.kicker}`}>Google Play</p>
          <h4 className={`mt-1 font-display font-bold leading-tight text-ghost ${s.title}`}>
            {store.title}
          </h4>
          <p className={`mt-0.5 truncate text-muted-foreground ${s.dev}`}>{store.developer}</p>
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border font-mono uppercase tracking-widest text-muted-foreground ${s.meta}`}
      >
        {meta.map((entry, i) => (
          <span key={entry} className="flex items-center gap-3">
            {i > 0 && <span className="h-3 w-px bg-border" />}
            <span className={i === 0 ? "text-ghost" : undefined}>{entry}</span>
          </span>
        ))}
      </div>
    </div>
  );
}