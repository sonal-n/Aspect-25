"use client";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  size?: [number, number];
};

function withAlpha(base: string, a: number) {
  const m = base.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return `rgba(255,255,255,${a})`;
  const [, r, g, b] = m;
  return `rgba(${r},${g},${b},${a})`;
}

export default function Particles({
  className = "",
  count = 90,
  color = "rgba(255,255,255,0.85)",
  speed = 0.45,
  size = [0.6, 2.0],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0,
      h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width * dpr));
      h = Math.max(1, Math.floor(r.height * dpr));
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: rnd(size[0], size[1]),
      t: Math.random() * Math.PI * 2,
      tw: rnd(0.4, 1.1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -8) s.x = w + 8;
        if (s.x > w + 8) s.x = -8;
        if (s.y < -8) s.y = h + 8;
        if (s.y > h + 8) s.y = -8;

        s.t += 0.01 * s.tw;
        const a = 0.55 + 0.45 * Math.sin(s.t);

        ctx.shadowBlur = s.r * 5;
        ctx.shadowColor = "rgba(255,255,255,0.85)";
        ctx.fillStyle = withAlpha(color, a);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(draw);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.fillStyle = withAlpha(color, 0.8);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      draw();
    }

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
      ro.disconnect();
    };
  }, [count, color, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 mix-blend-screen ${className}`}
      aria-hidden
    />
  );
}
