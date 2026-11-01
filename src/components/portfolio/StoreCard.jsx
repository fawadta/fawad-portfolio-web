import { useState } from "react";
import { Maximize2 } from "lucide-react";
import Lightbox from "./Lightbox";
import StoreListing from "./StoreListing";

/** @typedef {import("./StoreListing").StoreListingData} StoreListingData */

/** @param {{ store?: StoreListingData }} props */
export default function StoreCard({ store = {} }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group relative h-full w-full overflow-hidden bg-gradient-to-br from-surface to-ink">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-cyan/20 opacity-25 blur-[80px]" />

        <button
          type="button"
          aria-label={`Enlarge ${store.title || "store"} listing`}
          onClick={() => setOpen(true)}
          className="relative flex h-full w-full cursor-zoom-in items-center justify-center p-[4%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          <StoreListing
            store={store}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </button>

        <span className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-border bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ghost/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 size={11} />
          Click to enlarge
        </span>
      </div>

      <Lightbox
        open={open}
        images={[{ store }]}
        index={0}
        onIndexChange={() => {}}
        onClose={() => setOpen(false)}
        altBase={store.title || "Store listing"}
      />
    </>
  );
}