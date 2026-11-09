import { useEffect, useRef } from "react";

const FONT_SIZE = 13;
const CELL_W = 11;
const ROW_H = 22;
const CYAN = "rgba(0,245,255,0.55)";
const AMBER = "rgba(255,179,71,0.9)";

export default function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let rows = 0;
    let cells = [];
    let paces = [];
    let frame = 0;
    let raf = 0;

    // Rows start spread across the width so the field is already raining on load.
    const randomStart = () => {
      const span = Math.max(1, Math.ceil(width / CELL_W));
      return Math.floor(Math.random() * span) - Math.floor(Math.random() * span * 0.6);
    };

    const draw = () => {
      // Gentle dissolve so each character leaves a fading trail behind the head.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r += 1) {
        if (frame % paces[r] !== 0) continue;

        const cell = cells[r];
        const x = cell * CELL_W;
        const y = r * ROW_H + ROW_H / 2;

        if (x >= -CELL_W && x <= width) {
          ctx.fillStyle = Math.random() < 0.12 ? AMBER : CYAN;
          ctx.fillText(Math.random() < 0.5 ? "0" : "1", x, y);
        }

        cells[r] = cell + 1;
        if (x > width + CELL_W && Math.random() > 0.9) cells[r] = randomStart();
      }

      frame += 1;
    };

    const loop = () => {
      draw();
      raf = window.requestAnimationFrame(loop);
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

      rows = Math.max(1, Math.ceil(height / ROW_H));
      cells = Array.from({ length: rows }, randomStart);
      // One cell every 5-9 frames: slow enough to read each 0 and 1.
      paces = Array.from({ length: rows }, () => 5 + Math.floor(Math.random() * 5));

      if (reduceMotion) {
        ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textBaseline = "middle";
        for (let r = 0; r < rows; r += 1) {
          for (let c = 0; c * CELL_W < width; c += 4) {
            ctx.fillStyle = "rgba(0,245,255,0.22)";
            ctx.fillText(Math.random() < 0.5 ? "0" : "1", c * CELL_W, r * ROW_H + ROW_H / 2);
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(canvas);

    if (!reduceMotion) raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}