import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { projects } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import ProjectRail from "./ProjectRail";
import ProjectMedia from "./ProjectMedia";
import PrototypeCollection from "./PrototypeCollection";
import JamCollection from "./JamCollection";

const INITIAL_VISIBLE = 5;

const statusStyles = {
  Shipped: "text-cyan",
  Live: "text-cyan",
  Showcase: "text-ghost",
  "In Production": "text-amber",
  "Award-winning": "text-amber",
};

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = projects.length > INITIAL_VISIBLE;
  const visible = expanded ? projects : projects.slice(0, INITIAL_VISIBLE);

  const jumpTo = (id) => {
    const index = projects.findIndex((project) => project.id === id);
    if (index >= INITIAL_VISIBLE) setExpanded(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(`project-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" kicker="Selected Work" title="Project Viewport" />

        <div className="space-y-20 sm:space-y-28">
          {visible.map((project, i) => {
            const reversed = i % 2 === 1;
            const isCollection = Boolean(project.prototypes || project.jams);
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                id={`project-${project.id}`}
                className={
                  isCollection
                    ? "scroll-mt-32"
                    : "grid scroll-mt-32 items-center gap-8 lg:grid-cols-12 lg:gap-12"
                }
              >
                {!isCollection && (
                  <div
                    className={`lg:col-span-7 ${
                      reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <ProjectMedia project={project} />
                  </div>
                )}

                <div
                  className={
                    isCollection
                      ? "max-w-3xl"
                      : `lg:col-span-5 ${reversed ? "lg:order-1" : "lg:order-2"}`
                  }
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
                    <span className="h-3 w-px bg-border" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
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
                    {project.year && (
                      <div className="flex gap-3">
                        <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Year
                        </dt>
                        <dd className="font-mono text-xs text-ghost">{project.year}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <ReactMarkdown
                      components={{
                        p: ({ node: _node, ...props }) => <p {...props} />,
                        strong: ({ node: _node, ...props }) => (
                          <strong className="font-semibold text-ghost" {...props} />
                        ),
                        em: ({ node: _node, ...props }) => <em className="italic" {...props} />,
                        a: ({ node: _node, ...props }) => (
                          <a
                            className="text-cyan underline underline-offset-2"
                            target="_blank"
                            rel="noreferrer"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {project.description}
                    </ReactMarkdown>
                  </div>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link mt-6 inline-flex items-center gap-2 border-b border-cyan/40 pb-1 font-mono text-xs uppercase tracking-widest text-cyan transition-colors hover:border-cyan"
                    >
                      {project.linkLabel || "Launch Project"}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  ) : project.linkLabel ? (
                    <span className="mt-6 inline-flex items-center gap-2 border-b border-dashed border-border pb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {project.linkLabel}
                      <span className="font-mono normal-case tracking-normal text-muted-foreground/70">
                        (Coming soon)
                      </span>
                    </span>
                  ) : null}
                </div>

                {project.prototypes && (
                  <PrototypeCollection prototypes={project.prototypes} />
                )}

                {project.jams && <JamCollection jams={project.jams} />}
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

      <ProjectRail projects={projects} onSelect={jumpTo} />
    </section>
  );
}