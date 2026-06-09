import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "All marks", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;

type MarkRow = {
  marks_obtained: number | null;
  remark: string | null;
  tests: { name: string; date: string | null; total_marks: number | null } | null;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Cross-user denial: the child must be linked to this parent.
  const { data: link } = await supabase
    .from("parents")
    .select("student_id")
    .eq("user_id", user?.id ?? "")
    .eq("student_id", id)
    .maybeSingle();
  if (!link) notFound();

  const { data: student } = await supabase.from("students").select("name").eq("id", id).single();
  if (!student) notFound();

  const { data, count } = await supabase
    .from("marks")
    .select("marks_obtained, remark, tests(name, date, total_marks)", { count: "exact" })
    .eq("student_id", id)
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const marks = (data ?? []) as unknown as MarkRow[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hrefFor = (p: number) =>
    p > 1 ? `/parent/child/${id}/marks?page=${p}` : `/parent/child/${id}/marks`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/parent/child/${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Back
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">All marks</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {student.name}
        {" · "}
        {total === 0 ? "no marks yet" : `${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {marks.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Test</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Marks</th>
                <th className="px-4 py-3 font-semibold">Focus area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marks.map((m, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium text-ink">{m.tests?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{m.tests?.date ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {m.marks_obtained != null
                      ? `${m.marks_obtained}${m.tests?.total_marks != null ? `/${m.tests.total_marks}` : ""}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{m.remark ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={hrefFor(page - 1)} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={hrefFor(page + 1)} className="font-medium text-primary-strong hover:underline">
              Next
            </Link>
          ) : (
            <span className="text-ink-muted">Next</span>
          )}
        </div>
      )}
    </main>
  );
}
