import { Check } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import SmartImage from "@/components/site/SmartImage";
import EnquiryBand from "@/components/site/EnquiryBand";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const metadata = { title: "About Snehal Soni Sir" };

const POINTS = [
  "Maths, and only maths, so the focus never gets divided across subjects.",
  "Every batch is taught by Sir himself, not a rotating set of tutors.",
  "Concepts come before formulas, so the method holds under exam pressure.",
  "NCERT-based teaching that serves both CBSE and GSEB students.",
  "Weekly tests, printed notes, and honest mistake analysis for every student.",
];

export default function Page() {
  return (
    <main>
      <JsonLd data={personLd()} />
      <PageHeader
        eyebrow="The teacher"
        title="Learn maths from Snehal Soni Sir"
        subtitle={`${SITE.yearsExperience} years of teaching mathematics in Vadodara, since ${SITE.since}.`}
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="space-y-5 text-base leading-relaxed text-ink-muted">
            <p>
              Snehal Soni Sir has taught mathematics in Vadodara since {SITE.since}. Over{" "}
              {SITE.yearsExperience} years, he has helped students move from fear and confusion in
              maths to clarity, confidence and real exam performance.
            </p>
            <p>
              Inspire Academy is built around one idea: do one subject, and do it deeply. There is no
              spreading thin across many subjects. Every batch is taught by Sir himself, so students
              get steady, personal attention from someone who knows exactly where they get stuck.
            </p>
            <p>
              That focus shows in results like 97 out of 100, the highest in Navrachana Applied Maths,
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
            alt="Snehal Soni Sir teaching students"
            label="Sir teaching / with students"
            className="aspect-[16/9] w-full rounded-2xl border border-border"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </div>
      </section>

      <EnquiryBand heading="Want your child taught by Snehal Soni Sir?" />
    </main>
  );
}
