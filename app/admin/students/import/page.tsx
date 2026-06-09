import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImportStudents from "@/components/admin/ImportStudents";

export const dynamic = "force-dynamic";
export const metadata = { title: "Import students", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/students"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Students
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Import students</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Upload a CSV with columns: <code>roll_number, name, parent_name, parent_whatsapp,
        alternate_number, class, board, school, batch, admission_date, default_monthly_fee,
        remarks</code>. Only <code>name</code> is required. The <code>batch</code> value must match an
        existing batch name exactly. Duplicates (same student name + parent phone) are skipped.
      </p>
      <a
        href="/students-sample.csv"
        download
        className="mt-4 inline-block rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
      >
        Download sample CSV
      </a>
      <ImportStudents />
    </div>
  );
}
