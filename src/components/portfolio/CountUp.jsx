import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Splits "100K+" into 100 + "K+" so the number can count up.
const splitValue = (value) => {
  const match = String(value).match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: String(value) };
  return {
    prefix: match[1],
    number: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
};

export default function CountUp({ value, duration = 1300 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, number, suffix } = splitValue(value);
  const [display, setDisplay] = useState(number === null ? value : 0);

  useEffect(() => {
    if (!inView || number === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(number);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(number * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [inView, number, duration]);

  if (number === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}