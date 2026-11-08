import { useEffect, useRef } from "react";

const LINK_DIST = 128;
const CURSOR_DIST = 190;
const NODE_RGB = "148,163,184";
const ACCENT_RGB = "0,245,255";

export default function NodeField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, active: false };

    const seed = () => {
      const count = Math.max(24, Math.min(84, Math.round((width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const draw = (still = false) => {
      ctx.clearRect(0, 0, width, height);

      if (!still) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DIST) continue;
          ctx.strokeStyle = `rgba(${NODE_RGB},${0.16 * (1 - d / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d >= CURSOR_DIST) continue;
          const t = 1 - d / CURSOR_DIST;
          ctx.strokeStyle = `rgba(${ACCENT_RGB},${0.5 * t})`;
          ctx.lineWidth = 1 + t;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const dm = mouse.active ? Math.hypot(n.x - mouse.x, n.y - mouse.y) : Infinity;
        const near = dm < CURSOR_DIST ? 1 - dm / CURSOR_DIST : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3 + near * 1.1, 0, Math.PI * 2);
        ctx.fillStyle =
          near > 0
            ? `rgba(${ACCENT_RGB},${0.35 + near * 0.55})`
            : `rgba(${NODE_RGB},0.45)`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      frame = window.requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(true);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    if (pointerFine) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
    }

    if (!reduceMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}