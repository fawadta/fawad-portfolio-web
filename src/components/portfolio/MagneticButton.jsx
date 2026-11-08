import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { stiffness: 260, damping: 20, mass: 0.4 };

export default function MagneticButton({ children, className = "", strength = 8 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - (rect.left + rect.width / 2)) / rect.width) * strength * 2);
    y.set(((event.clientY - (rect.top + rect.height / 2)) / rect.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}