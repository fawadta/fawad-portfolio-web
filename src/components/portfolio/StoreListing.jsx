import { Play } from "lucide-react";
import { Image } from "@/components/ui/image";

const SIZES = {
  frame: {
    body: "p-4 sm:p-8",
    head: "gap-3 sm:gap-6",
    icon: "h-16 w-16 sm:h-32 sm:w-32",
    kicker: "px-2 py-0.5 text-[8px] sm:px-2.5 sm:py-1 sm:text-[11px]",
    title: "mt-1.5 text-base sm:mt-2 sm:text-3xl",
    dev: "mt-0.5 text-[10px] sm:mt-1 sm:text-base",
    stats: "mt-3 gap-2 pt-3 sm:mt-6 sm:gap-4 sm:pt-5",
    label: "text-[7px] sm:text-[10px]",
    value: "mt-0.5 text-[11px] sm:mt-1 sm:text-lg",
    backdrop: "scale-125 blur-[18px] opacity-60 sm:blur-[26px]",
  },
  lg: {
    body: "p-5 sm:p-10",
    head: "gap-3.5 sm:gap-8",
    icon: "h-20 w-20 sm:h-40 sm:w-40",
    kicker: "px-2.5 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-xs",
    title: "mt-2 text-lg sm:mt-3 sm:text-4xl",
    dev: "mt-1 text-xs sm:mt-1.5 sm:text-lg",
    stats: "mt-5 gap-3 pt-4 sm:mt-8 sm:gap-6 sm:pt-6",
    label: "text-[8px] sm:text-xs",
    value: "mt-1 text-sm sm:mt-1.5 sm:text-2xl",
    backdrop: "scale-125 blur-[22px] opacity-60 sm:blur-[34px]",
  },
};

/**
 * Shape of the Google Play listing data rendered by this card (see portfolioData.js).
 * @typedef {Object} StoreListingData
 * @property {string} [title] App name.
 * @property {string} [developer] Publisher name.
 * @property {string} [icon] App icon URL.
 * @property {string[]} [screenshots] Screenshot URLs used for the blurred backdrop.
 * @property {string} [downloads] Download count label, e.g. "100K+".
 * @property {string} [category] Store category.
 * @property {string} [platforms] Supported platforms.
 */

/**
 * @param {Object} props
 * @param {StoreListingData} [props.store] Store listing details.
 * @param {"frame" | "lg"} [props.size] Layout preset.
 * @param {string} [props.className] Extra classes for the card shell.
 */
export default function StoreListing({ store = {}, size = "frame", className = "" }) {
  const s = SIZES[size] || SIZES.frame;
  const shots = (store.screenshots || []).slice(0, 3);
  const stats = [
    { label: "Downloads", value: store.downloads },
    { label: "Genre", value: store.category },
    { label: "Platforms", value: store.platforms },
  ].filter((stat) => stat.value);

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-center overflow-hidden rounded-xl border border-border bg-ink text-left ${s.body} ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {shots.length > 0 ? (
          <div className="absolute inset-0 flex">
            {shots.map((shot, i) => (
              <Image
                key={shot}
                src={shot}
                alt=""
                fittingType="fill"
                className={`h-full flex-1 object-cover ${s.backdrop} ${
                  i > 0 ? "border-l border-border/40" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          store.icon && (
            <Image
              src={store.icon}
              alt=""
              fittingType="fill"
              className={`absolute inset-0 h-full w-full object-cover ${s.backdrop}`}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/85 to-ink/65" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
      </div>

      <div className="relative">
        <div className={`flex items-center ${s.head}`}>
          <div className="relative shrink-0">
            <span className="absolute inset-0 rounded-2xl bg-cyan/40 blur-2xl" />
            {store.icon && (
              <Image
                src={store.icon}
                alt={`${store.title} icon`}
                fittingType="fill"
                className={`relative rounded-2xl border border-cyan/30 shadow-2xl ${s.icon}`}
              />
            )}
          </div>

          <div className="min-w-0">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 font-mono uppercase tracking-[0.2em] text-cyan ${s.kicker}`}
            >
              <Play size={9} className="fill-current" />
              Google Play
            </span>
            <h4 className={`font-display font-bold leading-tight text-ghost ${s.title}`}>
              {store.title}
            </h4>
            <p className={`truncate text-muted-foreground ${s.dev}`}>{store.developer}</p>
          </div>
        </div>

        <dl className={`flex border-t border-border/80 ${s.stats}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 flex-1 ${i > 0 ? "border-l border-border/70 pl-4 sm:pl-6" : ""}`}
            >
              <dt
                className={`font-mono uppercase tracking-[0.18em] text-muted-foreground ${s.label}`}
              >
                {stat.label}
              </dt>
              <dd className={`font-mono text-ghost ${s.value}`}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}