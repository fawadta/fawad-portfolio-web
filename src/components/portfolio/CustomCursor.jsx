import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event) => setHovering(
      event.target instanceof Element && Boolean(event.target.closest(INTERACTIVE))
    );
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = hovering ? 24 : 8;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.span initial={false}
          animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="block -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </motion.div>
    </div>
  );
}