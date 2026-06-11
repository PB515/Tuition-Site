import { storagePublicUrl } from "@/lib/site-images";

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export type TestimonialValues = {
  id?: string;
  quote?: string | null;
  author_name?: string | null;
  author_detail?: string | null;
  image_path?: string | null;
  published?: boolean;
  sort_order?: number;
};

function L({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-ink">{children}</span>;
}

export default function TestimonialForm({
  testimonial,
  action,
  submitLabel,
}: {
  testimonial?: TestimonialValues;
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const t = testimonial ?? {};
  return (
    <form action={action} className="max-w-2xl space-y-4">
      {t.id && <input type="hidden" name="id" value={t.id} />}

      <label className="block">
        <L>Quote (text testimonial)</L>
        <textarea name="quote" rows={3} defaultValue={t.quote ?? ""} placeholder="What the student or parent said..." className={`mt-1 ${field}`} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <L>Author name (optional)</L>
          <input name="author_name" defaultValue={t.author_name ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>Author detail (optional)</L>
          <input name="author_detail" defaultValue={t.author_detail ?? ""} placeholder="Parent of Class 10 student" className={`mt-1 ${field}`} />
        </label>
      </div>

      <div>
        <L>Screenshot / photo (optional)</L>
        {t.image_path && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={storagePublicUrl(t.image_path)} alt="" className="mt-1 h-32 w-auto rounded-lg border border-border object-cover" />
        )}
        <input name="file" type="file" accept="image/*" className="mt-1 block w-full text-sm text-ink-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-strong file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
        <p className="mt-1 text-xs text-ink-muted">A WhatsApp/Google review screenshot works well. Add a quote, an image, or both.</p>
      </div>

      <label className="block max-w-[12rem]">
        <L>Sort order</L>
        <input name="sort_order" type="number" defaultValue={t.sort_order ?? 0} className={`mt-1 ${field}`} />
      </label>

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={t.published ?? true} className="h-4 w-4 rounded border-border text-primary" />
        Published (visible on the site)
      </label>

      <button type="submit" className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep">
        {submitLabel}
      </button>
    </form>
  );
}
