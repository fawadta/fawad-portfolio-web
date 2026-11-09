import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "./CustomCursor";

// Shared chrome for the standalone pages (About, Contact) so they carry the
// same navigation, footer and cursor as the home page.
export default function PageShell({ title, description, children }) {
  useEffect(() => {
    const previousTitle = document.title;
    const tag = document.querySelector('meta[name="description"]');
    const previousDescription = tag?.getAttribute("content") ?? "";

    document.title = title;
    if (tag && description) tag.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (tag && description) tag.setAttribute("content", previousDescription);
    };
  }, [title, description]);

  return (
    <div className="relative min-h-screen bg-ink text-ghost">
      <Nav />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <CustomCursor />
    </div>
  );
}