import Link from "next/link";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { storagePublicUrl } from "@/lib/site-images";
import ResultForm from "@/components/admin/ResultForm";
import { createResult, deleteResult, toggleResultPublished } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Results", robots: { index: false, follow: false } };

type Row = {
  id: string;
  title: string;
  marks: string | null;
  class_course: string | null;
  school: string | null;
  year: string | null;
  image_path: string | null;
  published: boolean;
};

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("results")
    .select("id, title, marks, class_course, school, year, image_path, published")
    .order("sort_order")
    .order("created_at", { ascending: false });
  const results = (data ?? []) as Row[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Results</h1>
      <p className="mt-1 text-sm text-ink-muted">These appear on the public Results page, newest first.</p>

      <details className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary-strong">+ Add a result</summary>
        <div className="mt-4">
          <ResultForm action={createResult} submitLabel="Add result" />
        </div>
      </details>

      <div className="mt-6 grid gap-3">
        {results.length === 0 ? (
          <p className="text-sm text-ink-muted">No results yet. Add one above.</p>
        ) : (
          results.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-bg p-3">
              {r.image_path ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storagePublicUrl(r.image_path)} alt="" className="h-16 w-16 rounded-lg border border-border object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-surface text-[10px] text-ink-muted">
                  No image
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{r.title}</p>
                <p className="text-xs text-ink-muted">
                  {[r.marks, r.class_course, r.school, r.year].filter(Boolean).join("  ·  ") || "-"}
                </p>
              </div>
              <span
                className={
                  r.published
                    ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                    : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted"
                }
              >
                {r.published ? "Published" : "Draft"}
              </span>
              <form action={toggleResultPublished}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="published" value={String(r.published)} />
                <button type="submit" className="text-sm font-medium text-ink-muted hover:text-ink">
                  {r.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <Link href={`/admin/results/${r.id}/edit`} className="text-sm font-medium text-primary-strong hover:underline">
                Edit
              </Link>
              <form action={deleteResult}>
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" title="Delete" className="text-ink-muted hover:text-error">
                  <Trash2 size={15} strokeWidth={1.75} />
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
