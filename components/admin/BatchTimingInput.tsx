"use client";

import { useState } from "react";

const inputCls =
  "min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const btnCls =
  "shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary-strong";

// Timing input with quick AM / PM buttons that set the period on the current value.
export default function BatchTimingInput() {
  const [value, setValue] = useState("");

  function setPeriod(p: "AM" | "PM") {
    setValue((v) => {
      const base = v.replace(/\s*(AM|PM)\s*$/i, "").trim();
      return base ? `${base} ${p}` : p;
    });
  }

  return (
    <div className="mt-1 flex gap-2">
      <input
        name="timing"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 6-7:30"
        className={inputCls}
      />
      <button type="button" onClick={() => setPeriod("AM")} className={btnCls}>
        AM
      </button>
      <button type="button" onClick={() => setPeriod("PM")} className={btnCls}>
        PM
      </button>
    </div>
  );
}
