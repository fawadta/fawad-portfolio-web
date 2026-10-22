import { Box } from "lucide-react";
import { Image } from "@/components/ui/image";

export function getYouTubeId(url) {
  if (!url) return null;
  const match = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{6,})/
  );
  return match ? match[1] : null;
}

export default function ProjectMedia({ project, index, total }) {
  const videoId = getYouTubeId(project.video);

  const indexBadge = (tone) => (
    <div
      className={`pointer-events-none absolute left-4 top-4 z-10 rounded-md border bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm ${
        tone === "cyan" ? "border-cyan/40 text-cyan" : "border-border text-muted-foreground"
      }`}
    >
      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );

  if (videoId) {
    return (
      <div className="relative h-full w-full bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={`${project.name} — ${project.tagline}`}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
        {indexBadge("muted")}
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="group relative h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        {indexBadge("cyan")}
      </div>
    );
  }

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
      {indexBadge("muted")}
    </div>
  );
}