import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE, NAV, AREAS, WA_ENQUIRY, MAPS_LINK } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold text-ink">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            Focused Maths coaching in Vadodara, led by {SITE.teacher} with {SITE.yearsExperience} years
            of teaching since {SITE.since}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={WA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
            >
              <MessageCircle size={16} strokeWidth={2} /> WhatsApp Enquiry
            </a>
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
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
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-start gap-2 text-sm text-ink-muted hover:text-primary-strong"
          >
            <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
            {SITE.address}
          </a>
          <p className="mt-4 text-sm font-semibold text-ink">Areas we teach</p>
          <p className="mt-2 text-sm text-ink-muted">{AREAS.join(", ")}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{SITE.name}, New Sama Road, Vadodara.</p>
          <p>Offline Maths coaching for Class 9 to 12, Applied, JEE and GUJCET.</p>
        </div>
      </div>
    </footer>
  );
}
