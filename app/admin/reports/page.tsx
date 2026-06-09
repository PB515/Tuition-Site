import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reports", robots: { index: false, follow: false } };

const REPORTS: { group: string; items: { label: string; desc: string; href: string }[] }[] = [
  {
    group: "Attendance",
    items: [
      { label: "Daily attendance by batch", desc: "Present / absent / late on a date", href: "/admin/reports/attendance-daily" },
      { label: "Monthly attendance by student", desc: "Attendance % over a date range", href: "/admin/reports/attendance-monthly" },
      { label: "Absent students", desc: "Absent / late over a range", href: "/admin/reports/absentees" },
    ],
  },
  {
    group: "Fees",
    items: [
      { label: "Pending fees", desc: "All unpaid fees", href: "/admin/fees?status=pending" },
      { label: "Overdue fees", desc: "Unpaid past due date", href: "/admin/fees?status=overdue" },
      { label: "Monthly collection", desc: "Fees collected in a date range", href: "/admin/reports/collection" },
    ],
  },
  {
    group: "Performance",
    items: [
      { label: "Test performance", desc: "Marks + summary for a test", href: "/admin/reports/test-performance" },
      { label: "Weak students", desc: "Low attendance or last-test score", href: "/admin/reports/weak-students" },
    ],
  },
  {
    group: "Leads",
    items: [{ label: "Lead follow-ups", desc: "Enquiries by status", href: "/admin/leads" }],
  },
];

export default function Page() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Reports</h1>
      <p className="mt-1 text-sm text-ink-muted">Filterable views, each exportable to CSV.</p>

      <div className="mt-6 space-y-8">
        {REPORTS.map((g) => (
          <section key={g.group}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{g.group}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-bg p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{it.label}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{it.desc}</p>
                  </div>
                  <ArrowRight size={18} strokeWidth={1.75} className="shrink-0 text-primary" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
