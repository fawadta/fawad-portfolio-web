import { useState } from "react";
import { Box, Maximize2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { sizedImage } from "@/lib/cloudinary";
import Lightbox from "./Lightbox";
import MediaGallery from "./MediaGallery";
import MediaTabs from "./MediaTabs";
import StoreCard from "./StoreCard";
import VideoEmbed from "./VideoEmbed";

export function getYouTubeId(url) {
  if (!url) return null;
  const match = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{6,})/
  );
  return match ? match[1] : null;
}

export function getYouTubeStart(url) {
  if (!url) return null;
  const match = String(url).match(/[?&](?:t|start)=(\d+)/);
  return match ? Number(match[1]) : null;
}

function Placeholder({ project }) {
  return (
    <div className="group relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-surface to-ink">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className={`pointer-events-none absolute inset-0 opacity-30 blur-[80px] ${
          project.accent === "amber" ? "bg-amber/20" : "bg-cyan/20"
        }`}
      />
      <div className="relative text-center">
        <Box
          size={40}
          className={`mx-auto mb-3 ${project.accent === "amber" ? "text-amber/70" : "text-cyan/70"}`}
        />
        <div className="font-display text-5xl font-bold text-stroke sm:text-6xl">
          {project.name.split(" ").map((w) => w[0]).join("")}
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          gameplay media · coming soon
        </div>
      </div>
    </div>
  );
}

export default function ProjectMedia({ project, active: projectActive = true }) {
  const tabs = project.media?.length ? project.media : null;
  const items = tabs || [project];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasVideo = items.some((item) => item.video);
  const activeItem = items[active] || items[0];
  const videoCaption = activeItem?.video
    ? activeItem.caption || activeItem.videoCaption
    : null;

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-xl border border-border bg-surface ${
          hasVideo ? "aspect-video" : "aspect-[16/10]"
        }`}
      >
        {items.map((item, i) => {
          const videoId = getYouTubeId(item.video);
          const store = item.media && !Array.isArray(item.media) ? item.media : null;
          const isActive = projectActive && i === active;

          return (
            <div
              key={item.label || project.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-300 ${
                isActive ? "z-10 opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {videoId ? (
                <VideoEmbed
                  videoId={videoId}
                  start={getYouTubeStart(item.video)}
                  end={item.end || item.videoEnd}
                  active={isActive}
                  title={`${project.name} — ${item.label || project.tagline}`}
                />
              ) : item.images?.length ? (
                <MediaGallery
                  images={item.images}
                  fit={item.fit}
                  altBase={`${project.name} — ${item.label}`}
                />
              ) : item.image ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Enlarge ${project.name} image`}
                  className="group relative block h-full w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <Image
                    src={sizedImage(item.image, 1200)}
                    srcSet={[400, 640, 960, 1200].map((width) => `${sizedImage(item.image, width)} ${width}w`).join(", ")}
                    sizes="(max-width: 639px) calc(100vw - 84px), (max-width: 1023px) calc(100vw - 112px), 650px"
                    loading="lazy"
                    decoding="async"
                    alt={`${project.name} — ${project.tagline}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    fittingType="fill"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-border bg-ink/70 text-ghost opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <Maximize2 size={14} />
                  </span>
                </button>
              ) : store ? (
                <StoreCard store={store} />
              ) : (
                <Placeholder project={project} />
              )}
            </div>
          );
        })}
      </div>

      {videoCaption && (
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{videoCaption}</p>
      )}

      {tabs && <MediaTabs tabs={tabs} active={active} onChange={setActive} />}

      <Lightbox
        open={lightboxOpen}
        images={activeItem?.image ? [activeItem.image] : []}
        index={0}
        onIndexChange={() => {}}
        onClose={() => setLightboxOpen(false)}
        altBase={project.name}
      />
    </div>
  );
}