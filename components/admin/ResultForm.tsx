import { storagePublicUrl } from "@/lib/site-images";

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export type ResultValues = {
  id?: string;
  title?: string;
  description?: string | null;
  student_name?: string | null;
  marks?: string | null;
  class_course?: string | null;
  school?: string | null;
  year?: string | null;
  image_path?: string | null;
  published?: boolean;
  sort_order?: number;
};

function L({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-ink">{children}</span>;
}

export default function ResultForm({
  result,
  action,
  submitLabel,
}: {
  result?: ResultValues;
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const r = result ?? {};
  return (
    <form action={action} className="max-w-2xl space-y-4">
      {r.id && <input type="hidden" name="id" value={r.id} />}

      <label className="block">
        <L>Title</L>
        <input name="title" required defaultValue={r.title ?? ""} placeholder="e.g. 97/100 in Applied Maths" className={`mt-1 ${field}`} />
      </label>
      <label className="block">
        <L>Description</L>
        <textarea name="description" rows={2} defaultValue={r.description ?? ""} className={`mt-1 ${field}`} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <L>Student name (optional)</L>
          <input name="student_name" defaultValue={r.student_name ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>Marks (optional)</L>
          <input name="marks" defaultValue={r.marks ?? ""} placeholder="97/100" className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>Class / course (optional)</L>
          <input name="class_course" defaultValue={r.class_course ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>School (optional)</L>
          <input name="school" defaultValue={r.school ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>Year (optional)</L>
          <input name="year" defaultValue={r.year ?? ""} placeholder="2026" className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <L>Sort order</L>
          <input name="sort_order" type="number" defaultValue={r.sort_order ?? 0} className={`mt-1 ${field}`} />
        </label>
      </div>

      <div>
        <L>Image</L>
        {r.image_path && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={storagePublicUrl(r.image_path)} alt="" className="mt-1 h-32 w-auto rounded-lg border border-border object-cover" />
        )}
        <input name="file" type="file" accept="image/*" className="mt-1 block w-full text-sm text-ink-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-strong file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
        <p className="mt-1 text-xs text-ink-muted">Leave empty to keep the current image.</p>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={r.published ?? true} className="h-4 w-4 rounded border-border text-primary" />
        Published (visible on the site)
      </label>

      <button type="submit" className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep">
        {submitLabel}
      </button>
    </form>
  );
}
