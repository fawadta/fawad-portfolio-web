import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getYouTubeId } from "./ProjectMedia";
import VideoEmbed from "./VideoEmbed";

/**
 * A single game built during a game jam.
 * @typedef {Object} GameJam
 * @property {string} name Jam project title.
 * @property {string} focus Short mechanics or theme label.
 * @property {string} note Short description of what the jam project delivered.
 * @property {string} platform Platform it was built for.
 * @property {string} video YouTube URL for the gameplay recording.
 */

/** @param {{ jams?: GameJam[] }} props */
export default function JamCollection({ jams = [] }) {
  const [index, setIndex] = useState(0);

  if (!jams.length) return null;

  const position = Math.min(index, jams.length - 1);
  const jam = jams[position];
  const videoId = getYouTubeId(jam.video);

  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
            {String(jams.length).padStart(2, "0")} Game Jams
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            2022 – 2023
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
            {String(position + 1).padStart(2, "0")} /{" "}
            {String(jams.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIndex(Math.max(0, position - 1))}
              disabled={position === 0}
              aria-label="Previous game jam"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-ghost transition-colors hover:border-amber/60 hover:text-amber disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ghost"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIndex(Math.min(jams.length - 1, position + 1))}
              disabled={position === jams.length - 1}
              aria-label="Next game jam"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-ghost transition-colors hover:border-amber/60 hover:text-amber disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ghost"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        key={jam.name}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-ink">
            {videoId && (
              <VideoEmbed
                videoId={videoId}
                active
                title={`${jam.name} — gameplay`}
              />
            )}
            <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ghost backdrop-blur">
              {jam.platform}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber">
            {jam.focus}
          </span>
          <h4 className="mt-2 font-display text-2xl font-bold text-ghost">
            {jam.name}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {jam.note}
          </p>
          <a
            href={jam.video}
            target="_blank"
            rel="noreferrer"
            className="group/link mt-5 inline-flex items-center gap-2 border-b border-amber/40 pb-1 font-mono text-xs uppercase tracking-widest text-amber transition-colors hover:border-amber"
          >
            Watch on YouTube
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </div>
      </motion.div>

      <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {jams.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === position}
            className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              i === position
                ? "border-amber/60 bg-amber/10 text-amber"
                : "border-border text-muted-foreground hover:border-amber/40 hover:text-ghost"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}