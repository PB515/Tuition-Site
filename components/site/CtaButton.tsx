import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

// Branded CTA. Pill shape (shape lock). Primary teal passes WCAG AA on white text.
export default function CtaButton({
  href,
  children,
  variant = "primary",
  external,
  className,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-primary text-white shadow-sm hover:bg-primary-strong"
      : "border border-primary text-primary-strong hover:bg-primary-tint";
  const cls = cn(base, styles, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
