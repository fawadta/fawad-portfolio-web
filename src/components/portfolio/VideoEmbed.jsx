import { LoaderCircle } from "lucide-react";
import useYouTubePlayer, { YOUTUBE_ORIGIN } from "@/hooks/useYouTubePlayer";
import VideoPreview from "@/components/portfolio/VideoPreview";

export default function VideoEmbed({ videoId, title, active = true, start, end }) {
  const player = useYouTubePlayer(active);
  const params = new URLSearchParams({
    rel: "0", controls: "1", enablejsapi: "1", playsinline: "1",
    origin: window.location.origin,
  });
  if (player.autoplay) params.set("autoplay", "1");
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));

  return (
    <div className="absolute inset-0" aria-busy={player.mounted && !player.ready}>
      {!player.mounted ? (
        <VideoPreview videoId={videoId} title={title} active={active} onPlay={player.play} />
      ) : (
        <>
          <iframe ref={player.frameRef}
            src={`${YOUTUBE_ORIGIN}/embed/${videoId}?${params.toString()}`}
            title={title} loading="eager" tabIndex={active ? 0 : -1}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
            onLoad={player.onLoad} className="absolute inset-0 h-full w-full border-0" />
          {!player.ready && (
            <div role="status" aria-label={`Loading YouTube: ${title}`}
              className="pointer-events-none absolute inset-0 grid place-items-center bg-background/60 text-foreground">
              <LoaderCircle size={28} className="animate-spin" aria-hidden="true" />
            </div>
          )}
        </>
      )}
    </div>
  );
}