"use client";

import { useEffect, useState } from "react";
import { Presentation, NotebookText } from "lucide-react";

// Board <-> Paper theme toggle. Flips the `dark` class on <html> (all tokens
// resolve through it), remembers the choice, and plays a left-to-right "board
// wipe" while the theme switches. Reduced-motion users just get an instant flip.
export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function apply(next: boolean) {
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  function toggle() {
    const next = !dark;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }
    // A panel of the incoming background sweeps across the screen; the theme
    // flips while it's covered, then the panel sweeps off, revealing the result.
    const ov = document.createElement("div");
    ov.style.cssText =
      "position:fixed;inset:0;z-index:9999;pointer-events:none;will-change:transform;background:" +
      (next ? "#0f1a17" : "#ffffff") +
      ";transform:translateX(-100%);transition:transform .38s cubic-bezier(0.16,1,0.3,1)";
    document.body.appendChild(ov);
    requestAnimationFrame(() => {
      ov.style.transform = "translateX(0)";
    });
    window.setTimeout(() => {
      apply(next);
      ov.style.transform = "translateX(100%)";
      window.setTimeout(() => ov.remove(), 420);
    }, 390);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to paper (light) mode" : "Switch to board (dark) mode"}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-primary hover:text-primary-strong"
      }
    >
      {dark ? (
        <NotebookText size={16} strokeWidth={1.75} />
      ) : (
        <Presentation size={16} strokeWidth={1.75} />
      )}
      <span>{dark ? "Paper" : "Board"}</span>
    </button>
  );
}
