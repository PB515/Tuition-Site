import { MapPin, Phone, MessageCircle } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import CtaButton from "@/components/site/CtaButton";
import { SITE, AREAS, WA_ENQUIRY, MAPS_EMBED, MAPS_LINK } from "@/lib/site";

export const metadata = { title: "Contact" };

const STEPS = [
  "Call or message us on WhatsApp.",
  "We ask your class, board and school, and what you need in maths.",
  "We explain the right batch, timings and fees.",
  "You visit the academy and confirm admission.",
];

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Contact Inspire Academy"
        subtitle="Offline maths coaching in New Sama Road, Vadodara. Reach Snehal Soni Sir directly."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-base text-ink-muted hover:text-primary-strong"
            >
              <MapPin size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
              {SITE.address}
            </a>

            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href={WA_ENQUIRY} external>
                <MessageCircle size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
              <CtaButton href={`tel:${SITE.tel}`} variant="secondary" external>
                <Phone size={18} strokeWidth={2} /> {SITE.phoneDisplay}
              </CtaButton>
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-xl font-bold text-ink">How admission works</h2>
              <ol className="mt-5 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-strong text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-muted">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-xl font-bold text-ink">Areas we teach</h2>
              <p className="mt-3 text-sm text-ink-muted">{AREAS.join(", ")}.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map to ${SITE.name}`}
              src={MAPS_EMBED}
              className="h-80 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
