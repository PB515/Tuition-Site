export const dynamic = "force-dynamic";
export const metadata = { title: "Reports", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Reports</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
        Daily attendance, monthly attendance, absent students, pending and overdue fees, monthly
        collection, test performance, weak students and lead follow-ups - all filterable and CSV
        exportable. Built in the Reports phase.
      </p>
    </div>
  );
}
