import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";
import { METHOD_STEPS } from "@/lib/site";

export const metadata = { title: "Teaching Method" };

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="The Inspire Maths Learning System"
        title="How a topic goes from confusing to clear"
        subtitle="A steady, repeatable way of teaching maths, used in every batch."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {METHOD_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-bold text-white">
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

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why this works
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Most students do not fail maths because they cannot do it. They fall behind when one weak
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
