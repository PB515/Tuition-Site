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

  function toggle() {
    const next = !dark;
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Brief colour cross-fade, then clean up so normal transitions resume.
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 360);
    }
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
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
