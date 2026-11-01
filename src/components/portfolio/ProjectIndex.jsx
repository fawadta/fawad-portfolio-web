import { useEffect, useRef, useState } from "react";

export default function ProjectIndex({ projects, onSelect }) {
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const railRef = useRef(null);

  useEffect(() => {
    const update = () => {
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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const chip = rail.querySelector(`[data-chip="${activeId}"]`);
    if (!chip) return;
    const left = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="sticky top-16 z-30 -mx-5 mb-12 border-y border-border/60 bg-ink/90 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8">
      <div className="flex items-center gap-3 py-2.5">
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:block">
          // project_index
        </span>
        <div
          ref={railRef}
          className="scrollbar-themed flex flex-1 gap-1.5 overflow-x-auto pb-1"
        >
          {projects.map((project, i) => {
            const isActive = project.id === activeId;
            return (
              <button
                key={project.id}
                type="button"
                data-chip={project.id}
                onClick={() => onSelect(project.id)}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan ${
                  isActive
                    ? "border-cyan/60 bg-cyan/10 text-cyan"
                    : "border-transparent text-muted-foreground hover:text-ghost"
                }`}
              >
                <span className="mr-1.5 opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {project.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}