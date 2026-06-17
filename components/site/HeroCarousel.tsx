"use client";

import { useState, useEffect, useRef } from "react";
import { ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { url: string | null; label: string; src: string };

export default function HeroCarousel({
  slides,
  aspectClass = "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
  frameClass = "rounded-2xl border border-border",
}: {
  slides: Slide[];
  aspectClass?: string;
  frameClass?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (n <= 1 || paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4000);
    return () => clearInterval(t);
  }, [n, paused]);

  const go = (dir: number) => setI((p) => (p + dir + n) % n);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null || n <= 1) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // swipe left = next
    touchX.current = null;
  }

  const arrowClass =
    "absolute bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/85 text-ink shadow-md ring-1 ring-border backdrop-blur transition-all hover:bg-bg hover:scale-110";

  return (
    <div
      className={`group relative w-full overflow-hidden bg-primary-tint/40 ${frameClass} ${aspectClass}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          {s.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.url} alt={s.label} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <ImageIcon size={28} strokeWidth={1.5} className="text-primary" />
              <p className="text-sm font-medium text-primary-strong">{s.label}</p>
              <p className="text-[10px] text-ink-muted">{s.src}</p>
            </div>
          )}
        </div>
      ))}

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className={`${arrowClass} left-3`}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className={`${arrowClass} right-3`}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${idx === i ? "bg-primary-strong" : "bg-bg/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
