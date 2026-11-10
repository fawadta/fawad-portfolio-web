import { lazy, Suspense } from "react";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import ProofStrip from "@/components/portfolio/ProofStrip";
import Expertise from "@/components/portfolio/Expertise";
import GitHubActivity from "@/components/portfolio/GitHubActivity";
import ProcessRail from "@/components/portfolio/ProcessRail";
import Timeline from "@/components/portfolio/Timeline";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/portfolio/CustomCursor";

// The project viewport (and the markdown renderer plus galleries inside it) is
// the heaviest part of the page and sits below the fold, so it loads after the
// first screen has painted instead of holding it up.
const Projects = lazy(() => import("@/components/portfolio/Projects"));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink text-ghost">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Suspense fallback={<div className="min-h-[80vh]" aria-hidden="true" />}>
          <Projects />
        </Suspense>
        <Expertise />
        <GitHubActivity />
        <ProcessRail />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CustomCursor />
    </div>
  );
}