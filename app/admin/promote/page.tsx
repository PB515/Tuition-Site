import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { currentAcademicYear } from "@/lib/academic-year";
import { ENQUIRY_CLASSES } from "@/lib/site";
import ArchiveDownloader from "@/components/admin/ArchiveDownloader";
import PromoteTool from "@/components/admin/PromoteTool";

export const dynamic = "force-dynamic";
export const metadata = { title: "Year-end", robots: { index: false, follow: false } };

type Batch = { id: string; name: string; academic_year: string | null };

const STEPS = [
  "In Batches, create next year's batches first (set the new academic year), one per class and stream - like '11 Regular A' and '11 Applied A'.",
  "Below, pick the old batch (e.g. 10-A). Its students appear in a list.",
  "Choose where the ticked students go: the new class, and the new batch.",
  "Tick the students for that destination and press 'Promote selected'. Repeat for the other stream.",
  "Tick the students who are leaving and press 'Mark selected as left'. They keep all their history.",
  "Pick the next old batch and repeat.",
];

export default async function Page() {
  const supabase = await createClient();
  const current = currentAcademicYear();

  const { data: batchData } = await supabase
    .from("batches")
    .select("id, name, academic_year")
    .order("academic_year", { ascending: false })
    .order("name");
  const batches = (batchData ?? []) as Batch[];

  const years = Array.from(
    new Set([current, ...batches.map((b) => b.academic_year).filter(Boolean) as string[]]),
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
        <h2 className="font-heading text-lg font-bold text-ink">Promote students</h2>
        <ol className="mt-3 max-w-3xl list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted">
          {STEPS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className="mt-4 max-w-3xl">
          {batches.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted">
              You have no batches yet. Create them in{" "}
              <Link href="/admin/batches" className="font-medium text-primary-strong hover:underline">
                Batches
              </Link>{" "}
              first.
            </p>
          ) : (
            <PromoteTool batches={batches} classes={ENQUIRY_CLASSES} />
          )}
        </div>
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
