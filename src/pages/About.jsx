import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/portfolio/PageShell";
import AboutServices from "@/components/portfolio/AboutServices";
import AboutFaq from "@/components/portfolio/AboutFaq";
import { profile, proofPoints, processSteps } from "@/lib/portfolioData";

const TITLE = "About Fawad Ahmad, Unity game developer";
const DESCRIPTION =
  "Fawad Ahmad is a senior Unity game developer in Lahore. He has more than 5 years of experience with mobile, PC, Xbox, WebGL and Meta Quest games.";

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
            I am a senior Unity game developer and generalist in {profile.location}. I have 5 years
            of experience with cross-platform games and XR experiences.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ghost sm:text-3xl">What this site is</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This site shows the work of Fawad Ahmad, a Unity game developer. He makes games and
          interactive experiences for mobile, desktop, console, WebGL and virtual reality. The site
          collects his projects, the systems behind each project and the tools that he uses. Each
          project entry shows the platform, the genre and the exact role. When the work is public,
          the entry also has gameplay video or a store listing that the reader can check.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">Who this site is for</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Hiring managers and recruiters who look for a senior Unity developer. Studios that need an
          experienced developer on a live production. XR teams that build for Meta Quest. Founders
          who need one generalist to take a prototype from the idea to the store submission. Other
          developers can also check specific implementations, such as hand validation engines, replay
          systems, Photon multiplayer and Quest performance work.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">Who does the work</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Fawad Ahmad is a senior Unity game developer at Katana Games. He works on rehabilitation VR,
          a Mahjong game with a hand validation engine of 30,000 lines, a drone training simulator, an
          HDRP cinematic and learning apps for Egypt and Pakistan. Before that, he worked for two years
          at Skyimpel Ltd. on multiplayer and live-service mobile games. He started at Mindstorm
          Studios, where his final year project took first place in the COMSATS University design
          competition. He has worked on {proofPoints[0].value} titles and prototypes. He can do each
          task that a small team needs: gameplay code, UI flow, multiplayer, VFX, audio and publishing.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">How the work goes</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Each engagement starts with a playable core loop, not a document. That loop becomes a
          vertical slice at final quality. The slice becomes a store-ready build with all platform
          requirements complete. This includes Quest performance limits, App Store review rules and a
          WebGL build that must load fast.
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