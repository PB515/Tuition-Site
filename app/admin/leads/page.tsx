import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LeadControls from "@/components/admin/LeadControls";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  student_class: string | null;
  school: string | null;
  message: string | null;
  status: string | null;
};

const STATUS_OPTS = [
  { v: "", l: "All statuses" },
  { v: "new", l: "New" },
  { v: "enquired", l: "Enquired" },
  { v: "visited", l: "Visited" },
  { v: "joined", l: "Joined" },
  { v: "not_interested", l: "Not interested" },
];

function href(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `/admin/leads?${qs}` : "/admin/leads";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const status = sp.status ?? "";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase.from("leads").select("*", { count: "exact" });
  if (q) {
    const safe = q.replace(/[,%()]/g, " ");
    query = query.or(`name.ilike.%${safe}%,phone.ilike.%${safe}%`);
  }
  if (status) query = query.eq("status", status);

  const { data, count } = await query
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const leads = (data ?? []) as Lead[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-ink">Enquiry leads</h1>
        <a
          href="/admin/export/leads"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          Export CSV
        </a>
      </div>

      <form
        method="get"
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Search</span>
          <input name="q" defaultValue={q} placeholder="name or phone" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Status</span>
          <select name="status" defaultValue={status} className={`mt-1 ${field}`}>
            {STATUS_OPTS.map((s) => (
              <option key={s.v} value={s.v}>
                {s.l}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          Search
        </button>
      </form>

      <p className="mt-4 text-sm text-ink-muted">
        {total === 0 ? "No leads match." : `Showing ${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {leads.length > 0 && (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">When</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">School</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Status / Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                    {new Date(lead.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">{lead.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a href={`tel:+91${lead.phone}`} className="text-primary-strong hover:underline">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                    {lead.student_class ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{lead.school ?? "-"}</td>
                  <td className="max-w-[16rem] px-4 py-3 text-ink-muted">{lead.message ?? "-"}</td>
                  <td className="px-4 py-3">
                    <LeadControls
                      id={lead.id}
                      name={lead.name}
                      phone={lead.phone}
                      status={lead.status ?? "new"}
                    />
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
            <Link href={href({ q, status, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ q, status, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
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
