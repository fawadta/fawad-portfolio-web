import { useEffect, useState } from "react";

// Types each phrase out, pauses, deletes it, then moves to the next one.
export default function RotatingRoles({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] || "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = roles[index % roles.length];
    const finished = text === full;

    let delay = deleting ? 35 : 70;
    if (finished && !deleting) delay = 1800;
    if (deleting && text === "") delay = 250;

    const timer = setTimeout(() => {
      if (!deleting && finished) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
        return;
      }
      setText(deleting ? text.slice(0, -1) : full.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return (
    <span className="relative inline-block text-cyan">
      {text}
      <span
        aria-hidden="true"
        style={{ left: text ? "calc(100% - 0.55em)" : "0" }}
        className="pointer-events-none absolute bottom-[2px] h-[2px] w-[0.55em] animate-caret bg-cyan"
      />
    </span>
  );
}