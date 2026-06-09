"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createFee } from "@/app/admin/fees/actions";

type Batch = { id: string; name: string };
type Student = { id: string; name: string };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

// Single-student fee: pick batch, then the student dropdown is scoped to that
// batch (~40 names), so it works at 1000 students. Reads students client-side
// via the logged-in staff session (RLS still applies).
export default function AddFeeForm({ batches }: { batches: Batch[] }) {
  const [batchId, setBatchId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!batchId) {
      setStudents([]);
      return;
    }
    let active = true;
    setLoading(true);
    createClient()
      .from("students")
      .select("id, name")
      .eq("batch_id", batchId)
      .eq("active", true)
      .order("name")
      .then(({ data }) => {
        if (active) {
          setStudents((data ?? []) as Student[]);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [batchId]);

  return (
    <form action={createFee} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] sm:items-end">
      <label className="block text-sm">
        <span className="font-medium text-ink">Batch</span>
        <select
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className={`mt-1 ${field}`}
        >
          <option value="">Select batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Student</span>
        <select name="student_id" required disabled={!batchId} className={`mt-1 ${field}`}>
          <option value="">
            {loading ? "Loading..." : batchId ? "Select student" : "Pick a batch first"}
          </option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Month</span>
        <input name="month" className={`mt-1 ${field}`} placeholder="June 2026" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Amount (Rs)</span>
        <input name="amount" type="number" min="0" className={`mt-1 ${field}`} />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Due date</span>
        <input name="due_date" type="date" className={`mt-1 ${field}`} />
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
      >
        Add fee
      </button>
    </form>
  );
}
