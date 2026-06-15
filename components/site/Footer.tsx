"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { SITE, NAV, AREAS, WA_ENQUIRY, BRANCHES } from "@/lib/site";

export default function Footer({ logoUrl = null }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/parent")) return null;
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          {logoUrl ? (
            <Link
              href="/"
              aria-label={SITE.name}
              className="inline-flex w-fit items-center rounded-xl dark:bg-[#f4f1ea] dark:px-3 dark:py-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt={SITE.name} className="h-16 w-auto sm:h-20" />
            </Link>
          ) : (
            <p className="font-heading text-lg font-bold text-ink">{SITE.name}</p>
          )}
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            Focused Math coaching in Vadodara, led by {SITE.teacher} with {SITE.yearsExperience} years
            of teaching since {SITE.since}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={WA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-deep"
            >
              <WhatsappIcon size={16} strokeWidth={2} /> WhatsApp Enquiry
            </a>
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong transition-all hover:-translate-y-0.5 hover:bg-primary-tint"
            >
              <Phone size={16} strokeWidth={2} /> Call
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Pages</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-muted hover:text-primary-strong">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-sm text-ink-muted hover:text-primary-strong">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Visit us</p>
          <div className="mt-4 space-y-3">
            {BRANCHES.map((br) => (
              <a
                key={br.name}
                href={br.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-ink-muted hover:text-primary-strong"
              >
                <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="font-medium text-ink">
                    {br.name}
                    {br.main ? " · main" : ""}
                  </span>
                  <span className="block">{br.address}</span>
                </span>
              </a>
            ))}
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 flex items-center gap-2 text-sm text-ink-muted hover:text-primary-strong"
          >
            <Mail size={18} strokeWidth={1.75} className="shrink-0 text-primary" />
            {SITE.email}
          </a>
          <p className="mt-4 text-sm font-semibold text-ink">Areas we teach</p>
          <p className="mt-2 text-sm text-ink-muted">{AREAS.join(", ")}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{SITE.name}, Alkapuri &amp; Sama, Vadodara.</p>
          <p>Offline Math coaching for Class 9 to 12, Regular and Applied.</p>
          <Link href="/admin/login" className="hover:text-primary-strong">
            Staff login
          </Link>
        </div>
      </div>
    </footer>
  );
}
