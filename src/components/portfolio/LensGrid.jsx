import { useEffect, useRef } from "react";

// A base grid plus a brighter, slightly different grid that only shows
// through a soft lens around the pointer — the offset suggests a bend.
export default function LensGrid() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 50;
    let y = 40;
    let targetX = x;
    let targetY = y;
    let frame = 0;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 100;
      targetY = ((event.clientY - rect.top) / rect.height) * 100;
    };

    const render = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.setProperty("--lens-x", `${x}%`);
      el.style.setProperty("--lens-y", `${y}%`);
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ "--lens-x": "50%", "--lens-y": "40%" }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="lens-grid absolute inset-0" />
    </div>
  );
}