import { ImageIcon } from "lucide-react";
import { resolveImage, slotMeta } from "@/lib/site-images";

// Shows the uploaded image (admin Images) if set, else a /public file, else a
// labelled placeholder naming the shot and the exact path to drop the file.
export default async function SmartImage({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
}) {
  const url = await resolveImage(src);
  const size = slotMeta(src)?.size;
  return (
    <div className={`relative overflow-hidden bg-primary-tint/40 ${className ?? ""}`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
          <ImageIcon size={26} strokeWidth={1.5} className="text-primary" />
          <span className="text-xs font-medium text-primary-strong">{label}</span>
          {size && <span className="text-[11px] font-medium text-ink-muted">{size}</span>}
          <span className="text-[10px] text-ink-muted">{src}</span>
        </div>
      )}
    </div>
  );
}
