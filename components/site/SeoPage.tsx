import { Check } from "lucide-react";
import PageHeader from "./PageHeader";
import EnquiryBand from "./EnquiryBand";

export type SeoContent = {
  eyebrow: string;
  title: string;
  intro: string;
  whoFor: string[];
  covered: string[];
  teaching: string;
  faqs: { q: string; a: string }[];
};

export default function SeoPage({ content }: { content: SeoContent }) {
  return (
    <main>
      <PageHeader eyebrow={content.eyebrow} title={content.title} subtitle={content.intro} />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Who it is for
            </h2>
            <ul className="mt-6 space-y-3">
              {content.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-ink-muted">
                  <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              What we cover
            </h2>
            <ul className="mt-6 space-y-3">
              {content.covered.map((c) => (
                <li key={c} className="flex gap-3 text-ink-muted">
                  <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            How Snehal Soni Sir teaches it
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{content.teaching}</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Common questions
          </h2>
          <dl className="mt-8 space-y-7">
            {content.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
