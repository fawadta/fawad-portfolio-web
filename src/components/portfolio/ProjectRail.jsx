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
      className={`fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 transition-opacity duration-300 lg:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
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
            className="group flex items-center gap-2.5 py-1 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={`whitespace-nowrap rounded-md border bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm transition-all duration-200 ${
                isActive
                  ? "border-cyan/30 text-cyan opacity-100"
                  : "border-border/60 text-ghost opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              }`}
            >
              {project.name}
            </span>
            <span
              aria-hidden="true"
              className={`h-[2px] rounded-full transition-all duration-300 ${
                isActive
                  ? "w-7 bg-cyan"
                  : "w-4 bg-muted-foreground/40 group-hover:w-5 group-hover:bg-ghost/70"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}