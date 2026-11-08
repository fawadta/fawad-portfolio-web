import { useEffect, useState } from "react";

// Types each phrase out, pauses, deletes it, then moves to the next one.
export default function RotatingRoles({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
    <span className="text-cyan">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-cyan" />
    </span>
  );
}