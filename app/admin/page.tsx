import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };

type RecentLead = { id: string; name: string; phone: string; student_class: string | null; created_at: string };

function Card({
  label,
  value,
  sub,
  href,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  href: string;
  tone?: "due" | "ok";
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary"
    >
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p
        className={
          "mt-1 font-heading text-2xl font-bold " +
          (tone === "due" ? "text-error" : tone === "ok" ? "text-primary-strong" : "text-ink")
        }
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>}
    </Link>
  );
}

export default async function Page() {
  const supabase = await createClient();

  const nowIST = new Date(Date.now() + 5.5 * 3600 * 1000);
  const todayStr = nowIST.toISOString().slice(0, 10);
  const tmrStr = new Date(nowIST.getTime() + 86400000).toISOString().slice(0, 10);
  const monthStart = todayStr.slice(0, 7) + "-01";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][nowIST.getUTCDay()];

  const [
    activeStudents,
    newAdmissions,
    testsToday,
    absentToday,
    enquiriesToday,
    newLeads,
    noBatch,
    batchesRes,
    attTodayRes,
    unpaidRes,
    collectionRes,
    recentRes,
  ] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("students").select("*", { count: "exact", head: true }).gte("admission_date", monthStart),
    supabase.from("tests").select("*", { count: "exact", head: true }).eq("date", todayStr),
    supabase.from("attendance").select("*", { count: "exact", head: true }).eq("date", todayStr).eq("status", "absent"),
    supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", todayStr).lt("created_at", tmrStr),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("students").select("*", { count: "exact", head: true }).eq("active", true).is("batch_id", null),
    supabase.from("batches").select("id, days"),
    supabase.from("attendance").select("batch_id").eq("date", todayStr),
    supabase.from("fees").select("amount, due_date").eq("paid", false),
    supabase.from("fees").select("amount").eq("paid", true).gte("paid_at", monthStart),
    supabase.from("leads").select("id, name, phone, student_class, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const scheduledToday = (batchesRes.data ?? []).filter((b) => b.days && b.days.includes(weekday));
  const markedSet = new Set((attTodayRes.data ?? []).map((a) => a.batch_id));
  const attendancePending = scheduledToday.filter((b) => !markedSet.has(b.id)).length;

  let pendingAmt = 0;
  let overdueAmt = 0;
  let overdueCount = 0;
  for (const f of (unpaidRes.data ?? []) as { amount: number | null; due_date: string | null }[]) {
    const amt = f.amount ?? 0;
    pendingAmt += amt;
    if (f.due_date && f.due_date < todayStr) {
      overdueAmt += amt;
      overdueCount++;
    }
  }
  const collection = ((collectionRes.data ?? []) as { amount: number | null }[]).reduce(
    (sum, f) => sum + (f.amount ?? 0),
    0,
  );

  const recentLeads = (recentRes.data ?? []) as RecentLead[];

  const alerts: { text: string; href: string }[] = [];
  if (overdueCount > 0) alerts.push({ text: `Rs ${overdueAmt} overdue across ${overdueCount} fee record(s)`, href: "/admin/fees?status=overdue" });
  if (attendancePending > 0) alerts.push({ text: `${attendancePending} batch(es) scheduled today not marked`, href: "/admin/attendance" });
  if ((newLeads.count ?? 0) > 0) alerts.push({ text: `${newLeads.count} new lead(s) to follow up`, href: "/admin/leads?status=new" });
  if ((noBatch.count ?? 0) > 0) alerts.push({ text: `${noBatch.count} active student(s) have no batch`, href: "/admin/students" });

  const quick = [
    { label: "Mark attendance", href: "/admin/attendance" },
    { label: "Add student", href: "/admin/students/new" },
    { label: "Create test", href: "/admin/tests" },
    { label: "Generate fees", href: "/admin/fees" },
    { label: "Send fee reminders", href: "/admin/fees?status=pending" },
    { label: "View leads", href: "/admin/leads" },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Dashboard</h1>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-muted">Today&apos;s operations</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Card label="Attendance pending" value={String(attendancePending)} sub={`of ${scheduledToday.length} scheduled`} href="/admin/attendance" tone={attendancePending > 0 ? "due" : undefined} />
        <Card label="Batches today" value={String(scheduledToday.length)} href="/admin/batches" />
        <Card label="Tests today" value={String(testsToday.count ?? 0)} href="/admin/tests" />
        <Card label="Absent today" value={String(absentToday.count ?? 0)} href="/admin/attendance" />
        <Card label="New enquiries" value={String(enquiriesToday.count ?? 0)} href="/admin/leads" />
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-ink-muted">This month</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Card label="Active students" value={String(activeStudents.count ?? 0)} href="/admin/students?active=active" />
        <Card label="Pending fees" value={`Rs ${pendingAmt}`} href="/admin/fees?status=pending" />
        <Card label="Overdue fees" value={`Rs ${overdueAmt}`} href="/admin/fees?status=overdue" tone={overdueAmt > 0 ? "due" : undefined} />
        <Card label="Collected" value={`Rs ${collection}`} href="/admin/fees" tone="ok" />
        <Card label="New admissions" value={String(newAdmissions.count ?? 0)} href="/admin/students" />
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-ink-muted">Quick actions</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {quick.map((qk) => (
          <Link
            key={qk.label}
            href={qk.href}
            className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            {qk.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Alerts</h2>
          {alerts.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted">All clear.</p>
          ) : (
            <div className="mt-3 divide-y divide-border rounded-2xl border border-border">
              {alerts.map((a) => (
                <Link key={a.href} href={a.href} className="flex items-center gap-3 px-4 py-3 hover:bg-surface">
                  <AlertTriangle size={16} strokeWidth={2} className="shrink-0 text-accent" />
                  <span className="text-sm text-ink">{a.text}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Recent enquiries</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-primary-strong hover:underline">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted">No enquiries yet.</p>
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
      </div>
    </div>
  );
}
