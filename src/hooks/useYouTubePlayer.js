import { useCallback, useEffect, useRef, useState } from "react";
import { afterPageLoad } from "@/lib/afterPageLoad";

export const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

export default function useYouTubePlayer(active) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const mountedRef = useRef(false);
  const readyRef = useRef(false);
  const pendingWarmRef = useRef(false);
  const requestedPlayRef = useRef(false);
  const command = useCallback((func, args = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }), YOUTUBE_ORIGIN
    );
  }, []);
  const warm = useCallback(() => {
    if (!active || mountedRef.current) return;
    pendingWarmRef.current = true;
    if (document.readyState !== "complete") return;
    mountedRef.current = true;
    // Autoplay is chosen only at creation; clicking a warm player never changes its URL.
    setAutoplay(requestedPlayRef.current);
    setMounted(true);
  }, [active]);

  useEffect(() => {
    if (!active || mounted) return;
    let observer;
    const cancel = afterPageLoad(() => {
      if (pendingWarmRef.current) warm();
      if (mountedRef.current || !window.IntersectionObserver) return;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {
          warm();
          observer.disconnect();
        }
      }, { rootMargin: "600px 0px", threshold: 0 });
      if (containerRef.current) observer.observe(containerRef.current);
    });
    return () => { cancel(); observer?.disconnect(); };
  }, [active, mounted, warm]);

  useEffect(() => {
    if (!mounted) return;
    const receive = (event) => {
      if (event.origin !== YOUTUBE_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      if (data?.event !== "onReady" && data?.event !== "initialDelivery") return;
      readyRef.current = true;
      setReady(true);
      if (requestedPlayRef.current && active) command("playVideo");
      else if (!active) command("pauseVideo");
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [active, mounted, command]);

  useEffect(() => {
    if (!active) {
      requestedPlayRef.current = false;
      command("pauseVideo");
    }
  }, [active, command]);

  const onLoad = () => {
    command("addEventListener", ["onReady"]);
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening" }), YOUTUBE_ORIGIN
    );
  };
  const play = () => {
    if (!active) return;
    requestedPlayRef.current = true;
    setClicked(true);
    warm();
    if (readyRef.current) command("playVideo");
  };
  return { containerRef, frameRef, mounted, ready, clicked, autoplay, warm, onLoad, play };
}