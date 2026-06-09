import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveSettings } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Settings = {
  academy_name: string | null;
  academy_phone: string | null;
  academy_address: string | null;
  default_monthly_fee: number | null;
};

export default async function Page() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("app_settings").select("*").eq("id", 1).maybeSingle();
  const { data: staffRows } = await supabase.from("staff").select("user_id");

  let staffEmails: string[] = [];
  try {
    const admin = createAdminClient();
    const list = await admin.auth.admin.listUsers();
    const ids = new Set((staffRows ?? []).map((s) => s.user_id));
    staffEmails = (list.data?.users ?? [])
      .filter((u) => ids.has(u.id))
      .map((u) => u.email ?? "")
      .filter(Boolean);
  } catch {
    // Admin key not configured in this environment; show count instead.
  }

  const s = (settings ?? {}) as Settings;
  const staffCount = (staffRows ?? []).length;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Settings</h1>

      <form action={saveSettings} className="mt-6 max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-heading text-lg font-bold text-ink">Academy details</h2>
        <label className="block text-sm">
          <span className="font-medium text-ink">Academy name</span>
          <input name="academy_name" defaultValue={s.academy_name ?? ""} className={`mt-1 ${field}`} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink">Phone</span>
            <input name="academy_phone" defaultValue={s.academy_phone ?? ""} className={`mt-1 ${field}`} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Default monthly fee (Rs)</span>
            <input
              name="default_monthly_fee"
              type="number"
              min="0"
              defaultValue={s.default_monthly_fee ?? ""}
              className={`mt-1 ${field}`}
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="font-medium text-ink">Address</span>
          <textarea name="academy_address" rows={2} defaultValue={s.academy_address ?? ""} className={`mt-1 ${field}`} />
        </label>
        <button type="submit" className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep">
          Save settings
        </button>
      </form>

      <section className="mt-8 max-w-xl">
        <h2 className="font-heading text-lg font-bold text-ink">Staff access</h2>
        {staffEmails.length > 0 ? (
          <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
            {staffEmails.map((e) => (
              <li key={e} className="px-4 py-2.5 text-sm text-ink">
                {e}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted">
            {staffCount} staff account(s). Add staff in Supabase (Authentication, then insert their
            user id into the staff table).
          </p>
        )}
      </section>
    </div>
  );
}
