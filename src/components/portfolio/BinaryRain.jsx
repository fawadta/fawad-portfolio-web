import { useEffect, useRef } from "react";

const FONT_SIZE = 14;
const COLUMN_STEP = FONT_SIZE * 1.6;

export default function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let speeds = [];
    let frame = 0;
    let visible = true;

    const draw = () => {
      // Fade what is already drawn, leaving a short trail behind each drop.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let c = 0; c < columns; c += 1) {
        const x = c * COLUMN_STEP;
        const y = drops[c] * FONT_SIZE;

        if (y > -FONT_SIZE && y < height) {
          ctx.fillStyle =
            Math.random() < 0.05
              ? "rgba(255,179,71,0.75)"
              : "rgba(0,245,255,0.55)";
          ctx.fillText(Math.random() < 0.5 ? "0" : "1", x, y);
        }

        drops[c] += speeds[c];
        if (y > height && Math.random() > 0.975) drops[c] = 0;
      }
    };

    const loop = () => {
      if (visible) draw();
      frame = window.requestAnimationFrame(loop);
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      columns = Math.max(1, Math.ceil(width / COLUMN_STEP));
      drops = Array.from({ length: columns }, () => Math.random() * (height / FONT_SIZE));
      speeds = Array.from({ length: columns }, () => 0.35 + Math.random() * 0.9);

      if (reduceMotion) {
        ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textBaseline = "top";
        for (let c = 0; c < columns; c += 1) {
          for (let r = 0; r < height / FONT_SIZE; r += 3) {
            ctx.fillStyle = "rgba(0,245,255,0.28)";
            ctx.fillText(Math.random() < 0.5 ? "0" : "1", c * COLUMN_STEP, r * FONT_SIZE);
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    if (!reduceMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    />
  );
}