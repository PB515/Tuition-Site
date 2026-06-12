import { MapPin, Phone, Mail, Check } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import PageHeader from "@/components/site/PageHeader";
import SmartImage from "@/components/site/SmartImage";
import CtaButton from "@/components/site/CtaButton";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE, AREAS, WA_ENQUIRY, MAPS_EMBED, BRANCHES } from "@/lib/site";

export const metadata = { title: "Contact" };

const STEPS = [
  "Call or message us on WhatsApp, or send the form.",
  "We ask your class, board and school, and what you need in math.",
  "We explain the right batch, timings and fees.",
  "You visit the academy and confirm admission.",
];

const GOOD_TO_KNOW = [
  "Classes 9 to 12, Regular and Applied Math",
  "Maximum 20 students per batch",
  "Weekly tests with mistake analysis",
  "NCERT-based, covering CBSE and GSEB",
];

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Contact Inspire Academy"
        subtitle="Offline math coaching in Vadodara, at our Alkapuri and Sama branches. Reach Snehal Sir directly."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Send an enquiry
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Share a few details and we will get back to you. Prefer to talk now? Use WhatsApp or
              call.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Two branches. One standard of teaching.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Inspire Academy has two locations in Vadodara, Alkapuri and Sama (New Sama Road).
              Whichever branch your child attends, the teaching, the batch size and the personal
              attention stay exactly the same.
            </p>
            <div className="mt-5 space-y-4">
              {BRANCHES.map((br) => (
                <a
                  key={br.name}
                  href={br.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-bg p-4 text-base text-ink-muted transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <MapPin
                    size={22}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110"
                  />
                  <span>
                    <span className="font-semibold text-ink">
                      {br.name}
                      {br.main ? " · main" : ""}
                    </span>
                    <span className="block text-sm">{br.address}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <CtaButton href={WA_ENQUIRY} external>
                <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
              <CtaButton href={`tel:${SITE.tel}`} variant="secondary" external>
                <Phone size={18} strokeWidth={2} /> {SITE.phoneDisplay}
              </CtaButton>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 flex items-center gap-2 text-sm text-ink-muted hover:text-primary-strong"
            >
              <Mail size={18} strokeWidth={1.75} className="shrink-0 text-primary" />
              {SITE.email}
            </a>
            <SmartImage
              src="/images/contact.jpg"
              alt="Inspire Academy of Mathematics"
              label="Academy / entrance photo (optional)"
              className="mt-6 aspect-[16/9] w-full rounded-2xl border border-border"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <iframe
                title={`Map to ${SITE.name}`}
                src={MAPS_EMBED}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              How admission works
            </h2>
            <ol className="mt-6 space-y-3">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className="group flex gap-3 rounded-2xl border border-border bg-bg p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-strong text-xs font-bold text-white transition-transform duration-200 group-hover:scale-110">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Areas we teach
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">{AREAS.join(", ")}.</p>

            <h3 className="mt-8 font-heading text-lg font-bold text-ink">Good to know</h3>
            <ul className="mt-4 space-y-3">
              {GOOD_TO_KNOW.map((g) => (
                <li
                  key={g}
                  className="group flex gap-3 rounded-2xl border border-border bg-bg p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong transition-transform duration-200 group-hover:scale-110">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
