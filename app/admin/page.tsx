import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };

type RecentLead = {
  id: string;
  name: string;
  phone: string;
  student_class: string | null;
  created_at: string;
};

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
    >
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 font-heading text-3xl font-bold text-ink">{value}</p>
    </Link>
  );
}

export default async function Page() {
  const supabase = await createClient();
  const [studentsTotal, studentsActive, leadsNew, feesPending, recent] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("students").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("fees").select("*", { count: "exact", head: true }).eq("paid", false),
    supabase
      .from("leads")
      .select("id, name, phone, student_class, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Active students", value: studentsActive.count ?? 0, href: "/admin/students?active=true" },
    { label: "Total students", value: studentsTotal.count ?? 0, href: "/admin/students" },
    { label: "New leads", value: leadsNew.count ?? 0, href: "/admin/leads?status=new" },
    { label: "Pending fees", value: feesPending.count ?? 0, href: "/admin/fees?status=pending" },
  ];
  const recentLeads = (recent.data ?? []) as RecentLead[];

  const quick = [
    { label: "Take attendance", href: "/admin/attendance" },
    { label: "Add student", href: "/admin/students/new" },
    { label: "Create test", href: "/admin/tests" },
    { label: "Manage fees", href: "/admin/fees" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Dashboard</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quick.map((qk) => (
          <Link
            key={qk.href}
            href={qk.href}
            className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            {qk.label}
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-ink">Recent enquiries</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-primary-strong hover:underline">
            View all
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No enquiries yet.</p>
        ) : (
          <div className="mt-3 divide-y divide-border rounded-2xl border border-border">
            {recentLeads.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <p className="font-medium text-ink">
                    {l.name} <span className="text-ink-muted">{l.student_class ?? ""}</span>
                  </p>
                  <a href={`tel:+91${l.phone}`} className="text-sm text-primary-strong hover:underline">
                    {l.phone}
                  </a>
                </div>
                <span className="text-xs text-ink-muted">
                  {new Date(l.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
