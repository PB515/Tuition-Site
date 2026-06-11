"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Slide = { src: string; exists: boolean; label: string };

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4000);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-primary-tint/40 sm:aspect-[5/4] lg:aspect-[4/5]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          {s.exists ? (
            <Image
              src={s.src}
              alt={s.label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={idx === 0}
            />
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
