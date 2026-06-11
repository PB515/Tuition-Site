import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { publicExists } from "@/lib/images";

// Shows the real photo if a file exists at `src` under /public, otherwise a
// labelled placeholder that names the shot and the exact path to drop the file.
export default function SmartImage({
  src,
  alt,
  label,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
}) {
  const exists = publicExists(src);
  return (
    <div className={`relative overflow-hidden bg-primary-tint/40 ${className ?? ""}`}>
      {exists ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <ImageIcon size={26} strokeWidth={1.5} className="text-primary" />
          <span className="text-xs font-medium text-primary-strong">{label}</span>
          <span className="text-[10px] text-ink-muted">{src}</span>
        </div>
      )}
    </div>
  );
}
