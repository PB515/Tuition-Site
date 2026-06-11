import Link from "next/link";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deletePost, togglePostPublished } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog", robots: { index: false, follow: false } };

type Row = { id: string; title: string; slug: string; published: boolean; published_at: string | null };

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, published, published_at")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as Row[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Blog</h1>
          <p className="mt-1 text-sm text-ink-muted">Write and manage posts for the public blog.</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep">
          New post
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {posts.length === 0 ? (
          <p className="text-sm text-ink-muted">No posts yet. Click New post to write one.</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-bg p-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-xs text-ink-muted">/blog/{p.slug}{p.published_at ? `  ·  ${p.published_at}` : ""}</p>
              </div>
              <span
                className={
                  p.published
                    ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                    : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted"
                }
              >
                {p.published ? "Published" : "Draft"}
              </span>
              <form action={togglePostPublished}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="published" value={String(p.published)} />
                <button type="submit" className="text-sm font-medium text-ink-muted hover:text-ink">
                  {p.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <Link href={`/admin/blog/${p.id}/edit`} className="text-sm font-medium text-primary-strong hover:underline">
                Edit
              </Link>
              <form action={deletePost}>
                <input type="hidden" name="id" value={p.id} />
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
