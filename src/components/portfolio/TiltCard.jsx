import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const spring = { stiffness: 180, damping: 18, mass: 0.4 };
const ringMask =
  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";

export default function TiltCard({
  children,
  className = "",
  max = 6,
  glareOnHover = false,
  ...rest
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const glare = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, rgba(0,245,255,0.10), transparent 62%)`
  );

  const edgeLight = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(230px circle at ${x * 100}% ${y * 100}%, rgba(0,245,255,0.95), transparent 60%)`
  );

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => setHovered(true);

  const reset = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        backgroundImage: glareOnHover && !hovered ? undefined : glare,
      }}
      className={className}
      {...rest}
    >
      {children}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          backgroundImage: edgeLight,
          padding: 1,
          WebkitMask: ringMask,
          WebkitMaskComposite: "xor",
          mask: ringMask,
          maskComposite: "exclude",
        }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </motion.div>
  );
}