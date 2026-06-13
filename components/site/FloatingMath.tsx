// Decorative background layer of faint, slowly floating math glyphs. Sits behind
// content (aria-hidden, no pointer events), desktop only. Place inside a
// `relative overflow-hidden` parent, with the real content given `relative z-10`.
// Side gutters get ~5 glyphs each (left x: 1-9%, right x: 2-9%), spaced well
// apart. A few more fill the empty inner bands ABOVE the text and the gap before
// the image card (kept to x 22-43% / y in the clear top + bottom strips, never
// behind the headline or on the image).
const SYMBOLS: { ch: string; cls: string; dur: string; delay: string }[] = [
  // Left gutter (5)
  { ch: "=", cls: "left-[8%] top-[8%] text-5xl text-primary/[0.12]", dur: "12s", delay: "2.4s" },
  { ch: "+", cls: "left-[2%] top-[28%] text-7xl text-primary/[0.13]", dur: "13s", delay: "0s" },
  { ch: "√", cls: "left-[8%] top-[48%] text-6xl text-accent/[0.12]", dur: "16s", delay: "0.3s" },
  { ch: "π", cls: "left-[8%] top-[70%] text-8xl text-primary/[0.13]", dur: "15s", delay: "1.4s" },
  { ch: "θ", cls: "left-[2%] top-[88%] text-6xl text-accent/[0.12]", dur: "13s", delay: "2.1s" },
  // Right gutter (5)
  { ch: "×", cls: "right-[8%] top-[10%] text-7xl text-accent/[0.13]", dur: "11s", delay: "0.7s" },
  { ch: "∫", cls: "right-[2%] top-[30%] text-7xl text-primary/[0.13]", dur: "16s", delay: "0.9s" },
  { ch: "∑", cls: "right-[8%] top-[50%] text-8xl text-primary/[0.12]", dur: "14s", delay: "1.1s" },
  { ch: "%", cls: "right-[3%] top-[70%] text-5xl text-primary/[0.12]", dur: "12s", delay: "0.5s" },
  { ch: "∞", cls: "right-[9%] bottom-[4%] text-7xl text-accent/[0.12]", dur: "15s", delay: "0.2s" },
  // Inner bands (the circled spots: top strip + gap before the image)
  { ch: "÷", cls: "left-[22%] top-[9%] text-5xl text-primary/[0.11]", dur: "14s", delay: "1.2s" },
  { ch: "−", cls: "left-[43%] top-[15%] text-5xl text-accent/[0.11]", dur: "13s", delay: "0.6s" },
  { ch: "Δ", cls: "left-[39%] top-[83%] text-5xl text-accent/[0.11]", dur: "15s", delay: "1.9s" },
];

export default function FloatingMath() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={`animate-float-soft absolute select-none font-heading font-bold leading-none ${s.cls}`}
          style={{ animationDuration: s.dur, animationDelay: s.delay }}
        >
          {s.ch}
        </span>
      ))}
    </div>
  );
}
