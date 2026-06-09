import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function esc(v: unknown) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

type S = {
  name: string;
  class: string | null;
  board: string | null;
  school: string | null;
  parent_name: string | null;
  parent_whatsapp: string | null;
  admission_date: string | null;
  active: boolean;
  batches: { name: string } | null;
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data } = await supabase
    .from("students")
    .select(
      "name, class, board, school, parent_name, parent_whatsapp, admission_date, active, batches(name)",
    )
    .order("name");

  const head = [
    "Name",
    "Class",
    "Board",
    "School",
    "Parent",
    "Parent WhatsApp",
    "Batch",
    "Admission date",
    "Active",
  ];
  const rows = ((data ?? []) as unknown as S[]).map((s) => [
    s.name,
    s.class,
    s.board,
    s.school,
    s.parent_name,
    s.parent_whatsapp,
    s.batches?.name ?? "",
    s.admission_date,
    s.active ? "Yes" : "No",
  ]);

  const csv = [head, ...rows].map((r) => r.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="students.csv"',
    },
  });
}
