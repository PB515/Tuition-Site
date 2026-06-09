import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Students", robots: { index: false, follow: false } };

type Row = {
  id: string;
  name: string;
  class: string | null;
  parent_name: string | null;
  parent_whatsapp: string | null;
  active: boolean;
  batches: { name: string } | null;
};

export default async function Page() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, name, class, parent_name, parent_whatsapp, active, batches(name)")
    .order("name");

  const rows = (students ?? []) as unknown as Row[];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-ink">Students</h1>
        <Link
          href="/admin/students/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          <Plus size={16} strokeWidth={2.5} /> Add student
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        {rows.length === 0 ? (
          <p className="bg-surface p-6 text-sm text-ink-muted">
            No students yet. Add a batch first, then add students.
          </p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Batch</th>
                <th className="px-4 py-3 font-semibold">Parent</th>
                <th className="px-4 py-3 font-semibold">WhatsApp</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.class ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.batches?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.parent_name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.parent_whatsapp ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.active
                          ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                          : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted"
                      }
                    >
                      {r.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/students/${r.id}`}
                      className="text-sm font-medium text-primary-strong hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
