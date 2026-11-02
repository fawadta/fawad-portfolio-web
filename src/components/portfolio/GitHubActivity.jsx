import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { profile } from "@/lib/portfolioData";
import SectionHeading from "./SectionHeading";
import ActivityHeatmap from "./ActivityHeatmap";

export default function GitHubActivity() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    base44.functions
      .invoke("githubActivity", {})
      .then((response) => setData(response.data))
      .catch(() => setFailed(true));
  }, []);

  const stats = data
    ? [
        { label: "Contributions · 12 mo", value: data.total.toLocaleString() },
        { label: "Current streak", value: `${data.currentStreak} d` },
        { label: "Longest streak", value: `${data.longestStreak} d` },
      ]
    : [];

  return (
    <section id="activity" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="03" kicker="Live Signal" title="Commit Activity" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-border bg-surface/40 p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-ink/50 text-cyan">
                <Github size={18} />
              </span>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  GitHub · live from the API
                </span>
                <span className="block font-display text-base font-semibold text-ghost">
                  {data ? `@${data.login}` : "Syncing activity…"}
                </span>
              </div>
            </div>

            <a
              href={data?.url || profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 border-b border-cyan/40 pb-1 font-mono text-[10px] uppercase tracking-widest text-cyan transition-colors hover:border-cyan"
            >
              View profile
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {failed && (
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              Live GitHub activity is unavailable right now — try again shortly.
            </p>
          )}

          {!failed && !data && (
            <div className="mt-6 space-y-3">
              <div className="flex gap-[3px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-3 w-3 animate-pulse rounded-[2px] bg-white/5" />
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Fetching contribution graph…
              </p>
            </div>
          )}

          {data && (
            <>
              <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-ink/40">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-3 py-3 sm:px-4">
                    <span className="block font-display text-xl font-bold text-ghost sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <ActivityHeatmap weeks={data.weeks} />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}