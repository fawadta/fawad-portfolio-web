import { Link } from "react-router-dom";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Phone, Printer } from "lucide-react";
import { experience, expertise, profile, proofPoints } from "@/lib/portfolioData";

// The résumé copy is plain text: the timeline marks words with ** and *.
const plain = (text) =>
  text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

function Block({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Resume() {
  return (
    <main className="resume-page min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-center justify-between gap-4 print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
          >
            <ArrowLeft size={13} />
            Back to portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ghost transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <Printer size={13} />
            Save as PDF
          </button>
        </div>

        <header className="border-b border-border pb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ghost sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            {profile.title}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-cyan">
              <Mail size={12} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-1.5 hover:text-cyan"
            >
              <Phone size={12} />
              {profile.phone}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} />
              {profile.location}
            </span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
              <Linkedin size={12} />
              linkedin.com/in/fawadta
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
              <Github size={12} />
              github.com/fawadta
            </a>
          </div>
        </header>

        <Block title="Summary">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Unity game developer with more than 5 years of experience. I build mobile, PC and XR
            games, and I have delivered more than 41 titles and prototypes. My most downloaded
            release, Water Park Simulator, passed 100,000 downloads on Google Play. I work with
            teams and alone, from the first prototype to the store release.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {point.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-ghost">{point.value}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Experience">
          <div className="space-y-7">
            {experience.map((job) => (
              <article key={job.company}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-base font-bold text-ghost">
                    {job.company}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {job.duration}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {job.role}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {job.points.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{plain(point)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Block>

        <Block title="Skills">
          <div className="grid gap-5 sm:grid-cols-2">
            {expertise.map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-sm font-bold text-ghost">{group.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <footer className="mt-12 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-cyan">
            fawadta.com
          </Link>
        </footer>
      </div>
    </main>
  );
}