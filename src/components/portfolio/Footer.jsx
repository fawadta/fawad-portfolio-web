import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolioData";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
  ];

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan/40 font-mono text-xs font-semibold text-cyan">
              FA
            </span>
            <div>
              <p className="text-sm font-semibold text-ghost">{profile.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {profile.title}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 sm:items-end">
            <nav className="flex items-center gap-5" aria-label="Footer">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan focus-visible:outline-none focus-visible:text-cyan"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-cyan/50 hover:text-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            >
              Back to top
              <ArrowUp
                size={12}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border/70 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Unity · XR · Cross-platform
          </p>
        </div>
      </div>
    </footer>
  );
}