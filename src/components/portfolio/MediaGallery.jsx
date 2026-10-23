import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const ARROW =
  "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-ink/80 text-ghost backdrop-blur-sm transition-colors hover:border-cyan/60 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan";

export default function MediaGallery({ images = [], fit = "cover", altBase = "" }) {
  const [i, setI] = useState(0);
  const count = images.length;
  const step = (d) => setI((v) => (v + d + count) % count);

  return (
    <div className="relative h-full w-full bg-ink">
      <Image
        key={images[i]}
        src={images[i]}
        alt={`${altBase} ${i + 1}`}
        fittingType={fit === "contain" ? "fit" : "fill"}
        className="h-full w-full"
      />

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => step(-1)}
            className={`${ARROW} left-3`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => step(1)}
            className={`${ARROW} right-3`}
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-ink/70 px-2.5 py-1.5 backdrop-blur-sm">
            {images.map((src, d) => (
              <button
                key={`${src}-${d}`}
                type="button"
                aria-label={`Show image ${d + 1}`}
                onClick={() => setI(d)}
                className={`h-1.5 rounded-full transition-all ${
                  d === i ? "w-4 bg-cyan" : "w-1.5 bg-muted-foreground/50 hover:bg-ghost"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-3 right-4 z-10 font-mono text-[10px] tracking-widest text-ghost/70">
            {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </>
      )}
    </div>
  );
}