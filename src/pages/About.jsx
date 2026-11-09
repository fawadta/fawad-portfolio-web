import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/portfolio/PageShell";
import AboutServices from "@/components/portfolio/AboutServices";
import AboutFaq from "@/components/portfolio/AboutFaq";
import { profile, proofPoints, processSteps } from "@/lib/portfolioData";

const TITLE = "About Fawad Ahmad — Unity Game Developer";
const DESCRIPTION =
  "Fawad Ahmad is a senior Unity developer and generalist in Lahore with 5+ years building mobile, PC, Xbox, WebGL and Meta Quest games.";

export default function About() {
  return (
    <PageShell title={TITLE} description={DESCRIPTION}>
      <section className="border-b border-border bg-surface-2/40 pb-14 pt-24 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">// about</span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1] tracking-tight text-ghost sm:text-5xl md:text-6xl">
            About Fawad Ahmad
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Senior Unity developer and generalist, five years into building cross-platform games and
            immersive XR experiences from {profile.location}.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ghost sm:text-3xl">What this site is</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This site is the working portfolio of Fawad Ahmad, a Unity game developer who ships games
          and interactive experiences across mobile, desktop, console, WebGL and virtual reality. It
          collects the projects he has built, the systems behind them and the tools he reaches for,
          so anyone evaluating his work can see shipped results instead of a list of claims. Every
          project entry carries the platform, the genre, the exact role played and, where the work is
          public, gameplay footage or a store listing to verify it.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">Who it is for</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Hiring managers and recruiters evaluating a senior Unity developer, studios that need an
          experienced pair of hands on a live production, XR teams building for Meta Quest, and
          founders looking for a generalist who can carry a prototype from idea to store submission.
          It is also for other developers checking specific implementations, from hand-validation
          engines and replay systems to Photon multiplayer and Quest performance work.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">Who builds it</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Fawad Ahmad is a senior Unity game developer at Katana Games, where he works on rehabilitation
          VR, a Mahjong title with a 30,000 line hand-validation engine, a drone training simulator, an
          HDRP cinematic and educational apps for Egypt and Pakistan. Before that he spent two years at
          Skyimpel Ltd. on multiplayer and live-service mobile games, and started out at Mindstorm
          Studios, where his final year project was ranked first in COMSATS University's design
          competition. Across {proofPoints[0].value.toLowerCase()} titles and prototypes he has worked
          in every discipline a small team needs: gameplay code, UI flow, multiplayer, VFX, audio and
          publishing.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">How the work runs</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every engagement starts with a playable core loop rather than a document. That loop becomes a
          vertical slice built to final quality, and the slice becomes a store-ready build with the
          platform quirks handled, whether that means Quest performance budgets, App Store review rules
          or a WebGL payload that has to load fast.
        </p>
        <ol className="mt-6 space-y-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border-l border-border pl-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-ghost">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>

        <AboutServices />
        <AboutFaq />

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-[1.01]"
          >
            Get in touch
            <ArrowUpRight size={14} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
          >
            See the selected work
          </Link>
        </div>
      </article>
    </PageShell>
  );
}