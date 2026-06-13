// Decorative background layer of faint, slowly floating math glyphs. Sits behind
// content (aria-hidden, no pointer events), desktop only. Place inside a
// `relative overflow-hidden` parent, with the real content given `relative z-10`.
// Two vertical strips in the empty side gutters (left x: 1-9%, right x: 2-10%),
// spaced ~14-16% apart vertically so none sit side by side, and none reach the
// centred content / image card (which starts around 17% / ends around 83%).
const SYMBOLS: { ch: string; cls: string; dur: string; delay: string }[] = [
  // Left gutter
  { ch: "=", cls: "left-[9%] top-[6%] text-5xl text-primary/[0.12]", dur: "12s", delay: "2.4s" },
  { ch: "+", cls: "left-[2%] top-[22%] text-7xl text-primary/[0.13]", dur: "13s", delay: "0s" },
  { ch: "√", cls: "left-[8%] top-[39%] text-6xl text-accent/[0.12]", dur: "16s", delay: "0.3s" },
  { ch: "−", cls: "left-[1%] top-[55%] text-6xl text-primary/[0.12]", dur: "14s", delay: "1.8s" },
  { ch: "π", cls: "left-[9%] top-[72%] text-8xl text-primary/[0.13]", dur: "15s", delay: "1.4s" },
  { ch: "θ", cls: "left-[2%] top-[88%] text-6xl text-accent/[0.12]", dur: "13s", delay: "2.1s" },
  // Right gutter
  { ch: "×", cls: "right-[8%] top-[8%] text-7xl text-accent/[0.13]", dur: "11s", delay: "0.7s" },
  { ch: "∫", cls: "right-[2%] top-[23%] text-7xl text-primary/[0.13]", dur: "16s", delay: "0.9s" },
  { ch: "∑", cls: "right-[9%] top-[39%] text-8xl text-primary/[0.12]", dur: "14s", delay: "1.1s" },
  { ch: "%", cls: "right-[3%] top-[54%] text-5xl text-primary/[0.12]", dur: "12s", delay: "0.5s" },
  { ch: "Δ", cls: "right-[9%] top-[69%] text-6xl text-accent/[0.12]", dur: "13s", delay: "1.6s" },
  { ch: "÷", cls: "right-[2%] top-[83%] text-6xl text-primary/[0.12]", dur: "13s", delay: "2s" },
  { ch: "∞", cls: "right-[10%] bottom-[3%] text-7xl text-accent/[0.12]", dur: "15s", delay: "0.2s" },
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
