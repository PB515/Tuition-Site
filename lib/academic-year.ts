// Academic year helpers. We treat the Indian academic year as April -> March:
// April 2026 to March 2027 is "2026-2027". A batch created in June 2026 belongs to
// "2026-2027". Used to separate live (this year) from old (past years) data.

export function academicYearOf(date: Date | string | null | undefined): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const startYear = d.getMonth() >= 3 ? y : y - 1; // month index 3 = April
  return `${startYear}-${startYear + 1}`;
}

export function currentAcademicYear(): string {
  return academicYearOf(new Date())!;
}

// The date span [from, to] for an academic year string like "2026-2027".
export function academicYearRange(ay: string): { from: string; to: string } {
  const start = Number(ay.split("-")[0]);
  return { from: `${start}-04-01`, to: `${start + 1}-03-31` };
}

// Derive a fee's academic year. Fees carry a due_date (date) and a free-text month
// ("June 2026"); fall back through them, then created_at.
export function feeAcademicYear(fee: {
  due_date?: string | null;
  month?: string | null;
  created_at?: string | null;
}): string | null {
  if (fee.due_date) return academicYearOf(fee.due_date);
  if (fee.month) {
    const parsed = new Date(`1 ${fee.month}`); // "1 June 2026"
    const ay = academicYearOf(parsed);
    if (ay) return ay;
  }
  return academicYearOf(fee.created_at ?? null);
}
