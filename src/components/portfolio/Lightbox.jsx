import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image } from "@/components/ui/image";

const ARROW =
  "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-ink/80 text-ghost backdrop-blur-sm transition-colors hover:border-cyan/60 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan";

export default function Lightbox({ open, images = [], index = 0, onIndexChange, onClose, altBase = "" }) {
  const count = images.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") onIndexChange(Math.min(index + 1, count - 1));
      else if (event.key === "ArrowLeft") onIndexChange(Math.max(index - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, index, count]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${altBase} enlarged view`}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-ink/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[78vh] w-[92vw] max-w-6xl"
          >
            <Image
              src={images[index]}
              alt={`${altBase} ${index + 1}`}
              loading="eager"
              fittingType="fit"
              className="h-full w-full object-contain"
            />
          </motion.div>

          {count > 1 && (
            <>
              {index > 0 && (
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation();
                    onIndexChange(index - 1);
                  }}
                  className={`${ARROW} left-4`}
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              {index < count - 1 && (
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation();
                    onIndexChange(index + 1);
                  }}
                  className={`${ARROW} right-4`}
                >
                  <ChevronRight size={18} />
                </button>
              )}
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border bg-ink/80 px-3 py-1.5 font-mono text-[11px] tracking-widest text-ghost/80 backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </div>
            </>
          )}

          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border bg-ink/80 text-ghost backdrop-blur-sm transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}