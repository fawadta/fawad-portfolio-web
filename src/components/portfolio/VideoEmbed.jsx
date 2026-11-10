import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import { requestVideoPreload, cancelVideoPreload } from "@/lib/videoPreloadQueue";

const PLAYER = "https://www.youtube-nocookie.com";

/**
 * A YouTube player that warms itself up in the background.
 *
 * The page paints with a thumbnail and a play button only. Once the page has
 * finished loading, players are mounted one at a time — first the ones nearest
 * the viewport — so nothing competes with the first render, but by the time
 * someone presses play the player is already there and starts instantly.
 */
export default function VideoEmbed({ videoId, title, active = true, start, end }) {
  const [mounted, setMounted] = useState(false);
  const [autoplayOnMount, setAutoplayOnMount] = useState(false);
  const [playing, setPlaying] = useState(false);
  const shellRef = useRef(null);
  const frameRef = useRef(null);
  const playingRef = useRef(false);

  const mountPlayer = useCallback(() => setMounted(true), []);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  // Register for warm-up as this embed gets near the viewport; leaving the area
  // or switching media tabs drops it from the queue again.
  useEffect(() => {
    if (!active || mounted || !("IntersectionObserver" in window)) return;
    const node = shellRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) requestVideoPreload(mountPlayer);
        else cancelVideoPreload(mountPlayer);
      },
      { rootMargin: "1200px 0px" }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelVideoPreload(mountPlayer);
    };
  }, [active, mounted, mountPlayer]);

  const sendCommand = useCallback((func) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      PLAYER
    );
  }, []);

  // A warmed player may still be buffering when the first command goes out.
  useEffect(() => {
    if (!playing) return;
    const timers = [120, 900].map((ms) =>
      window.setTimeout(() => sendCommand("playVideo"), ms)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, sendCommand]);

  // Leaving the tab or closing the lightbox stops playback. The warmed player
  // stays mounted, so coming back resumes without fetching anything again.
  useEffect(() => {
    if (active || !playing) return;
    sendCommand("pauseVideo");
    setPlaying(false);
  }, [active, playing, sendCommand]);

  const handlePlay = () => {
    if (mounted) {
      setPlaying(true);
      sendCommand("playVideo");
      return;
    }
    // Not warmed up yet (only right after entry, before the queue reaches it):
    // ask for sound-on playback in the embed URL so this press still starts.
    setAutoplayOnMount(true);
    setMounted(true);
    setPlaying(true);
  };

  const params = new URLSearchParams({
    rel: "0",
    enablejsapi: "1",
    playsinline: "1",
    origin: window.location.origin,
  });
  if (autoplayOnMount) params.set("autoplay", "1");
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));

  return (
    <div ref={shellRef} className="absolute inset-0">
      {mounted && (
        <iframe
          ref={frameRef}
          src={`${PLAYER}/embed/${videoId}?${params.toString()}`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder="0"
          allowFullScreen
          aria-hidden={!playing}
          onLoad={() => {
            if (playingRef.current) sendCommand("playVideo");
          }}
          className={`absolute inset-0 h-full w-full transition-opacity duration-200 ${
            playing ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      )}

      {!playing && (
        <>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            fittingType="fill"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan/60 bg-ink/70 text-cyan backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
              <Play size={22} fill="currentColor" className="translate-x-0.5" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}