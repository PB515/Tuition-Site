import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { currentAcademicYear } from "@/lib/academic-year";
import ArchiveDownloader from "@/components/admin/ArchiveDownloader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Year-end", robots: { index: false, follow: false } };

const STEPS = [
  "In Batches, create next year's batches first (set the new Academic year, e.g. 2027-2028) - one for each new class and stream, like '11 Regular A' and '11 Applied A'.",
  "Go to Students. Filter Batch to the old batch (e.g. 10-A) and set Show to 100 so the whole batch is on one screen.",
  "Tick the students staying with you for Regular. In the blue bar, choose 'Promote to class' (Class 11) and 'into batch' (11 Regular A), then press Promote.",
  "Tick the students going to Applied, choose Class 11 and the 11 Applied batch, press Promote.",
  "Tick the students who are leaving and press 'Mark inactive'. They keep all their history; they just drop off the active lists.",
  "Repeat for each old batch (10-B, 10-C, 10-D, then the 12th batches that are graduating).",
];

export default async function Page() {
  const supabase = await createClient();
  const current = currentAcademicYear();
  const { data } = await supabase.from("batches").select("academic_year");
  const years = Array.from(
    new Set([current, ...((data ?? []).map((b) => b.academic_year as string | null).filter(Boolean) as string[])]),
  ).sort((a, b) => b.localeCompare(a));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Year-end rollover</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Move students up a class at the end of the year, and keep a copy of each year&apos;s data on your
        computer. Nothing is ever deleted - promotion only changes a student&apos;s class and batch, so all
        their attendance, marks and fees stay attached.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold text-ink">Promote students (one batch at a time)</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          A batch usually splits - some go Regular, some Applied, some leave. So you tick each group and
          promote it. The promotion itself happens on the{" "}
          <Link href="/admin/students" className="font-medium text-primary-strong hover:underline">
            Students
          </Link>{" "}
          page.
        </p>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 rounded-2xl border border-border bg-surface p-5 pl-9 text-sm leading-relaxed text-ink-muted">
          {STEPS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-ink">Download a year for your records</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Pick a year and download its data as CSV (opens in Excel). This is a copy for research or backup -
          the data stays safe in the system either way.
        </p>
        <div className="mt-4 max-w-2xl">
          <ArchiveDownloader years={years} current={current} />
        </div>
      </section>
    </div>
  );
}
