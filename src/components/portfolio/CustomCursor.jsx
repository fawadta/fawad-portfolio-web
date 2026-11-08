import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";
const ringSpring = { stiffness: 380, damping: 32, mass: 0.4 };

function TrailDot({ x, y, stiffness, damping, size, opacity, visible }) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.5 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.5 });
  return (
    <motion.div style={{ x: sx, y: sy }} className="absolute left-0 top-0">
      <div
        className="rounded-full bg-cyan"
        style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, opacity: visible ? opacity : 0 }}
      />
    </motion.div>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [onAccent, setOnAccent] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

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
        setLabel("");
        setOnAccent(false);
        setHovering(false);
        return;
      }
      setHovering(true);
      // Labels are opt-in only: they show where an element sets data-cursor-label.
      setLabel(hit.getAttribute("data-cursor-label") || "");
      // A solid cyan surface swallows a cyan cursor — flip it to amber there.
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

  const ringScale = pressed ? 0.85 : label ? 1.7 : hovering ? 1.35 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {visible && (
        <>
          <TrailDot x={x} y={y} stiffness={280} damping={30} size={4} opacity={0.35} visible={visible} />
          <TrailDot x={x} y={y} stiffness={190} damping={26} size={3} opacity={0.22} visible={visible} />
          <TrailDot x={x} y={y} stiffness={120} damping={22} size={2} opacity={0.14} visible={visible} />
        </>
      )}

      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: ringScale, opacity: visible ? (label ? 1 : 0.7) : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={`-ml-3.5 -mt-3.5 h-7 w-7 rounded-full border ${
            onAccent ? "border-amber/80 bg-amber/10" : "border-cyan/70 bg-cyan/5"
          }`}
        />
        <motion.div
          animate={{ opacity: visible && label ? 1 : 0, x: label ? 0 : -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={`absolute left-5 top-2 whitespace-nowrap rounded-sm border bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
            onAccent ? "border-amber/40 text-amber" : "border-cyan/25 text-cyan"
          }`}
        >
          {label}
        </motion.div>
      </motion.div>

      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div
          className={`-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full transition-opacity duration-200 ${
            onAccent ? "bg-amber" : "bg-cyan"
          }`}
          style={{ opacity: visible ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
}