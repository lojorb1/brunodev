"use client";

import { useEffect, useRef } from "react";

/**
 * 3D particle globe + starfield rendered on a 2D canvas with perspective projection.
 * Rotates continuously, tilts toward the pointer and drifts on scroll.
 */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const cx = cv.getContext("2d")!;
    let w = 0, h = 0, raf = 0, R = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    type V = { x: number; y: number; z: number };
    let globe: V[] = [];
    let stars: (V & { s: number })[] = [];
    let rot = 0;

    const init = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * (w < 760 ? 0.42 : 0.36);
      // Fibonacci sphere – evenly distributed points
      const n = w < 760 ? 260 : 520;
      const ga = Math.PI * (3 - Math.sqrt(5));
      globe = Array.from({ length: n }, (_, i) => {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = ga * i;
        return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
      });
      stars = Array.from({ length: w < 760 ? 70 : 160 }, () => ({
        x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(), s: Math.random() * 1.2 + 0.3,
      }));
    };

    const project = (p: V, ax: number, ay: number) => {
      // rotate Y then X
      let x = p.x * Math.cos(ay) - p.z * Math.sin(ay);
      let z = p.x * Math.sin(ay) + p.z * Math.cos(ay);
      const y = p.y * Math.cos(ax) - z * Math.sin(ax);
      z = p.y * Math.sin(ax) + z * Math.cos(ax);
      const f = 2.6 / (2.6 + z);
      x = x * R * f; const yy = y * R * f;
      return { x, y: yy, z, f };
    };

    const draw = () => {
      cx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      rot += 0.0016;
      const sy = scrollY;

      // starfield (parallax depth)
      for (const s of stars) {
        s.z -= 0.0015; if (s.z <= 0.02) s.z = 1;
        const k = 0.6 / s.z;
        const x = w / 2 + s.x * w * 0.5 * k - mouse.x * 20 * (1 - s.z);
        const y = h / 2 + s.y * h * 0.5 * k - mouse.y * 20 * (1 - s.z) - (sy * 0.05 * (1 - s.z)) % h;
        if (x < 0 || x > w || y < 0 || y > h) continue;
        cx.fillStyle = `rgba(200,220,255,${(1 - s.z) * 0.8})`;
        cx.fillRect(x, y, s.s * (1.4 - s.z), s.s * (1.4 - s.z));
      }

      // globe position: right side on desktop, drifts up with scroll
      const gx = w < 960 ? w / 2 : w * 0.72;
      const gy = h * 0.5 - Math.min(sy * 0.25, h * 0.3);
      const ax = 0.35 + mouse.y * 0.35;
      const ay = rot + mouse.x * 0.6 + sy * 0.0008;
      const pts = globe.map((p) => project(p, ax, ay));

      // links between near points on the front hemisphere
      cx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i += 2) {
        const a = pts[i]; if (a.z > 0.2) continue;
        for (let j = i + 1; j < Math.min(i + 24, pts.length); j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < R * 0.16) {
            cx.strokeStyle = `rgba(124,77,255,${(1 - d / (R * 0.16)) * 0.28 * (1 - a.z) })`;
            cx.beginPath(); cx.moveTo(gx + a.x, gy + a.y); cx.lineTo(gx + b.x, gy + b.y); cx.stroke();
          }
        }
      }
      // points (depth shaded: front = cyan/bright, back = dim purple)
      for (const p of pts) {
        const front = (1 - p.z) / 2; // 0..1
        const r = 0.6 + front * 1.6;
        cx.fillStyle = front > 0.5 ? `rgba(0,229,255,${0.25 + front * 0.7})` : `rgba(124,77,255,${0.12 + front * 0.4})`;
        cx.beginPath(); cx.arc(gx + p.x, gy + p.y, r, 0, 6.283); cx.fill();
      }
      // glowing equator ring
      cx.save();
      cx.translate(gx, gy);
      cx.strokeStyle = "rgba(0,255,157,.18)";
      cx.lineWidth = 1;
      cx.beginPath();
      cx.ellipse(0, 0, R * 1.35, R * 1.35 * Math.abs(Math.sin(ax + 0.9)) * 0.45 + 6, -0.25 + mouse.x * 0.2, 0, 6.283);
      cx.stroke();
      cx.restore();

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      mouse.tx = e.clientX / w - 0.5;
      mouse.ty = e.clientY / h - 0.5;
    };
    init(); draw();
    addEventListener("resize", init);
    addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", init); removeEventListener("pointermove", move); };
  }, []);

  return (
    <>
      <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
      <div className="orb o1" aria-hidden="true" />
      <div className="orb o2" aria-hidden="true" />
      <div className="orb o3" aria-hidden="true" />
      <div className="grid-floor" aria-hidden="true"><div /></div>
      <div className="noise" aria-hidden="true" />
    </>
  );
}
