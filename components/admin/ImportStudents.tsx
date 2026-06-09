"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { importStudents } from "@/app/admin/students/actions";

function parseLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const headers = parseLine(lines[0]).map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = parseLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = (cells[i] ?? "").trim()));
    return obj;
  });
}

export default function ImportStudents() {
  const router = useRouter();
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<{ created: number; skipped: number } | null>(null);
  const [pending, start] = useTransition();

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setRows(parseCSV(String(reader.result || "")));
    reader.readAsText(file);
  }

  const valid = rows.filter((r) => (r.name || "").trim());

  function onImport() {
    if (!valid.length) return;
    start(async () => {
      const r = await importStudents(rows);
      setResult(r);
      setRows([]);
      setFileName("");
      router.refresh();
    });
  }

  return (
    <div className="mt-6 max-w-2xl space-y-4">
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={onFile}
        className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary-strong file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-deep"
      />
      {fileName && (
        <p className="text-sm text-ink-muted">
          {fileName}: <b className="text-ink">{valid.length}</b> row(s) with a name detected.
        </p>
      )}
      {valid.length > 0 && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={onImport}
            disabled={pending}
            className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
          >
            {pending ? "Importing..." : `Import ${valid.length} students`}
          </button>
          <p className="text-xs text-ink-muted">
            Duplicates (same name + parent phone) are skipped automatically.
          </p>
        </div>
      )}
      {result && (
        <p className="rounded-lg border border-border bg-surface p-3 text-sm font-medium text-primary-strong">
          Imported {result.created}, skipped {result.skipped} (duplicates or no name).
        </p>
      )}
    </div>
  );
}
