import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BASE =
  "cursor-default rounded-md border border-border bg-ink/40 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-all duration-300";

const HOVER = {
  cyan: "hover:border-cyan/60 hover:text-cyan",
  amber: "hover:border-amber/60 hover:text-amber",
  ghost: "hover:border-ghost/40 hover:text-ghost",
};

const ACTIVE = {
  cyan: "border-cyan/60 bg-cyan/10 text-cyan",
  amber: "border-amber/60 bg-amber/10 text-amber",
  ghost: "border-ghost/45 bg-ghost/10 text-ghost",
};

// Highlights one tag at random every 1.7s so the matrix feels alive on touch
// screens, where there is no hover. Hovering the group pauses it.
export default function TagCloud({ items, accent = "cyan" }) {
  const [active, setActive] = useState(-1);
  const paused = useRef(false);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (paused.current) return;
      setActive((prev) => {
        let next = Math.floor(Math.random() * items.length);
        if (next === prev) next = (next + 1) % items.length;
        return next;
      });
    }, 1700);

    return () => clearInterval(id);
  }, [items.length]);

  return (
    <ul
      className="flex flex-wrap gap-1.5"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      {items.map((item, i) => (
        <li
          key={item}
          title={item}
          className={cn(BASE, HOVER[accent], i === active && ACTIVE[accent])}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}