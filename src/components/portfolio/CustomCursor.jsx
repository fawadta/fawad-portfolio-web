import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='hover']";
const follow = { stiffness: 380, damping: 32, mass: 0.4 };

// Reads the rendered background so solid cyan fills are caught even when the
// fill comes from a hover class, a gradient or a child element.
const isSolidCyan = (element) => {
  let node = element;
  for (let depth = 0; node && depth < 3; depth += 1, node = node.parentElement) {
    const raw = window.getComputedStyle(node).backgroundColor;
    const match = raw.match(/rgba?\(([^)]+)\)/);
    if (!match) continue;
    const [r, g, b, a = 1] = match[1].split(",").map(Number);
    if (a > 0.5 && r < 120 && (g + b) / 2 > 140) return true;
  }
  return false;
};

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
  const checkTimer = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    setEnabled(true);
    const root = document.documentElement;

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      root.classList.add("hide-native-cursor");
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

      // Over a solid cyan surface a cyan ring vanishes, so it flips to amber.
      // Re-checked once the hover transition lands, which is when fills appear.
      const applyAccent = () => setOnAccent(isSolidCyan(hit));
      applyAccent();
      if (checkTimer.current) clearTimeout(checkTimer.current);
      checkTimer.current = setTimeout(() => {
        if (hit.isConnected && hit.matches(":hover")) applyAccent();
      }, 280);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => {
      setVisible(false);
      setPressed(false);
      root.classList.remove("hide-native-cursor");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeaveWindow);
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      if (checkTimer.current) clearTimeout(checkTimer.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeaveWindow);
      document.removeEventListener("mouseleave", onLeaveWindow);
      root.classList.remove("hide-native-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = pressed ? 20 : hovering ? 42 : 26;
  const color = onAccent ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.7)";

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
            className="grid place-items-center rounded-full border transition-all duration-200 ease-out"
            style={{
              width: size,
              height: size,
              borderColor: color,
              boxShadow: hovering ? `0 0 14px -3px ${color}` : "none",
            }}
          >
            <span className="cursor-ring-core block h-1 w-1 rounded-full" />
          </span>
        </div>
      </motion.div>
    </div>
  );
}