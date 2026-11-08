import { useEffect, useState } from "react";

export default function ProjectRail({ projects, onSelect }) {
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const section = document.getElementById("work");
      if (section) {
        const rect = section.getBoundingClientRect();
        setVisible(
          rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45
        );
      }

      const threshold = 170;
      let current = projects[0]?.id;
      for (const project of projects) {
        const el = document.getElementById(`project-${project.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top - threshold <= 0) current = project.id;
        else break;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [projects]);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed right-1 top-1/2 z-40 flex max-h-[calc(100svh-8rem)] w-11 -translate-y-1/2 flex-col items-center transition-opacity duration-300 sm:right-3 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {projects.map((project) => {
        const isActive = project.id === activeId;
        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project.id)}
            aria-label={`Jump to ${project.name}`}
            aria-current={isActive ? "true" : undefined}
            tabIndex={visible ? 0 : -1}
            className={`group relative flex h-7 min-h-0 w-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary sm:h-6 ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute right-full top-1/2 mr-1.5 hidden -translate-y-1/2 whitespace-nowrap rounded-md border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-200 sm:block group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 ${
                isActive ? "border-primary/30 text-primary" : "border-border text-foreground"
              }`}
            >
              {project.name}
            </span>
            <span
              aria-hidden="true"
              className={`h-[2px] rounded-full transition-all duration-300 ${
                isActive
                  ? "w-5 bg-cyan sm:w-7"
                  : "w-3 bg-muted-foreground/50 group-hover:bg-ghost/70 sm:w-4"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}