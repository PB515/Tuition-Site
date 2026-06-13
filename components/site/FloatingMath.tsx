"use client";

import { useEffect, useRef } from "react";

// Decorative floating math glyphs. Ambient slow drift + cursor parallax + hover
// glow (teal <-> terracotta). Desktop only, aria-hidden, reduced-motion safe.
// Three presets: hero (rich focal set), band (content sections), header (short
// inner-page top band).

type Sym = { ch: string; pos: string; size: string; color: string; depth: number; dur: string; delay: string };

const SHIFT = 14; // max px the field leans with the cursor

// ---- HERO: the rich focal set on the homepage hero ----
const HERO_SYMBOLS: Sym[] = [
  { ch: "+", pos: "left-[3%] top-[20%]", size: "text-7xl", color: "text-primary/[0.13]", depth: 1.3, dur: "13s", delay: "0s" },
  { ch: "√", pos: "left-[9%] top-[52%]", size: "text-6xl", color: "text-accent/[0.12]", depth: 1.1, dur: "16s", delay: "0.3s" },
  { ch: "π", pos: "left-[4%] top-[83%]", size: "text-8xl", color: "text-primary/[0.13]", depth: 1.6, dur: "15s", delay: "1.4s" },
  { ch: "×", pos: "right-[7%] top-[12%]", size: "text-7xl", color: "text-accent/[0.13]", depth: 1.3, dur: "11s", delay: "0.7s" },
  { ch: "∑", pos: "right-[3%] top-[46%]", size: "text-8xl", color: "text-primary/[0.12]", depth: 1.6, dur: "14s", delay: "1.1s" },
  { ch: "∞", pos: "right-[10%] bottom-[8%]", size: "text-7xl", color: "text-accent/[0.12]", depth: 1.3, dur: "15s", delay: "0.2s" },
  { ch: "÷", pos: "left-[24%] top-[8%]", size: "text-5xl", color: "text-primary/[0.12]", depth: 0.7, dur: "14s", delay: "1.2s" },
  { ch: "∫", pos: "left-[44%] top-[16%]", size: "text-6xl", color: "text-accent/[0.12]", depth: 0.7, dur: "13s", delay: "0.6s" },
  { ch: "Δ", pos: "left-[40%] top-[84%]", size: "text-5xl", color: "text-accent/[0.12]", depth: 0.7, dur: "15s", delay: "1.9s" },
];

// ---- HEADER: short top band on inner pages (gutters, not clipped) ----
const HEADER_SYMBOLS: Sym[] = [
  { ch: "∑", pos: "left-[4%] top-[24%]", size: "text-6xl", color: "text-primary/[0.12]", depth: 1.2, dur: "13s", delay: "0s" },
  { ch: "π", pos: "left-[9%] top-[62%]", size: "text-5xl", color: "text-accent/[0.11]", depth: 1.1, dur: "15s", delay: "1.2s" },
  { ch: "∫", pos: "right-[5%] top-[20%]", size: "text-6xl", color: "text-primary/[0.11]", depth: 1.3, dur: "14s", delay: "0.6s" },
  { ch: "√", pos: "right-[9%] top-[62%]", size: "text-5xl", color: "text-accent/[0.12]", depth: 1.1, dur: "11s", delay: "0.3s" },
];

// ---- BAND: content sections. A big pool rotated per-section so nothing repeats
// within a section or in adjacent ones. Glyphs sit in the gutters (off the
// clipping edges) plus two small ones in the top/bottom padding strips. ----
const BAND_GLYPHS = ["+", "−", "×", "÷", "=", "π", "√", "∑", "∫", "∞", "θ", "Δ", "λ", "φ", "%", "≈", "±", "∂", "∇", "∠"];

// Ordered so taking the first N gives a balanced spread: N=2 → opposite corners,
// N=3 → +another gutter, N=4 → four corners, 5-6 → mids, 7-8 → inner padding.
// Each section passes the `count` that suits its own empty space.
type Slot = { pos: string; size: string; depth: number; dur: string; delay: string; warm?: boolean };
const BAND_SLOTS: Slot[] = [
  { pos: "left-[4%] top-[16%]", size: "text-7xl", depth: 1.3, dur: "13s", delay: "0s" },
  { pos: "right-[4%] top-[72%]", size: "text-7xl", depth: 1.3, dur: "11s", delay: "0.3s", warm: true },
  { pos: "right-[8%] top-[22%]", size: "text-6xl", depth: 1.2, dur: "14s", delay: "1.6s" },
  { pos: "left-[8%] top-[78%]", size: "text-8xl", depth: 1.6, dur: "15s", delay: "0.6s", warm: true },
  { pos: "left-[3%] top-[46%]", size: "text-6xl", depth: 1.1, dur: "16s", delay: "1.2s" },
  { pos: "right-[3%] top-[50%]", size: "text-8xl", depth: 1.5, dur: "14s", delay: "2.1s", warm: true },
  { pos: "left-[33%] top-[4%]", size: "text-4xl", depth: 0.6, dur: "12s", delay: "0.9s", warm: true },
  { pos: "right-[28%] bottom-[4%]", size: "text-4xl", depth: 0.6, dur: "15s", delay: "1.4s" },
];

function pickBand(offset: number, count: number): Sym[] {
  const g = BAND_GLYPHS.length;
  const n = Math.max(0, Math.min(count, BAND_SLOTS.length));
  return BAND_SLOTS.slice(0, n).map((slot, k) => ({
    ch: BAND_GLYPHS[(offset * 3 + k) % g],
    pos: slot.pos,
    size: slot.size,
    color: slot.warm ? "text-accent/[0.11]" : "text-primary/[0.11]",
    depth: slot.depth,
    dur: slot.dur,
    delay: slot.delay,
  }));
}

export default function FloatingMath({
  preset = "hero",
  offset = 0,
  count = 4,
}: {
  preset?: "hero" | "band" | "header";
  offset?: number;
  count?: number;
}) {
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

  const symbols =
    preset === "band" ? pickBand(offset, count) : preset === "header" ? HEADER_SYMBOLS : HERO_SYMBOLS;
  const showAt = preset === "hero" ? "lg:block" : "xl:block";

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 z-20 hidden overflow-hidden ${showAt}`}>
      {symbols.map((s, i) => (
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
