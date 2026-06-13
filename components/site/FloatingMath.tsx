// Decorative background layer of faint, slowly floating math glyphs. Sits behind
// content (aria-hidden, no pointer events), desktop only. Place inside a
// `relative overflow-hidden` parent, with the real content given `relative z-10`.
const SYMBOLS: { ch: string; cls: string; dur: string; delay: string }[] = [
  { ch: "+", cls: "left-[3%] top-[16%] text-7xl text-primary/[0.07]", dur: "12s", delay: "0s" },
  { ch: "π", cls: "left-[7%] bottom-[14%] text-8xl text-primary/[0.08]", dur: "15s", delay: "1.4s" },
  { ch: "×", cls: "right-[5%] top-[14%] text-7xl text-accent/[0.08]", dur: "11s", delay: "0.7s" },
  { ch: "÷", cls: "right-[8%] bottom-[22%] text-6xl text-primary/[0.07]", dur: "13s", delay: "2s" },
  { ch: "√", cls: "left-[1%] top-[52%] text-6xl text-accent/[0.07]", dur: "16s", delay: "0.3s" },
  { ch: "∑", cls: "right-[2%] top-[46%] text-8xl text-primary/[0.07]", dur: "14s", delay: "1.1s" },
  { ch: "=", cls: "left-[13%] top-[4%] text-5xl text-primary/[0.06]", dur: "12s", delay: "2.4s" },
  { ch: "∞", cls: "right-[14%] bottom-[6%] text-7xl text-accent/[0.07]", dur: "15s", delay: "0.2s" },
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
