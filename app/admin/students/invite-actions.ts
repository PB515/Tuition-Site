"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type InviteState = {
  ok: boolean;
  error?: string;
  waLink?: string;
  actionLink?: string;
  mode?: "invite" | "reset";
};

export async function inviteParent(_prev: InviteState, formData: FormData): Promise<InviteState> {
  const student_id = String(formData.get("student_id") || "");
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const parent_whatsapp = String(formData.get("parent_whatsapp") || "").replace(/\D/g, "");
  if (!student_id || !email) return { ok: false, error: "Enter the parent's email." };

  // Caller must be staff (the admin client below bypasses RLS).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };
  const { data: staffRow } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!staffRow) return { ok: false, error: "Staff only." };

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const confirmLink = (tokenHash: string, type: string, next: string) =>
    `${origin}/auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=${type}&next=${encodeURIComponent(next)}`;

  const admin = createAdminClient();

  let userId: string | null = null;
  let link: string | null = null;
  let mode: "invite" | "reset" = "invite";

  // New parent -> invite link. Existing parent -> recovery (reset) link.
  const inv = await admin.auth.admin.generateLink({ type: "invite", email });
  if (!inv.error && inv.data?.user) {
    userId = inv.data.user.id;
    link = confirmLink(inv.data.properties.hashed_token, "invite", "/parent/set-password");
    mode = "invite";
  } else {
    const rec = await admin.auth.admin.generateLink({ type: "recovery", email });
    if (!rec.error && rec.data?.user) {
      userId = rec.data.user.id;
      link = confirmLink(rec.data.properties.hashed_token, "recovery", "/parent/reset");
      mode = "reset";
    } else {
      return { ok: false, error: rec.error?.message || inv.error?.message || "Could not create the link." };
    }
  }

  // Link parent to this student (idempotent).
  await admin.from("parents").upsert({ user_id: userId, student_id }, { onConflict: "user_id,student_id" });
  revalidatePath(`/admin/students/${student_id}`);

  const msg =
    mode === "invite"
      ? `Hello, here is your Inspire Academy of Mathematics parent login. Open this link to set your password and see your child's progress: ${link}`
      : `Hello, here is your Inspire Academy of Mathematics login reset link. Open it to set a new password: ${link}`;
  const waLink = parent_whatsapp
    ? `https://wa.me/91${parent_whatsapp}?text=${encodeURIComponent(msg)}`
    : undefined;

  return { ok: true, waLink, actionLink: link!, mode };
}
