"use client";

import { useEffect, useRef } from "react";

// Decorative floating math glyphs behind the hero. Three things going on:
//  - ambient slow drift (CSS .animate-float-soft on the middle wrapper)
//  - cursor parallax for the whole field (this component reads the global mouse
//    and the outer wrapper translates by a per-symbol "depth"; no pointer events
//    on symbols, so it can never block content)
//  - hover glow + warm colour swap on the gutter symbols only (.glyph-i)
// Desktop only, aria-hidden, and parallax is skipped under reduced-motion.

type Sym = {
  ch: string;
  pos: string;
  size: string;
  color: string;
  depth: number;
  dur: string;
  delay: string;
};

const SHIFT = 14; // max px the field leans with the cursor

// 3 per gutter (asymmetric rhythm between sides) + 3 in the inner empty bands.
// All hover-interactive. Keep every glyph in clear space (gutters + top/bottom
// bands) so a hover target never sits over text, buttons or the image.
const SYMBOLS: Sym[] = [
  // Left gutter
  { ch: "+", pos: "left-[3%] top-[20%]", size: "text-7xl", color: "text-primary/[0.13]", depth: 1.3, dur: "13s", delay: "0s" },
  { ch: "√", pos: "left-[9%] top-[52%]", size: "text-6xl", color: "text-accent/[0.12]", depth: 1.1, dur: "16s", delay: "0.3s" },
  { ch: "π", pos: "left-[4%] top-[83%]", size: "text-8xl", color: "text-primary/[0.13]", depth: 1.6, dur: "15s", delay: "1.4s" },
  // Right gutter (different vertical rhythm)
  { ch: "×", pos: "right-[7%] top-[12%]", size: "text-7xl", color: "text-accent/[0.13]", depth: 1.3, dur: "11s", delay: "0.7s" },
  { ch: "∑", pos: "right-[3%] top-[46%]", size: "text-8xl", color: "text-primary/[0.12]", depth: 1.6, dur: "14s", delay: "1.1s" },
  { ch: "∞", pos: "right-[10%] bottom-[8%]", size: "text-7xl", color: "text-accent/[0.12]", depth: 1.3, dur: "15s", delay: "0.2s" },
  // Inner empty bands
  { ch: "÷", pos: "left-[24%] top-[8%]", size: "text-5xl", color: "text-primary/[0.12]", depth: 0.7, dur: "14s", delay: "1.2s" },
  { ch: "−", pos: "left-[44%] top-[16%]", size: "text-6xl", color: "text-accent/[0.12]", depth: 0.7, dur: "13s", delay: "0.6s" },
  { ch: "Δ", pos: "left-[40%] top-[84%]", size: "text-5xl", color: "text-accent/[0.12]", depth: 0.7, dur: "15s", delay: "1.9s" },
];

export default function FloatingMath() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      const mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tx = Math.max(-1, Math.min(1, mx)) * -SHIFT;
      ty = Math.max(-1, Math.min(1, my)) * -SHIFT;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", `${tx.toFixed(1)}px`);
      el.style.setProperty("--py", `${ty.toFixed(1)}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden lg:block">
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.pos} transition-transform duration-500 ease-out`}
          style={{ transform: `translate(calc(var(--px, 0px) * ${s.depth}), calc(var(--py, 0px) * ${s.depth}))` }}
        >
          <span
            className="animate-float-soft block leading-none"
            style={{ animationDuration: s.dur, animationDelay: s.delay }}
          >
            <span
              className={`glyph-i pointer-events-auto block select-none font-heading font-bold ${s.size} ${s.color} ${
                s.color.includes("accent") ? "glyph-warm" : "glyph-teal"
              }`}
            >
              {s.ch}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
