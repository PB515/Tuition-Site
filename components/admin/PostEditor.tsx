"use client";

import { useState, useTransition } from "react";
import { ImagePlus } from "lucide-react";
import MarkdownView from "@/components/site/MarkdownView";
import { storagePublicUrl } from "@/lib/storage";
import { uploadPostImage } from "@/app/admin/blog/actions";

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type PostValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  body?: string;
  cover_path?: string | null;
  published?: boolean;
  published_at?: string | null;
};

export default function PostEditor({
  post,
  action,
  submitLabel,
}: {
  post?: PostValues;
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [body, setBody] = useState(post?.body ?? "");
  const [uploading, startUpload] = useTransition();

  const shownSlug = slugTouched ? slug : slugify(title);

  function onInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    startUpload(async () => {
      const r = await uploadPostImage(fd);
      if (r?.url) setBody((b) => `${b}${b === "" || b.endsWith("\n") ? "" : "\n\n"}![image](${r.url})\n`);
    });
    e.target.value = "";
  }

  return (
    <form action={action} className="space-y-5">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-ink">Title</span>
          <input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Slug (web address)</span>
          <input
            name="slug"
            value={shownSlug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className={`mt-1 ${field}`}
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-ink">Excerpt (short summary)</span>
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className={`mt-1 ${field}`} />
      </label>

      <div>
        <span className="text-sm font-medium text-ink">Cover image</span>
        {post?.cover_path && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={storagePublicUrl(post.cover_path)} alt="" className="mt-1 h-32 w-auto rounded-lg border border-border object-cover" />
        )}
        <input name="cover" type="file" accept="image/*" className="mt-1 block w-full text-sm text-ink-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-strong file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
        <p className="mt-1 text-xs text-ink-muted">Recommended ~1600 x 900 px. Leave empty to keep the current one.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Content (markdown)</span>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-muted hover:text-ink">
              <ImagePlus size={13} strokeWidth={2} /> {uploading ? "Uploading..." : "Insert image"}
              <input type="file" accept="image/*" onChange={onInsertImage} className="hidden" />
            </label>
          </div>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={20}
            placeholder={"# Heading\n\nWrite your post in markdown. **Bold**, *italic*, lists, [links](https://...), and images."}
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 font-mono text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <span className="text-sm font-medium text-ink">Preview</span>
          <div className="mt-1 min-h-[200px] rounded-2xl border border-border bg-bg p-4">
            {body.trim() ? <MarkdownView>{body}</MarkdownView> : <p className="text-sm text-ink-muted">Preview appears here as you type.</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2.5 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="h-4 w-4 rounded border-border text-primary" />
          Published (visible on the site)
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Date</span>
          <input name="published_at" type="date" defaultValue={post?.published_at ?? ""} className={`mt-1 ${field}`} />
        </label>
      </div>

      <button type="submit" className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep">
        {submitLabel}
      </button>
    </form>
  );
}
