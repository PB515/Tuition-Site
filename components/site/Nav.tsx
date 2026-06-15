"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FunctionSquare } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import InstallButton from "@/components/InstallButton";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, WA_ENQUIRY, SITE } from "@/lib/site";

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
        <FunctionSquare size={20} strokeWidth={1.75} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-bold text-ink">Inspire Academy</span>
        <span className="text-[11px] font-medium text-ink-muted">of Mathematics, Vadodara</span>
      </span>
    </span>
  );
}

export default function Nav({ logoUrl = null }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The admin and parent areas have their own chrome; hide the public nav there.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/parent")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={SITE.name} className="h-8 w-auto sm:h-10" />
          ) : (
            <Wordmark />
          )}
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/parent/login"
            className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-primary hover:text-primary-strong"
          >
            Parent login
          </Link>
          <ThemeToggle />
          <InstallButton />
          <a
            href={WA_ENQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-deep"
          >
            <WhatsappIcon size={16} strokeWidth={2} />
            WhatsApp Enquiry
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/parent/login"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink-muted"
            >
              Parent login
            </Link>
            <ThemeToggle className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink-muted" />
            <InstallButton
              label="Install app"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary-strong"
            />
            <a
              href={WA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary-strong px-5 py-3 text-sm font-semibold text-white"
            >
              <WhatsappIcon size={18} strokeWidth={2} />
              WhatsApp {SITE.teacher.split(" ")[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
