import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Staff Login",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">
        Inspire Academy staff login
      </h1>
      <p className="mt-2 text-sm text-ink-muted">Sign in to manage enquiries.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-ink-muted">
        Parent?{" "}
        <Link href="/parent/login" className="font-medium text-primary-strong hover:underline">
          Use the parent login
        </Link>
      </p>
      <Link
        href="/"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Back to website
      </Link>
    </main>
  );
}
