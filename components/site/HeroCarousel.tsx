"use client";

import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

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
  const n = slides.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4000);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className={`relative w-full overflow-hidden bg-primary-tint/40 ${frameClass} ${aspectClass}`}>
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
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
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
      )}
    </div>
  );
}
