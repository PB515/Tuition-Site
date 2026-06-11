import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveSettings } from "./actions";
import InviteAssistantForm from "@/components/admin/InviteAssistantForm";
import RemoveAssistantButton from "@/components/admin/RemoveAssistantButton";

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
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  const { data: settings } = await supabase.from("app_settings").select("*").eq("id", 1).maybeSingle();
  const { data: staffRows } = await supabase.from("staff").select("user_id");

  let staffList: { user_id: string; email: string; self: boolean }[] = [];
  let adminKeyOk = false;
  try {
    const admin = createAdminClient();
    const list = await admin.auth.admin.listUsers();
    adminKeyOk = true;
    const emailById = new Map((list.data?.users ?? []).map((u) => [u.id, u.email ?? ""]));
    staffList = (staffRows ?? []).map((r) => ({
      user_id: r.user_id,
      email: emailById.get(r.user_id) || r.user_id,
      self: r.user_id === currentUser?.id,
    }));
  } catch {
    // Admin key not configured; cannot resolve emails or invite from here.
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
        <h2 className="font-heading text-lg font-bold text-ink">Staff &amp; assistants</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Invite an assistant by email and they get their own login. Remove their access in one click
          when they leave.
        </p>

        {adminKeyOk ? (
          <>
            <div className="mt-4">
              <InviteAssistantForm />
            </div>
            <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
              {staffList.map((m) => (
                <li key={m.user_id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="text-ink">
                    {m.email}
                    {m.self && <span className="ml-2 text-xs text-ink-muted">(you)</span>}
                  </span>
                  {!m.self && <RemoveAssistantButton userId={m.user_id} email={m.email} />}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted">
            {staffCount} staff account(s). To invite or remove assistants here, set SUPABASE_SECRET_KEY
            in the environment.
          </p>
        )}
      </section>
    </div>
  );
}
