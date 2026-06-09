import type { Metadata } from "next";
import UpdatePasswordForm from "@/components/parent/UpdatePasswordForm";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Reset your password</h1>
      <p className="mt-2 text-sm text-ink-muted">Choose a new password for your account.</p>
      <div className="mt-6">
        <UpdatePasswordForm />
      </div>
    </main>
  );
}
