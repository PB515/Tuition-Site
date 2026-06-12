import type { Metadata } from "next";
import ParentLoginForm from "@/components/parent/ParentLoginForm";
import WebsiteLink from "@/components/parent/WebsiteLink";

export const metadata: Metadata = { title: "Parent login", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Parent login</h1>
      <p className="mt-2 text-sm text-ink-muted">Inspire Academy of Mathematics</p>
      <div className="mt-6">
        <ParentLoginForm />
      </div>
      <div className="mt-6">
        <WebsiteLink />
      </div>
    </main>
  );
}
