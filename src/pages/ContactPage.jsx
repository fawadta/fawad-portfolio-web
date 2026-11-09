import PageShell from "@/components/portfolio/PageShell";
import Contact from "@/components/portfolio/Contact";
import { profile } from "@/lib/portfolioData";

const TITLE = "Contact Fawad Ahmad — Unity and XR Developer";
const DESCRIPTION =
  "Get in touch about senior Unity roles, contracts or collaborations across mobile, PC and Meta Quest. Email contact@fawadta.com or send a message.";

export default function ContactPage() {
  return (
    <PageShell title={TITLE} description={DESCRIPTION}>
      <section className="border-b border-border bg-surface-2/40 pb-14 pt-24 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            // contact
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1] tracking-tight text-ghost sm:text-5xl md:text-6xl">
            Contact Fawad Ahmad
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Open to senior Unity roles, contracts and collaborations across mobile, PC and XR.
            Email <a className="text-cyan underline underline-offset-2" href={`mailto:${profile.email}`}>{profile.email}</a>,
            call {profile.phone}, or send a message below. Based in {profile.location}, working remotely.
          </p>
        </div>
      </section>

      <Contact />
    </PageShell>
  );
}