import { Check } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import SmartImage from "@/components/site/SmartImage";
import EnquiryBand from "@/components/site/EnquiryBand";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata = { title: "About Snehal Sir" };

const POINTS = [
  "Math, and only math, so the focus never gets divided across subjects.",
  "Every batch is taught by Sir himself, not a rotating set of tutors.",
  "Concepts come before formulas, so the method holds under exam pressure.",
  "NCERT-based teaching that serves both CBSE and GSEB students.",
  "Weekly tests, printed notes, and honest mistake analysis for every student.",
];

const CREDENTIALS = [
  { label: "Education", items: ["BSc and MSc in Mathematics", "B.Ed"] },
  {
    label: "School experience",
    items: [
      "Higher Secondary mathematics teacher at Navrachana School, Sama (2006 to 2024)",
      "Served as Head of the Mathematics Department",
      "Also taught at Navrachana International, Bhayli",
    ],
  },
  {
    label: "Founder",
    items: ["Co-founded Inspire Academy with his wife, who manages the administration"],
  },
];

export default function Page() {
  return (
    <main>
      <JsonLd data={personLd()} />
      <PageHeader
        eyebrow="The teacher"
        title="Learn math from Snehal Sir"
        subtitle={`${SITE.yearsExperience} years of teaching mathematics in Vadodara since ${SITE.since}, including years at Navrachana School.`}
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="space-y-5 text-base leading-relaxed text-ink-muted">
            <p>
              Snehal Sir has taught mathematics in Vadodara since {SITE.since}. Over{" "}
              {SITE.yearsExperience} years, he has helped students move from fear and confusion in
              math to clarity, confidence and real exam performance.
            </p>
            <p>
              From 2006 to 2024 he taught Higher Secondary mathematics at Navrachana School, Sama,
              where he also served as Head of the Mathematics Department, and he taught at Navrachana
              International, Bhayli. While teaching there, he co-founded Inspire Academy with his wife,
              who runs the academy&apos;s administration.
            </p>
            <p>
              Inspire Academy is built around one idea: do one subject, and do it deeply. There is no
              spreading thin across many subjects. Every batch is taught by Sir himself, so students
              get steady, personal attention from someone who knows exactly where they get stuck.
            </p>
            <p>
              That focus shows in results like 97 out of 100, the highest in Navrachana Applied Math,
              scored by our student Chirayu Jani.
            </p>
          </div>

          <SmartImage
            src="/images/about/portrait.jpg"
            alt={`${SITE.teacher} portrait`}
            label="Portrait photo of Sir"
            className="aspect-[4/5] w-full rounded-2xl border border-border"
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Background and qualifications
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
                  {c.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                      <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What makes his teaching different
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-ink-muted">
                <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <SmartImage
            src="/images/about/teaching.jpg"
            alt="Snehal Sir teaching students"
            label="Sir teaching / with students"
            className="aspect-[16/9] w-full rounded-2xl border border-border"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </div>
      </section>

      <EnquiryBand heading="Want your child taught by Snehal Sir?" />
    </main>
  );
}
