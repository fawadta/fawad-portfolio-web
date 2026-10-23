import { useState } from "react";
import { Box } from "lucide-react";
import { Image } from "@/components/ui/image";
import MediaGallery from "./MediaGallery";
import MediaTabs from "./MediaTabs";
import VideoEmbed from "./VideoEmbed";

export function getYouTubeId(url) {
  if (!url) return null;
  const match = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{6,})/
  );
  return match ? match[1] : null;
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

export default function ProjectMedia({ project }) {
  const tabs = project.media?.length ? project.media : null;
  const items = tabs || [project];
  const [active, setActive] = useState(0);

  const hasVideo = items.some((item) => item.video);

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-xl border border-border bg-surface ${
          hasVideo ? "aspect-video" : "aspect-[16/10]"
        }`}
      >
        {items.map((item, i) => {
          const videoId = getYouTubeId(item.video);
          const isActive = i === active;

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
                <div className="group relative h-full w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${project.name} — ${project.tagline}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    fittingType="fill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </div>
              ) : (
                <Placeholder project={project} />
              )}
            </div>
          );
        })}
      </div>

      {tabs && <MediaTabs tabs={tabs} active={active} onChange={setActive} />}
    </div>
  );
}