import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Box, ChevronDown } from "lucide-react";
import { projects } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import { Image } from "@/components/ui/image";

const INITIAL_VISIBLE = 5;

const statusStyles = {
  Shipped: "text-cyan",
  Live: "text-cyan",
  Showcase: "text-ghost",
  "In Production": "text-amber",
  "Award-winning": "text-amber",
};

function ProjectMedia({ project, index }) {
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
        <div className="absolute left-4 top-4 rounded-md border border-cyan/40 bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
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
      <div className="absolute left-4 top-4 rounded-md border border-border bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = projects.length > INITIAL_VISIBLE;
  const visible = expanded ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" kicker="Selected Work" title="Project Viewport" />

        <div className="space-y-20 sm:space-y-28">
          {visible.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
                    <ProjectMedia project={project} index={i} />
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 ${
                    reversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest ${
                        statusStyles[project.status] || "text-muted-foreground"
                      }`}
                    >
                      {(project.status === "In Production" ||
                        project.status === "Award-winning") && (
                        <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-amber" />
                      )}
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-bold text-ghost sm:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    {project.tagline}
                  </p>

                  <dl className="mt-6 space-y-2 border-l border-border pl-4">
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Platform
                      </dt>
                      <dd className="font-mono text-xs text-ghost">{project.platform}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Genre
                      </dt>
                      <dd className="font-mono text-xs text-ghost">{project.genre}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Role
                      </dt>
                      <dd className="font-mono text-xs text-ghost">{project.role}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {project.impact}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link mt-6 inline-flex items-center gap-2 border-b border-cyan/40 pb-1 font-mono text-xs uppercase tracking-widest text-cyan transition-colors hover:border-cyan"
                    >
                      Launch Project
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {hasOverflow && (
          <div className="mt-16 flex justify-center sm:mt-20">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-widest text-ghost transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              {expanded ? "Show Less" : `Show All ${projects.length} Projects`}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}