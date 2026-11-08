import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const spring = { stiffness: 180, damping: 18, mass: 0.4 };

export default function TiltCard({ children, className = "", max = 6, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const glare = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, rgba(0,245,255,0.10), transparent 62%)`
  );

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, backgroundImage: glare }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}