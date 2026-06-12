"use client";

import { useState } from "react";
import { MessageCircle, Phone, RotateCcw, Check, ArrowLeft } from "lucide-react";
import { GAP_CLASSES, RATINGS, type Rating } from "@/lib/gap-test-config";
import { waLink, SITE } from "@/lib/site";

export default function GapTest() {
  const [classId, setClassId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [showResult, setShowResult] = useState(false);

  const current = GAP_CLASSES.find((c) => c.id === classId);

  function reset() {
    setClassId(null);
    setRatings({});
    setShowResult(false);
  }

  // STEP 1: pick class (the segment router)
  if (!current) {
    return (
      <div>
        <p className="text-sm font-semibold text-ink">Step 1. Choose your class</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {GAP_CLASSES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setClassId(c.id)}
              className="rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary-strong"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const weak = current.chapters.filter((ch) => ratings[ch] === "practice" || ratings[ch] === "weak");
  const strong = current.chapters.filter((ch) => ratings[ch] === "good");
  const answered = weak.length + strong.length;

  // STEP 3: result
  if (showResult) {
    const weakList = weak.length ? weak.join(", ") : "general revision";
    const msg = `Hi Inspire Academy, I took the Math Concept-Gap Test for ${current.label}. Chapters I want to work on: ${weakList}. Please guide me on the right batch.`;
    return (
      <div>
        <p className="text-sm font-semibold text-primary-strong">{current.label} result</p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-ink">
          {weak.length
            ? "Here are the chapters to work on"
            : "You rated yourself confident across the board"}
        </h3>

        {weak.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Chapters to work on</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {weak.map((ch) => (
                <span
                  key={ch}
                  className="rounded-lg bg-primary-tint px-3 py-1.5 text-sm font-medium text-primary-strong"
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        )}

        {strong.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Already strong</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {strong.map((ch) => (
                <span
                  key={ch}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink-muted"
                >
                  <Check size={14} strokeWidth={2.5} className="text-primary" /> {ch}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-7 max-w-xl text-sm leading-relaxed text-ink-muted">
          Send this to Snehal Sir and he will plan a batch that targets exactly these chapters.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            <MessageCircle size={18} strokeWidth={2} /> WhatsApp Sir these chapters
          </a>
          <a
            href={`tel:${SITE.tel}`}
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            <Phone size={18} strokeWidth={2} /> Call Sir
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-muted hover:text-ink"
          >
            <RotateCcw size={16} strokeWidth={2} /> Start over
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: rate chapters
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-ink">
          Step 2. How confident are you, {current.label}?
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={2} /> Change class
        </button>
      </div>

      <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {current.chapters.map((ch) => (
          <div
            key={ch}
            className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
          >
            <span className="font-medium text-ink">{ch}</span>
            <div className="flex flex-wrap gap-2">
              {RATINGS.map((opt) => {
                const selected = ratings[ch] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRatings((r) => ({ ...r, [ch]: opt.value }))}
                    className={
                      selected
                        ? "rounded-lg bg-primary-strong px-3 py-1.5 text-sm font-semibold text-white"
                        : "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary-strong"
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          disabled={answered === 0}
          onClick={() => setShowResult(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          See my result
        </button>
        <span className="text-sm text-ink-muted">
          {answered} of {current.chapters.length} rated
        </span>
      </div>
    </div>
  );
}
