"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

// Always available on mobile. If the browser offers a native install prompt
// (Android Chrome/Edge), use it; otherwise (iPhone, and browsers that don't
// fire the event) show clear "Add to Home Screen" instructions.
export default function InstallButton({
  className,
  label = "Install app",
}: {
  className?: string;
  label?: string;
}) {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }
    const ua = navigator.userAgent;
    setIsMobile(/android|iphone|ipad|ipod/i.test(ua));
    setIsIOS(/iphone|ipad|ipod/i.test(ua));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;
  // Desktop without a native prompt: nothing to install here.
  if (!deferred && !isMobile) return null;

  async function onClick() {
    if (deferred) {
      await deferred.prompt();
      setDeferred(null);
      return;
    }
    setHint(true);
  }

  return (
    <>
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

      {hint && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setHint(false)} />
          <div className="relative m-3 w-full max-w-sm rounded-2xl border border-border bg-bg p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="font-heading text-base font-bold text-ink">Install the app</p>
              <button type="button" onClick={() => setHint(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-muted">
              {isIOS ? (
                <>
                  <li>Tap the Share icon at the bottom of Safari.</li>
                  <li>Choose &quot;Add to Home Screen&quot;.</li>
                  <li>Tap Add. The app icon appears on your home screen.</li>
                </>
              ) : (
                <>
                  <li>Open your browser menu (the three dots).</li>
                  <li>Tap &quot;Add to Home screen&quot; or &quot;Install app&quot;.</li>
                  <li>Confirm. The app icon appears on your home screen.</li>
                </>
              )}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
