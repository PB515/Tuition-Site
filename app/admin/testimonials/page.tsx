import Link from "next/link";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { storagePublicUrl } from "@/lib/site-images";
import TestimonialForm from "@/components/admin/TestimonialForm";
import DeleteAllButton from "@/components/admin/DeleteAllButton";
import { createTestimonial, deleteTestimonial, toggleTestimonialPublished, deleteAllTestimonials } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Testimonials", robots: { index: false, follow: false } };

type Row = {
  id: string;
  quote: string | null;
  author_name: string | null;
  author_detail: string | null;
  image_path: string | null;
  published: boolean;
};

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, quote, author_name, author_detail, image_path, published")
    .order("sort_order")
    .order("created_at", { ascending: false });
  const items = (data ?? []) as Row[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Testimonials</h1>
          <p className="mt-1 text-sm text-ink-muted">Shown on the Results page and featured on the homepage.</p>
        </div>
        {items.length > 0 && <DeleteAllButton action={deleteAllTestimonials} count={items.length} noun="testimonials" />}
      </div>

      <details className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary-strong">+ Add a testimonial</summary>
        <div className="mt-4">
          <TestimonialForm action={createTestimonial} submitLabel="Add testimonial" />
        </div>
      </details>

      <div className="mt-6 grid gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-ink-muted">No testimonials yet. Add one above.</p>
        ) : (
          items.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-bg p-3">
              {t.image_path ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storagePublicUrl(t.image_path)} alt="" className="h-16 w-16 rounded-lg border border-border object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-surface text-[10px] text-ink-muted">
                  Text
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm text-ink">{t.quote ?? "(screenshot only)"}</p>
                <p className="text-xs text-ink-muted">
                  {[t.author_name, t.author_detail].filter(Boolean).join("  ·  ") || "-"}
                </p>
              </div>
              <span
                className={
                  t.published
                    ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                    : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted"
                }
              >
                {t.published ? "Published" : "Draft"}
              </span>
              <form action={toggleTestimonialPublished}>
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="published" value={String(t.published)} />
                <button type="submit" className="text-sm font-medium text-ink-muted hover:text-ink">
                  {t.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <Link href={`/admin/testimonials/${t.id}/edit`} className="text-sm font-medium text-primary-strong hover:underline">
                Edit
              </Link>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
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
