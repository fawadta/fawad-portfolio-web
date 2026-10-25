import { useEffect, useRef } from "react";

export default function VideoEmbed({ videoId, title, active, start, end }) {
  const ref = useRef(null);
  const params = new URLSearchParams({
    enablejsapi: "1",
    origin: window.location.origin,
  });
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));

  useEffect(() => {
    if (active) return;
    ref.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
      "*"
    );
  }, [active]);

  return (
    <iframe
      ref={ref}
      src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
      className="absolute inset-0 h-full w-full"
    />
  );
}