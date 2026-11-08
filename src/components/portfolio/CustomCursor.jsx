import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";
const follow = { stiffness: 900, damping: 55, mass: 0.35 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [onAccent, setOnAccent] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, follow);
  const cy = useSpring(y, follow);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("hide-native-cursor");

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event) => {
      const target = event.target;
      const hit = target instanceof Element ? target.closest(INTERACTIVE) : null;
      if (!hit) {
        setHovering(false);
        setOnAccent(false);
        return;
      }
      setHovering(true);
      // A solid cyan surface swallows a cyan reticle — flip it to amber there.
      setOnAccent(Boolean(hit.closest(".bg-cyan")) || /(^|\s)bg-cyan(\s|$)/.test(hit.className || ""));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      root.classList.remove("hide-native-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  // Reticle tightens on click, opens up over something interactive.
  const arm = pressed ? 5 : hovering ? 12 : 9;
  const gap = pressed ? 4 : hovering ? 8 : 6;
  const color = onAccent ? "#FFB347" : "rgba(0, 245, 255, 0.85)";
  const arms = [
    { key: "top", style: { left: -0.5, width: 1, height: arm, top: -(gap + arm) } },
    { key: "bottom", style: { left: -0.5, width: 1, height: arm, top: gap } },
    { key: "left", style: { top: -0.5, height: 1, width: arm, left: -(gap + arm) } },
    { key: "right", style: { top: -0.5, height: 1, width: arm, left: gap } },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x: cx, y: cy }} className="absolute left-0 top-0">
        <div
          className="absolute left-0 top-0 transition-opacity duration-150"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {arms.map((armPart) => (
            <span
              key={armPart.key}
              className="absolute transition-all duration-150 ease-out"
              style={{ background: color, ...armPart.style }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}