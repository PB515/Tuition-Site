import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BroadcastComposer from "@/components/admin/BroadcastComposer";
import { createTemplate, deleteTemplate } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Messages", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Template = { id: string; name: string; body: string };
type Student = { id: string; name: string; parent_whatsapp: string | null };

export default async function Page({ searchParams }: { searchParams: Promise<{ batch?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("message_templates")
    .select("*")
    .order("created_at", { ascending: false });
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batch = sp.batch ?? "";

  let students: Student[] = [];
  if (batch === "all") {
    const { data } = await supabase.from("students").select("id, name, parent_whatsapp").eq("active", true).order("name");
    students = (data ?? []) as Student[];
  } else if (batch) {
    const { data } = await supabase
      .from("students")
      .select("id, name, parent_whatsapp")
      .eq("batch_id", batch)
      .eq("active", true)
      .order("name");
    students = (data ?? []) as Student[];
  }

  const tmpls = (templates ?? []) as Template[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Messages</h1>
      <p className="mt-1 text-sm text-ink-muted">
        WhatsApp hub. Sending stays one-tap and manual (no per-message cost).
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-4">
          <h2 className="font-heading text-lg font-bold text-ink">Templates</h2>
          <form action={createTemplate} className="mt-3 space-y-2">
            <input name="name" required placeholder="Template name (e.g. Holiday notice)" className={field} />
            <textarea name="body" required rows={2} placeholder="Message. Use {name} for the student's name." className={field} />
            <button type="submit" className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep">
              Save template
            </button>
          </form>
          {tmpls.length > 0 && (
            <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-bg">
              {tmpls.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.body}</p>
                  </div>
                  <form action={deleteTemplate}>
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" title="Delete" className="text-ink-muted hover:text-error">
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4">
          <h2 className="font-heading text-lg font-bold text-ink">Broadcast</h2>
          <form method="get" className="mt-3 flex items-end gap-2">
            <label className="block flex-1 text-sm">
              <span className="font-medium text-ink">To</span>
              <select name="batch" defaultValue={batch} className={`mt-1 ${field}`}>
                <option value="">Select recipients</option>
                <option value="all">All active students</option>
                {(batches ?? []).map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint">
              Load
            </button>
          </form>

          {batch ? (
            students.length > 0 ? (
              <BroadcastComposer students={students} templates={tmpls} />
            ) : (
              <p className="mt-4 text-sm text-ink-muted">No active students for this selection.</p>
            )
          ) : (
            <p className="mt-4 text-sm text-ink-muted">Pick recipients to compose a broadcast.</p>
          )}
        </section>
      </div>
    </div>
  );
}
