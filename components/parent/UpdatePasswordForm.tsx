"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputBase =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setPending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("This link has expired. Please ask the academy for a new one.");
      setPending(false);
      return;
    }
    router.push("/parent");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          New password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`mt-1.5 ${inputBase}`}
        />
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save password"}
      </button>
    </form>
  );
}
