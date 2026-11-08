import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/portfolioData";

// Contact is reached through the Get in Touch button, so it isn't repeated as a nav item.
const sectionLinks = navLinks.filter((link) => link.href !== "#contact");

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/70 border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/40 font-mono text-sm font-semibold text-cyan transition-colors group-hover:bg-cyan/10">
              FA
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-wide text-ghost sm:block">
              Fawad Ahmad
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {sectionLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="rounded-md px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="ml-2 rounded-md border border-cyan/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan transition-all hover:bg-cyan hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            >
              Get in Touch
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-ghost md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/60 bg-ink/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col py-3">
              {sectionLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="px-2 py-3 text-left font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="mt-2 rounded-md bg-cyan px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink"
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}