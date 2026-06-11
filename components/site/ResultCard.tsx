import { storagePublicUrl } from "@/lib/site-images";
import type { ResultItem } from "@/lib/content";

export default function ResultCard({ r }: { r: ResultItem }) {
  const meta = [r.student_name, r.marks, r.class_course, r.school, r.year].filter(Boolean).join("  ·  ");
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-bg transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      {r.image_path && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={storagePublicUrl(r.image_path)}
          alt={r.title}
          className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <p className="font-heading font-semibold text-ink">{r.title}</p>
        {meta && <p className="mt-1 text-xs text-ink-muted">{meta}</p>}
        {r.description && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.description}</p>}
      </div>
    </div>
  );
}
