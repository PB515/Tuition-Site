import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { academicYearRange } from "@/lib/academic-year";

// Year-end archive: download one academic year's data as CSV to keep on a PC
// (research / backup). The live data stays in Supabase; this is a copy, not a move.

function esc(v: unknown) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function toCsv(head: string[], rows: unknown[][]) {
  return [head, ...rows].map((r) => r.map(esc).join(",")).join("\n");
}

type StudentJoin = { admission_no: string | null; name: string; roll_number: string | null } | null;

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const dataset = req.nextUrl.searchParams.get("dataset") ?? "";
  const year = req.nextUrl.searchParams.get("year") ?? "";
  const validYear = /^\d{4}-\d{4}$/.test(year);
  const range = validYear ? academicYearRange(year) : null;

  let head: string[] = [];
  let rows: unknown[][] = [];
  let filename = `${dataset}-${year || "all"}.csv`;

  if (dataset === "students") {
    const { data } = await supabase
      .from("students")
      .select(
        "admission_no, roll_number, name, class, board, school, parent_name, parent_whatsapp, admission_date, active, batches(name)",
      )
      .order("name");
    type Row = {
      admission_no: string | null;
      roll_number: string | null;
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
    head = ["Admission no", "Roll", "Name", "Class", "Board", "School", "Parent", "Parent WhatsApp", "Batch", "Admission date", "Active"];
    rows = ((data ?? []) as unknown as Row[]).map((s) => [
      s.admission_no, s.roll_number, s.name, s.class, s.board, s.school,
      s.parent_name, s.parent_whatsapp, s.batches?.name ?? "", s.admission_date, s.active ? "Yes" : "No",
    ]);
    filename = "students-roster.csv";
  } else if (dataset === "attendance" && range) {
    const { data } = await supabase
      .from("attendance")
      .select("date, status, students(admission_no, name, roll_number)")
      .gte("date", range.from)
      .lte("date", range.to)
      .order("date");
    type Row = { date: string | null; status: string | null; students: StudentJoin };
    head = ["Date", "Admission no", "Student", "Roll", "Status"];
    rows = ((data ?? []) as unknown as Row[]).map((a) => [
      a.date, a.students?.admission_no ?? "", a.students?.name ?? "", a.students?.roll_number ?? "", a.status,
    ]);
  } else if (dataset === "marks" && range) {
    const { data: tests } = await supabase
      .from("tests")
      .select("id")
      .gte("date", range.from)
      .lte("date", range.to);
    const testIds = (tests ?? []).map((t) => (t as { id: string }).id);
    type Row = {
      marks_obtained: number | null;
      status: string | null;
      remark: string | null;
      students: StudentJoin;
      tests: { name: string; date: string | null; total_marks: number | null } | null;
    };
    let data: Row[] = [];
    if (testIds.length) {
      const res = await supabase
        .from("marks")
        .select("marks_obtained, status, remark, students(admission_no, name, roll_number), tests(name, date, total_marks)")
        .in("test_id", testIds);
      data = (res.data ?? []) as unknown as Row[];
    }
    head = ["Test date", "Test", "Admission no", "Student", "Roll", "Marks", "Total", "Status", "Remark"];
    rows = data.map((m) => [
      m.tests?.date ?? "", m.tests?.name ?? "", m.students?.admission_no ?? "", m.students?.name ?? "",
      m.students?.roll_number ?? "", m.marks_obtained, m.tests?.total_marks ?? "", m.status, m.remark,
    ]);
  } else if (dataset === "fees" && range) {
    const { data } = await supabase
      .from("fees")
      .select("month, amount, paid, due_date, paid_at, students(admission_no, name, roll_number)")
      .gte("due_date", range.from)
      .lte("due_date", range.to)
      .order("due_date");
    type Row = {
      month: string | null;
      amount: number | null;
      paid: boolean;
      due_date: string | null;
      paid_at: string | null;
      students: StudentJoin;
    };
    head = ["Admission no", "Student", "Roll", "Month", "Amount", "Due date", "Paid", "Paid at"];
    rows = ((data ?? []) as unknown as Row[]).map((f) => [
      f.students?.admission_no ?? "", f.students?.name ?? "", f.students?.roll_number ?? "",
      f.month, f.amount, f.due_date, f.paid ? "Yes" : "No", f.paid_at ?? "",
    ]);
  } else {
    return new NextResponse("Pick a dataset and a valid year.", { status: 400 });
  }

  return new NextResponse(toCsv(head, rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
