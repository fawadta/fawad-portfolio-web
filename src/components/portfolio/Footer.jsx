import { Link } from "react-router-dom";
import { profile } from "@/lib/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();
  const available = profile.isAvailable !== false;

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cyan/40 font-mono text-xs font-semibold text-cyan">
            FA
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {profile.name} — {profile.title}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
              available
                ? "border-success/40 bg-success/10 text-success"
                : "border-border bg-surface/40 text-muted-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                available ? "animate-breathe bg-success" : "bg-muted-foreground"
              }`}
            />
            {available ? "Currently available" : "Currently unavailable"}
          </span>
        </div>

        <nav
          aria-label="Site pages"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-cyan">
            Home
          </Link>
          <Link to="/about" className="transition-colors hover:text-cyan">
            About
          </Link>
          <Link to="/contact" className="transition-colors hover:text-cyan">
            Contact
          </Link>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-cyan">
            {profile.email}
          </a>
        </nav>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}