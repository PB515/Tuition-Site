import { IMAGE_SLOTS, resolveImage } from "@/lib/site-images";
import SlotUploader from "@/components/admin/SlotUploader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Images", robots: { index: false, follow: false } };

export default async function Page() {
  const slots = await Promise.all(
    IMAGE_SLOTS.map(async (s) => ({ ...s, url: await resolveImage(s.src) })),
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Images</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Replace any photo on the public site. Upload and the change goes live immediately - no code or
        git needed.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((s) => (
          <SlotUploader key={s.slot} slot={s.slot} label={s.label} currentUrl={s.url} ratio={s.ratio} size={s.size} />
        ))}
      </div>
    </div>
  );
}
