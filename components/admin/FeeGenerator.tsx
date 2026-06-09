"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { previewFees, generateFees } from "@/app/admin/fees/actions";

type Batch = { id: string; name: string };
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Preview = { totalActive: number; alreadyGenerated: number; toCreate: number };

export default function FeeGenerator({ batches }: { batches: Batch[] }) {
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [batchId, setBatchId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function clearPreview() {
    setPreview(null);
    setResult(null);
  }

  function onPreview() {
    if (!month || !batchId) return;
    setResult(null);
    start(async () => setPreview(await previewFees(month, batchId)));
  }

  function onGenerate() {
    if (!preview || preview.toCreate === 0) return;
    start(async () => {
      const r = await generateFees(month, batchId, amount ? Number(amount) : null, dueDate || null);
      setResult(`Created ${r.created} fee record(s).`);
      setPreview(null);
      router.refresh();
    });
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-sm font-semibold text-ink">Generate monthly fees for a batch</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        <label className="block text-sm">
          <span className="font-medium text-ink">Month</span>
          <input
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              clearPreview();
            }}
            placeholder="June 2026"
            className={`mt-1 ${field}`}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Batch</span>
          <select
            value={batchId}
            onChange={(e) => {
              setBatchId(e.target.value);
              clearPreview();
            }}
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
          <span className="font-medium text-ink">Amount (Rs)</span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`mt-1 ${field}`}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`mt-1 ${field}`}
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onPreview}
          disabled={pending || !month || !batchId}
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint disabled:opacity-50"
        >
          {pending && !preview ? "Checking..." : "Preview"}
        </button>

        {preview && (
          <>
            <span className="text-sm text-ink-muted">
              Active: {preview.totalActive} &nbsp;|&nbsp; Already generated: {preview.alreadyGenerated}{" "}
              &nbsp;|&nbsp; New to create: <b className="text-ink">{preview.toCreate}</b>
            </span>
            <button
              type="button"
              onClick={onGenerate}
              disabled={pending || preview.toCreate === 0}
              className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-50"
            >
              Generate {preview.toCreate}
            </button>
          </>
        )}
        {result && <span className="text-sm font-medium text-primary-strong">{result}</span>}
      </div>
    </section>
  );
}
