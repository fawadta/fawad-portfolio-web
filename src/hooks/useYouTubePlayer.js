import { useCallback, useEffect, useRef, useState } from "react";
import { requestVideoPreload, cancelVideoPreload } from "@/lib/videoPreloadQueue";

export const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

export default function useYouTubePlayer(active) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const frameRef = useRef(null);
  const finishRef = useRef(null);
  const mount = useCallback(() => new Promise((resolve) => {
    finishRef.current = resolve;
    setMounted(true);
  }), []);
  const pause = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), YOUTUBE_ORIGIN
    );
  }, []);
  useEffect(() => {
    // Every player joins, including inactive tabs and collapsed projects.
    requestVideoPreload(mount);
    return () => { cancelVideoPreload(mount); finishRef.current?.(); };
  }, [mount]);
  useEffect(() => { if (!active) pause(); }, [active, pause]);
  const onLoad = () => {
    setReady(true);
    finishRef.current?.();
    finishRef.current = null;
    if (!active) pause();
  };
  const play = () => {
    cancelVideoPreload(mount);
    setAutoplay(true);
    setMounted(true);
  };
  return { frameRef, mounted, ready, autoplay, onLoad, play };
}