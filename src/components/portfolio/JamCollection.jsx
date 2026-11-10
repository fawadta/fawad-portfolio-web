import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { getYouTubeId } from "./ProjectMedia";
import VideoEmbed from "./VideoEmbed";
import { Image } from "@/components/ui/image";

/**
 * A single game built during a game jam.
 * @typedef {Object} GameJam
 * @property {string} name Jam project title.
 * @property {string} focus Short mechanics or theme label.
 * @property {string} note Short description of what the jam project delivered.
 * @property {string} platform Platform it was built for.
 * @property {string} [video] YouTube URL for the gameplay recording.
 * @property {string} [image] Still image shown when there is no recording.
 * @property {string} [mediaNote] Small note shown in place of a recording.
 * @property {string} [label] Highlight label — used for Global Game Jam entries.
 * @property {string} [link] Official Global Game Jam page for the entry.
 */

/** @param {{ jams?: GameJam[] }} props */
export default function JamCollection({ jams = [], active = true }) {
  const [index, setIndex] = useState(0);

  if (!jams.length) return null;

  const position = Math.min(index, jams.length - 1);
  const jam = jams[position];
  const videoId = getYouTubeId(jam.video);
  const highlightCount = jams.filter((item) => item.label).length;

  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
            {String(jams.length).padStart(2, "0")} Game Jams
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            2022 – 2024
          </span>
          {highlightCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
              <Globe size={11} />
              {highlightCount} Global Game Jam
            </span>
          )}
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
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-ink">
            {jams.map((item, i) => {
              const id = getYouTubeId(item.video);
              return id ? (
                <div key={item.name} aria-hidden={!active || i !== position}
                  className={`absolute inset-0 ${i === position ? "" : "invisible pointer-events-none"}`}>
                  <VideoEmbed videoId={id} active={active && i === position} title={`${item.name} — gameplay`} />
                </div>
              ) : null;
            })}
            {videoId ? null : jam.image ? (
              <Image
                src={jam.image}
                alt={`${jam.name} — ${jam.label || "game jam project"}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface px-6 text-center">
                <Globe size={20} className="text-amber" />
                <p className="font-display text-xl font-bold text-ghost">
                  {jam.name}
                </p>
                {jam.mediaNote && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {jam.mediaNote}
                  </p>
                )}
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ghost backdrop-blur">
              {jam.platform}
            </span>
            {jam.label && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink shadow-lg">
                <Globe size={11} />
                {jam.label}
              </span>
            )}
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
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            {jam.video && (
              <a
                href={jam.video}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-2 border-b border-amber/40 pb-1 font-mono text-xs uppercase tracking-widest text-amber transition-colors hover:border-amber"
              >
                Watch on YouTube
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}
            {jam.link && (
              <a
                href={jam.link}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-2 border-b border-amber/40 pb-1 font-mono text-xs uppercase tracking-widest text-amber transition-colors hover:border-amber"
              >
                <Globe size={13} />
                GGJ Official Page
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <div className="scrollbar-themed -mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
        {jams.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === position}
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              i === position
                ? "border-amber/60 bg-amber/10 text-amber"
                : "border-border text-muted-foreground hover:border-amber/40 hover:text-ghost"
            }`}
          >
            {item.label && <Globe size={11} className="text-amber" />}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}