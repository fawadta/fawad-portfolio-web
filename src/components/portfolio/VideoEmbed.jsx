import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Image } from "@/components/ui/image";

/**
 * Click-to-load YouTube player. Nothing is requested from YouTube until someone
 * presses play: the initial paint is a thumbnail plus a play button, which keeps
 * several video players (and their cookies, scripts and network cost) out of the
 * page load entirely.
 */
export default function VideoEmbed({ videoId, title, active = true, start, end }) {
  const [playing, setPlaying] = useState(false);

  // Switching tabs or closing the lightbox stops playback, so the facade returns
  // and the player stops holding a connection.
  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);

  if (!playing) {
    return (
      <div className="absolute inset-0">
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fittingType="fill"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan/60 bg-ink/70 text-cyan backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
            <Play size={22} fill="currentColor" className="translate-x-0.5" />
          </span>
        </button>
      </div>
    );
  }

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    enablejsapi: "1",
    origin: window.location.origin,
  });
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));

  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
      className="absolute inset-0 h-full w-full"
    />
  );
}