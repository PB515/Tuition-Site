import PageHeader from "@/components/site/PageHeader";
import SmartImage from "@/components/site/SmartImage";
import EnquiryBand from "@/components/site/EnquiryBand";
import FloatingMath from "@/components/site/FloatingMath";
import { METHOD_STEPS } from "@/lib/site";

export const metadata = { title: "Teaching Method" };

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="The Inspire Math Learning System"
        title="How a topic goes from confusing to clear"
        subtitle="A steady, repeatable way of teaching math, used in every batch."
      />

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={0} count={4} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {METHOD_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="group flex gap-4 rounded-2xl border border-border bg-bg p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-bold text-white transition-transform duration-200 group-hover:scale-110">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={1} count={2} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <SmartImage
            src="/images/method.jpg"
            alt="Snehal Sir explaining a math method on the board"
            label="Sir explaining on the board"
            className="aspect-[16/9] w-full rounded-2xl border border-border"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={2} count={4} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why this works
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Most students do not fail math because they cannot do it. They fall behind when one weak
            chapter is never fixed, and it quietly breaks the next one. The system above keeps finding
            and closing those gaps, week after week, so the foundation stays strong all the way to the
            board and competitive exams.
          </p>
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
