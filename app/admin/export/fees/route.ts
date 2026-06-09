import { createClient } from "@/lib/supabase/server";

type Row = {
  month: string | null;
  amount: number | null;
  paid: boolean;
  due_date: string | null;
  reminded_at: string | null;
  students: { name: string; parent_whatsapp: string | null; batches: { name: string } | null } | null;
};

function esc(v: unknown) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { data: staffRow } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!staffRow) return new Response("Forbidden", { status: 403 });

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") ?? "";
  const batch = searchParams.get("batch") ?? "";
  const status = searchParams.get("status") ?? "pending";
  const today = new Date().toISOString().slice(0, 10);

  let query = supabase
    .from("fees")
    .select("month, amount, paid, due_date, reminded_at, students!inner(name, parent_whatsapp, batches(name))");
  if (month) query = query.eq("month", month);
  if (batch) query = query.eq("batch_id", batch);
  if (status === "paid") query = query.eq("paid", true);
  else if (status === "overdue") query = query.eq("paid", false).lt("due_date", today);
  else query = query.eq("paid", false);

  const { data } = await query.order("created_at", { ascending: false });
  const rows = (data ?? []) as unknown as Row[];

  const header = ["Student", "Batch", "Parent WhatsApp", "Month", "Amount", "Due date", "Status", "Reminded"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.students?.name,
        r.students?.batches?.name,
        r.students?.parent_whatsapp,
        r.month,
        r.amount,
        r.due_date,
        r.paid ? "Paid" : r.due_date && r.due_date < today ? "Overdue" : "Pending",
        r.reminded_at ? "Yes" : "",
      ]
        .map(esc)
        .join(","),
    );
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fees-${status || "all"}.csv"`,
    },
  });
}
