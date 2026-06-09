"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["new", "enquired", "visited", "joined", "not_interested"];

export async function updateLeadStatus(id: string, status: string) {
  if (!STATUSES.includes(status)) return;
  const supabase = await createClient();
  // RLS enforces that only staff can update; an anon/non-staff call fails here.
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function deleteAllLeads() {
  const supabase = await createClient();
  // PostgREST requires a filter; this matches every row.
  const { error } = await supabase.from("leads").delete().not("id", "is", null);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
