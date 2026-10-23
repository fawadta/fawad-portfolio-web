import { useState } from "react";
import { Box } from "lucide-react";
import { Image } from "@/components/ui/image";
import MediaGallery from "./MediaGallery";
import MediaTabs from "./MediaTabs";

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

export default function ProjectMedia({ project, index, total }) {
  const tabs = project.media?.length ? project.media : null;
  const [active, setActive] = useState(0);
  const current = tabs ? tabs[active] : project;

  const videoId = getYouTubeId(current.video);
  const hasVideo = tabs ? tabs.some((t) => t.video) : !!project.video;
  const showsImages = Boolean(current.images?.length || current.image);

  let media;
  if (videoId) {
    media = (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`${project.name} — ${current.label || project.tagline}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  } else if (current.images?.length) {
    media = (
      <MediaGallery
        key={current.label}
        images={current.images}
        fit={current.fit}
        altBase={`${project.name} — ${current.label}`}
      />
    );
  } else if (current.image) {
    media = (
      <div className="group relative h-full w-full overflow-hidden">
        <Image
          src={current.image}
          alt={`${project.name} — ${project.tagline}`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      </div>
    );
  } else {
    media = <Placeholder project={project} />;
  }

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-xl border border-border bg-surface ${
          hasVideo ? "aspect-video" : "aspect-[16/10]"
        }`}
      >
        {media}
        <div
          className={`pointer-events-none absolute left-4 top-4 z-10 rounded-md border bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm ${
            showsImages ? "border-cyan/40 text-cyan" : "border-border text-muted-foreground"
          }`}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {tabs && <MediaTabs tabs={tabs} active={active} onChange={setActive} />}
    </div>
  );
}