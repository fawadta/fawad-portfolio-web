import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";
const ringSpring = { stiffness: 380, damping: 32, mass: 0.4 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
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
      const next =
        target instanceof Element ? Boolean(target.closest(INTERACTIVE)) : false;
      setHovering(next);
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

  const ringScale = pressed ? 0.85 : hovering ? 1.9 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: ringScale, opacity: visible ? (hovering ? 1 : 0.7) : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="-ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-cyan/70 bg-cyan/5"
        />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
}