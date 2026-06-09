"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

// Shows an "Install app" button only when the browser offers installation
// (Android/desktop Chrome/Edge) and the app is not already installed.
// iPhone has no install prompt; the home callout explains the Share -> Add flow.
export default function InstallButton({
  className,
  label = "Install app",
}: {
  className?: string;
  label?: string;
}) {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setHidden(true);
      return;
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => setHidden(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (hidden || !deferred) return null;

  async function onClick() {
    if (!deferred) return;
    await deferred.prompt();
    setDeferred(null);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong transition-colors hover:bg-primary-tint"
      }
    >
      <Download size={16} strokeWidth={2} /> {label}
    </button>
  );
}
