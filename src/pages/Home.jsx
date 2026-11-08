import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import ProofStrip from "@/components/portfolio/ProofStrip";
import Projects from "@/components/portfolio/Projects";
import Expertise from "@/components/portfolio/Expertise";
import GitHubActivity from "@/components/portfolio/GitHubActivity";
import ProcessRail from "@/components/portfolio/ProcessRail";
import Timeline from "@/components/portfolio/Timeline";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink text-ghost">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Projects />
        <Expertise />
        <GitHubActivity />
        <ProcessRail />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}