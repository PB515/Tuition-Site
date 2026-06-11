"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseStudent(formData: FormData) {
  const digits = String(formData.get("parent_whatsapp") || "").replace(/\D/g, "");
  const alt = String(formData.get("alternate_number") || "").replace(/\D/g, "");
  const fee = String(formData.get("annual_fee") || "").trim();
  return {
    name: String(formData.get("name") || "").trim(),
    roll_number: String(formData.get("roll_number") || "").trim() || null,
    parent_name: String(formData.get("parent_name") || "").trim() || null,
    parent_whatsapp: digits || null,
    alternate_number: alt || null,
    class: String(formData.get("class") || "").trim() || null,
    board: String(formData.get("board") || "").trim() || null,
    school: String(formData.get("school") || "").trim() || null,
    batch_id: String(formData.get("batch_id") || "") || null,
    admission_date: String(formData.get("admission_date") || "") || null,
    annual_fee: fee ? Number(fee) : null,
    active: formData.get("active") === "on",
    remarks: String(formData.get("remarks") || "").trim() || null,
  };
}

export async function createStudent(formData: FormData) {
  const data = parseStudent(formData);
  if (!data.name) return;
  const supabase = await createClient();
  const { data: inserted } = await supabase.from("students").insert(data).select("id").single();
  revalidatePath("/admin/students");

  const intent = String(formData.get("intent") || "save");
  const id = inserted?.id;
  if (intent === "another") redirect("/admin/students/new");
  if ((intent === "profile" || intent === "fee") && id) redirect(`/admin/students/${id}`);
  redirect("/admin/students");
}

export async function updateStudent(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const data = parseStudent(formData);
  const supabase = await createClient();
  await supabase.from("students").update(data).eq("id", id);
  revalidatePath("/admin/students");
  revalidatePath(`/admin/students/${id}`);
  redirect(`/admin/students/${id}`);
}

export async function deleteStudent(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("students").delete().eq("id", id);
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function bulkAssignBatch(ids: string[], batchId: string) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase.from("students").update({ batch_id: batchId || null }).in("id", ids);
  revalidatePath("/admin/students");
}

export async function bulkSetActive(ids: string[], active: boolean) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase.from("students").update({ active }).in("id", ids);
  revalidatePath("/admin/students");
}

type RawRow = Record<string, string>;

// CSV import with duplicate detection (by student name + parent phone).
export async function importStudents(rows: RawRow[]) {
  const supabase = await createClient();

  const { data: existing } = await supabase.from("students").select("name, parent_whatsapp");
  const seen = new Set(
    (existing ?? []).map((e) => `${(e.name || "").toLowerCase().trim()}|${e.parent_whatsapp || ""}`),
  );
  const { data: batches } = await supabase.from("batches").select("id, name");
  const batchMap = new Map((batches ?? []).map((b) => [b.name.toLowerCase().trim(), b.id]));

  const toInsert: Record<string, unknown>[] = [];
  let skipped = 0;
  for (const r of rows) {
    const name = (r.name || "").trim();
    if (!name) {
      skipped++;
      continue;
    }
    const phone = (r.parent_whatsapp || "").replace(/\D/g, "");
    const key = `${name.toLowerCase()}|${phone}`;
    if (seen.has(key)) {
      skipped++;
      continue;
    }
    seen.add(key);
    const feeRaw = (r.default_monthly_fee || "").trim();
    toInsert.push({
      name,
      roll_number: (r.roll_number || "").trim() || null,
      parent_name: (r.parent_name || "").trim() || null,
      parent_whatsapp: phone || null,
      alternate_number: (r.alternate_number || "").replace(/\D/g, "") || null,
      class: (r.class || "").trim() || null,
      board: (r.board || "").trim() || null,
      school: (r.school || "").trim() || null,
      batch_id: r.batch ? batchMap.get((r.batch || "").toLowerCase().trim()) ?? null : null,
      admission_date: (r.admission_date || "").trim() || null,
      default_monthly_fee: feeRaw ? Number(feeRaw) : null,
      active: true,
      remarks: (r.remarks || "").trim() || null,
    });
  }

  let created = 0;
  if (toInsert.length) {
    const { error } = await supabase.from("students").insert(toInsert);
    if (!error) created = toInsert.length;
  }
  revalidatePath("/admin/students");
  return { created, skipped };
}
