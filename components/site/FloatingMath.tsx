// Decorative background layer of faint, slowly floating math glyphs. Sits behind
// content (aria-hidden, no pointer events), desktop only. Place inside a
// `relative overflow-hidden` parent, with the real content given `relative z-10`.
const SYMBOLS: { ch: string; cls: string; dur: string; delay: string }[] = [
  { ch: "+", cls: "left-[3%] top-[16%] text-7xl text-primary/[0.16]", dur: "12s", delay: "0s" },
  { ch: "π", cls: "left-[7%] bottom-[14%] text-8xl text-primary/[0.18]", dur: "15s", delay: "1.4s" },
  { ch: "×", cls: "right-[5%] top-[14%] text-7xl text-accent/[0.18]", dur: "11s", delay: "0.7s" },
  { ch: "÷", cls: "right-[8%] bottom-[22%] text-6xl text-primary/[0.16]", dur: "13s", delay: "2s" },
  { ch: "√", cls: "left-[1%] top-[52%] text-6xl text-accent/[0.16]", dur: "16s", delay: "0.3s" },
  { ch: "∑", cls: "right-[2%] top-[46%] text-8xl text-primary/[0.16]", dur: "14s", delay: "1.1s" },
  { ch: "=", cls: "left-[13%] top-[5%] text-5xl text-primary/[0.15]", dur: "12s", delay: "2.4s" },
  { ch: "∞", cls: "right-[14%] bottom-[6%] text-7xl text-accent/[0.16]", dur: "15s", delay: "0.2s" },
  { ch: "−", cls: "left-[10%] top-[36%] text-6xl text-primary/[0.15]", dur: "13s", delay: "1.8s" },
  { ch: "∫", cls: "right-[11%] top-[28%] text-7xl text-primary/[0.16]", dur: "16s", delay: "0.9s" },
  { ch: "θ", cls: "left-[5%] top-[78%] text-6xl text-accent/[0.15]", dur: "14s", delay: "2.1s" },
  { ch: "%", cls: "right-[6%] bottom-[44%] text-5xl text-primary/[0.15]", dur: "12s", delay: "0.5s" },
  { ch: "√x", cls: "left-[16%] bottom-[30%] text-4xl text-primary/[0.13]", dur: "15s", delay: "1.2s" },
  { ch: "Δ", cls: "right-[17%] top-[64%] text-6xl text-accent/[0.15]", dur: "13s", delay: "1.6s" },
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
