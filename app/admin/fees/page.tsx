import Link from "next/link";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createFee, togglePaid, deleteFee } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fees", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type StudentOpt = { id: string; name: string };
type FeeRow = {
  id: string;
  month: string | null;
  amount: number | null;
  paid: boolean;
  due_date: string | null;
  students: { name: string; parent_whatsapp: string | null } | null;
};

function href(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `/admin/fees?${qs}` : "/admin/fees";
}

function waReminder(
  name: string,
  amount: number | null,
  month: string | null,
  due: string | null,
  phone: string,
) {
  let msg = `Hello, this is Inspire Academy of Mathematics. The fee${amount != null ? ` of Rs ${amount}` : ""} for ${name}${month ? ` (${month})` : ""} is pending.`;
  if (due) msg += ` Kindly pay by ${due}.`;
  msg += " Thank you.";
  return `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const status = sp.status ?? "";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, name")
    .eq("active", true)
    .order("name");
  const studentList = (students ?? []) as StudentOpt[];

  let query = supabase
    .from("fees")
    .select("id, month, amount, paid, due_date, students(name, parent_whatsapp)", {
      count: "exact",
    });
  if (status === "pending") query = query.eq("paid", false);
  if (status === "paid") query = query.eq("paid", true);

  const { data, count } = await query
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const fees = (data ?? []) as unknown as FeeRow[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Fees</h1>

      <form
        action={createFee}
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Student</span>
          <select name="student_id" required className={`mt-1 ${field}`}>
            <option value="">Select</option>
            {studentList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Month</span>
          <input name="month" className={`mt-1 ${field}`} placeholder="June 2026" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Amount (Rs)</span>
          <input name="amount" type="number" min="0" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Due date</span>
          <input name="due_date" type="date" className={`mt-1 ${field}`} />
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          Add fee
        </button>
      </form>

      <div className="mt-6 flex gap-2 text-sm">
        {[
          { v: "", l: "All" },
          { v: "pending", l: "Pending" },
          { v: "paid", l: "Paid" },
        ].map((f) => (
          <Link
            key={f.v}
            href={href({ status: f.v })}
            className={
              status === f.v
                ? "rounded-full bg-primary-tint px-3 py-1.5 font-medium text-primary-strong"
                : "rounded-full border border-border px-3 py-1.5 font-medium text-ink-muted hover:text-ink"
            }
          >
            {f.l}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {total === 0 ? "No fee records." : `Showing ${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {fees.length > 0 && (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Month</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Due</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fees.map((f) => (
                <tr key={f.id}>
                  <td className="px-4 py-3 font-medium text-ink">{f.students?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{f.month ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{f.amount != null ? `Rs ${f.amount}` : "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{f.due_date ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        f.paid
                          ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                          : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                      }
                    >
                      {f.paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <form action={togglePaid}>
                        <input type="hidden" name="id" value={f.id} />
                        <input type="hidden" name="paid" value={String(f.paid)} />
                        <button type="submit" className="text-sm font-medium text-primary-strong hover:underline">
                          {f.paid ? "Mark pending" : "Mark paid"}
                        </button>
                      </form>
                      {!f.paid && f.students?.parent_whatsapp && (
                        <a
                          href={waReminder(
                            f.students.name,
                            f.amount,
                            f.month,
                            f.due_date,
                            f.students.parent_whatsapp,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary-strong hover:underline"
                        >
                          WhatsApp
                        </a>
                      )}
                      <form action={deleteFee}>
                        <input type="hidden" name="id" value={f.id} />
                        <button type="submit" title="Delete" className="text-ink-muted hover:text-error">
                          <Trash2 size={15} strokeWidth={1.75} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={href({ status, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ status, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
              Next
            </Link>
          ) : (
            <span className="text-ink-muted">Next</span>
          )}
        </div>
      )}
    </main>
  );
}
