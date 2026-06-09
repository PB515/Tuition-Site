import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function esc(v: unknown) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

type L = {
  created_at: string;
  name: string;
  phone: string;
  student_class: string | null;
  school: string | null;
  message: string | null;
  source: string | null;
  status: string | null;
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data } = await supabase
    .from("leads")
    .select("created_at, name, phone, student_class, school, message, source, status")
    .order("created_at", { ascending: false });

  const head = ["Created", "Name", "Phone", "Class", "School", "Message", "Source", "Status"];
  const rows = ((data ?? []) as unknown as L[]).map((l) => [
    l.created_at,
    l.name,
    l.phone,
    l.student_class,
    l.school,
    l.message,
    l.source,
    l.status,
  ]);

  const csv = [head, ...rows].map((r) => r.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads.csv"',
    },
  });
}
