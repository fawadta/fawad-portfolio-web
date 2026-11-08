import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";
const follow = { stiffness: 260, damping: 24, mass: 0.4 };

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
      // Over a solid cyan surface a cyan ring vanishes — flip it to amber.
      setOnAccent(
        Boolean(hit.closest(".bg-cyan")) || /(^|\s)bg-cyan(\s|$)/.test(hit.className || "")
      );
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
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = pressed ? 18 : hovering ? 40 : 24;
  const color = onAccent ? "#FFB347" : "rgba(0, 245, 255, 0.7)";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <span
          className="block h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150"
          style={{ backgroundColor: color, opacity: visible ? 1 : 0 }}
        />
      </motion.div>

      <motion.div style={{ x: cx, y: cy }} className="absolute left-0 top-0">
        <div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center transition-opacity duration-150"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <span
            className="block rounded-full border transition-all duration-200 ease-out"
            style={{
              width: size,
              height: size,
              borderColor: color,
              boxShadow: hovering ? `0 0 14px -3px ${color}` : "none",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}