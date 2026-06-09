import type { Metadata } from "next";
import Link from "next/link";
import ForgotForm from "@/components/parent/ForgotForm";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Forgot password</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Enter your email and we will send a reset link.
      </p>
      <div className="mt-6">
        <ForgotForm />
      </div>
      <p className="mt-6 text-center text-sm text-ink-muted">
        <Link href="/parent/login" className="font-medium text-primary-strong hover:underline">
          Back to login
        </Link>
      </p>
    </main>
  );
}
