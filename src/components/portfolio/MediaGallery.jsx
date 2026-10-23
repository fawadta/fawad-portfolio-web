import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import Lightbox from "./Lightbox";

const ARROW =
  "pointer-events-none absolute top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-ink/80 text-ghost opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-cyan/60 hover:text-cyan focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan group-hover:pointer-events-auto group-hover:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100";

export default function MediaGallery({ images = [], fit = "cover", altBase = "" }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <>
      <div className="group relative h-full w-full overflow-hidden bg-ink">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {images.map((src, d) => (
            <button
              key={`${src}-${d}`}
              type="button"
              aria-label={`Enlarge image ${d + 1}`}
              onClick={() => setOpen(true)}
              className="relative h-full w-full shrink-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <Image
                src={src}
                alt={`${altBase} ${d + 1}`}
                loading={Math.abs(d - i) > 1 ? "lazy" : undefined}
                fittingType={fit === "contain" ? "fit" : "fill"}
                className={`h-full w-full ${objectFit} transition-transform duration-500 ease-out ${
                  d === i ? "group-hover:scale-[1.02]" : ""
                }`}
              />
            </button>
          ))}
        </div>

        <span className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-border bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ghost/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 size={11} />
          Click to enlarge
        </span>

        {i > 0 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setI((v) => Math.max(v - 1, 0))}
            className={`${ARROW} left-3`}
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {i < count - 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setI((v) => Math.min(v + 1, count - 1))}
            className={`${ARROW} right-3`}
          >
            <ChevronRight size={16} />
          </button>
        )}

        {count > 1 && (
          <>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-ink/70 px-2.5 py-1.5 backdrop-blur-sm">
              {images.map((src, d) => (
                <button
                  key={`${src}-${d}`}
                  type="button"
                  aria-label={`Show image ${d + 1}`}
                  onClick={() => setI(d)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    d === i ? "w-4 bg-cyan" : "w-1.5 bg-muted-foreground/50 hover:bg-ghost"
                  }`}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-3 right-4 z-20 font-mono text-[10px] tracking-widest text-ghost/70">
              {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={open}
        images={images}
        index={i}
        onIndexChange={setI}
        onClose={() => setOpen(false)}
        altBase={altBase}
      />
    </>
  );
}