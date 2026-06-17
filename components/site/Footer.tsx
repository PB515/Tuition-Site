"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { SITE, NAV, AREAS, WA_ENQUIRY, BRANCHES, SOCIAL } from "@/lib/site";

const SOCIAL_ICONS: Record<string, (p: { size?: number }) => React.ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
};

export default function Footer({
  logoUrl = null,
  logoDarkUrl = null,
}: {
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/parent")) return null;
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          {logoUrl ? (
            <Link href="/" aria-label={SITE.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={SITE.name}
                className={`h-16 w-auto sm:h-20 ${logoDarkUrl ? "dark:hidden" : ""}`}
              />
              {logoDarkUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoDarkUrl}
                  alt={SITE.name}
                  className="hidden h-16 w-auto dark:block sm:h-20"
                />
              )}
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
              <Phone size={16} strokeWidth={2} /> Call us
            </a>
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-ink">Follow us</p>
            <div className="mt-3 flex items-center gap-3">
              {SOCIAL.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary-strong"
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </div>
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
            <li>
              <Link href="/site-map" className="text-sm text-ink-muted hover:text-primary-strong">
                Site map
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
