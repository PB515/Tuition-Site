"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/site";

type Item = { q: string; a: string };

export default function Faq({ items = FAQS }: { items?: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface sm:px-6"
            >
              <span className="font-medium text-ink">{item.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong">
                {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
