"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputBase =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Wrong email or password.");
      setPending(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1.5 ${inputBase}`}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
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
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
