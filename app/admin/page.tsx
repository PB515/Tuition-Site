import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LeadControls from "@/components/admin/LeadControls";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  student_class: string | null;
  school: string | null;
  message: string | null;
  source: string | null;
  status: string | null;
};

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

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

      {error ? (
        <p className="mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-error">
          Could not load leads: {error.message}
        </p>
      ) : !leads || leads.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          No enquiries yet. New contact-form submissions will appear here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
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
              {(leads as Lead[]).map((lead) => (
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
    </main>
  );
}
