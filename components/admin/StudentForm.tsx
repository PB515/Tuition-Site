import { ENQUIRY_CLASSES } from "@/lib/site";

type Batch = { id: string; name: string };

export type StudentValues = {
  id?: string;
  name?: string;
  roll_number?: string | null;
  parent_name?: string | null;
  parent_whatsapp?: string | null;
  alternate_number?: string | null;
  class?: string | null;
  board?: string | null;
  school?: string | null;
  batch_id?: string | null;
  admission_date?: string | null;
  default_monthly_fee?: number | null;
  annual_fee?: number | null;
  active?: boolean;
  remarks?: string | null;
};

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const BOARDS = ["CBSE", "GSEB", "Other"];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-ink">{children}</span>;
}

export default function StudentForm({
  batches,
  student,
  action,
  submitLabel,
  showSaveOptions = false,
}: {
  batches: Batch[];
  student?: StudentValues;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  showSaveOptions?: boolean;
}) {
  const s = student ?? {};
  return (
    <form action={action} className="mt-6 max-w-2xl space-y-4">
      {s.id && <input type="hidden" name="id" value={s.id} />}

      <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
        <label className="block">
          <Label>Roll / admission no.</Label>
          <input name="roll_number" defaultValue={s.roll_number ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <Label>Student name</Label>
          <input name="name" required defaultValue={s.name ?? ""} className={`mt-1 ${field}`} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <Label>Parent name</Label>
          <input name="parent_name" defaultValue={s.parent_name ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <Label>Parent WhatsApp</Label>
          <input
            name="parent_whatsapp"
            inputMode="tel"
            defaultValue={s.parent_whatsapp ?? ""}
            className={`mt-1 ${field}`}
          />
        </label>
        <label className="block">
          <Label>Alternate number</Label>
          <input
            name="alternate_number"
            inputMode="tel"
            defaultValue={s.alternate_number ?? ""}
            className={`mt-1 ${field}`}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <Label>Class</Label>
          <select name="class" defaultValue={s.class ?? ""} className={`mt-1 ${field}`}>
            <option value="">-</option>
            {ENQUIRY_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <Label>Board</Label>
          <select name="board" defaultValue={s.board ?? ""} className={`mt-1 ${field}`}>
            <option value="">-</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <Label>Batch</Label>
          <select name="batch_id" defaultValue={s.batch_id ?? ""} className={`mt-1 ${field}`}>
            <option value="">-</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <Label>School</Label>
          <input name="school" defaultValue={s.school ?? ""} className={`mt-1 ${field}`} />
        </label>
        <label className="block">
          <Label>Admission date</Label>
          <input
            name="admission_date"
            type="date"
            defaultValue={s.admission_date ?? ""}
            className={`mt-1 ${field}`}
          />
        </label>
        <label className="block">
          <Label>Annual fee (Rs)</Label>
          <input
            name="annual_fee"
            type="number"
            min="0"
            defaultValue={s.annual_fee ?? ""}
            className={`mt-1 ${field}`}
          />
        </label>
      </div>

      <label className="block">
        <Label>Remarks</Label>
        <textarea name="remarks" rows={2} defaultValue={s.remarks ?? ""} className={`mt-1 ${field}`} />
      </label>

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          name="active"
          defaultChecked={s.active ?? true}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        Active student
      </label>

      {showSaveOptions ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            name="intent"
            value="save"
            className="rounded-full bg-primary-strong px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Save
          </button>
          <button
            type="submit"
            name="intent"
            value="another"
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            Save & add another
          </button>
          <button
            type="submit"
            name="intent"
            value="profile"
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            Save & open profile
          </button>
          <button
            type="submit"
            name="intent"
            value="fee"
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            Save & add fee
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          {submitLabel}
        </button>
      )}
    </form>
  );
}
