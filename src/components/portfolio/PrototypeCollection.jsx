import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getYouTubeId } from "./ProjectMedia";
import VideoEmbed from "./VideoEmbed";

/**
 * A single prototype inside a mechanics collection.
 * @typedef {Object} Prototype
 * @property {string} name Prototype title.
 * @property {string} focus Mechanics focus, shown above the title.
 * @property {string} note One-line description of what the prototype implements.
 * @property {string} video YouTube URL for the gameplay recording.
 */

/** @param {{ prototypes?: Prototype[] }} props */
export default function PrototypeCollection({ prototypes = [], active = true }) {
  if (!prototypes.length) return null;

  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
          {String(prototypes.length).padStart(2, "0")} Prototypes
        </span>
        <span className="h-3 w-px bg-border" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
          Gameplay recordings
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {prototypes.map((prototype, i) => {
          const videoId = getYouTubeId(prototype.video);

          return (
            <motion.div
              key={prototype.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-cyan/50"
            >
              <div className="relative aspect-video bg-ink">
                {videoId && (
                  <VideoEmbed
                    videoId={videoId}
                    active={active}
                    title={`${prototype.name}: gameplay`}
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col border-t border-border p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {prototype.focus}
                </span>
                <h4 className="mt-2 font-display text-lg font-bold text-ghost">
                  {prototype.name}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {prototype.note}
                </p>
                <a
                  href={prototype.video}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link mt-4 inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-widest text-cyan transition-colors hover:text-ghost"
                >
                  Watch on YouTube
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}