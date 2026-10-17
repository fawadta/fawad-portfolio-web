import { profile } from "@/lib/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ink py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-cyan/40 font-mono text-xs font-semibold text-cyan">
            FA
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {profile.name} — {profile.title}
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Built with Unity-grade precision · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}