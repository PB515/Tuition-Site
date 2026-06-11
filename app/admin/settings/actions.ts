"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();
  const fee = String(formData.get("default_monthly_fee") || "").trim();
  await supabase
    .from("app_settings")
    .update({
      academy_name: String(formData.get("academy_name") || "").trim() || null,
      academy_phone: String(formData.get("academy_phone") || "").trim() || null,
      academy_address: String(formData.get("academy_address") || "").trim() || null,
      default_monthly_fee: fee ? Number(fee) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  revalidatePath("/admin/settings");
}

export type AssistantState = { ok: boolean; error?: string; link?: string; mode?: "invite" | "reset" };

export async function inviteAssistant(
  _prev: AssistantState,
  formData: FormData,
): Promise<AssistantState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) return { ok: false, error: "Enter an email." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };
  const { data: me } = await supabase.from("staff").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!me) return { ok: false, error: "Staff only." };

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const confirmLink = (tokenHash: string, type: string, next: string) =>
    `${origin}/auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=${type}&next=${encodeURIComponent(next)}`;

  const admin = createAdminClient();
  let userId: string | null = null;
  let link: string | null = null;
  let mode: "invite" | "reset" = "invite";

  const inv = await admin.auth.admin.generateLink({ type: "invite", email });
  if (!inv.error && inv.data?.user) {
    userId = inv.data.user.id;
    link = confirmLink(inv.data.properties.hashed_token, "invite", "/parent/set-password");
  } else {
    const rec = await admin.auth.admin.generateLink({ type: "recovery", email });
    if (!rec.error && rec.data?.user) {
      userId = rec.data.user.id;
      link = confirmLink(rec.data.properties.hashed_token, "recovery", "/parent/reset");
      mode = "reset";
    } else {
      return { ok: false, error: rec.error?.message || inv.error?.message || "Could not create the invite." };
    }
  }

  const { data: existing } = await admin.from("staff").select("user_id").eq("user_id", userId).maybeSingle();
  if (!existing) await admin.from("staff").insert({ user_id: userId });
  revalidatePath("/admin/settings");
  return { ok: true, link: link!, mode };
}

export async function removeAssistant(userId: string) {
  if (!userId) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { data: me } = await supabase.from("staff").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!me) return;
  if (userId === user.id) return; // cannot remove yourself
  const admin = createAdminClient();
  await admin.from("staff").delete().eq("user_id", userId);
  revalidatePath("/admin/settings");
}
