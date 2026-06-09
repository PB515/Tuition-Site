# Admin redesign - schema additions

All additive and safe (columns + indexes; nothing dropped). Run once in the Supabase SQL editor.
The fees `unique (student_id, month)` constraint is added later in the Fees phase (after the
preview/dedupe logic exists), to avoid breaking current fee rows.

```sql
-- Students: new fields
alter table public.students add column if not exists roll_number text;
alter table public.students add column if not exists default_monthly_fee integer;
alter table public.students add column if not exists alternate_number text;

-- Batches: schedule + capacity
alter table public.batches add column if not exists days text;
alter table public.batches add column if not exists capacity integer;

-- Attendance: batch link (denormalized for batch reports) + notified timestamp
alter table public.attendance add column if not exists batch_id uuid references public.batches(id) on delete set null;
alter table public.attendance add column if not exists notified_at timestamptz;

-- Marks: status (appeared / absent / not_submitted)
alter table public.marks add column if not exists status text;

-- Fees: batch link (fast batch filtering) + reminder timestamp
alter table public.fees add column if not exists batch_id uuid references public.batches(id) on delete set null;
alter table public.fees add column if not exists reminded_at timestamptz;

-- Indexes
create index if not exists idx_students_parent_whatsapp on public.students(parent_whatsapp);
create index if not exists idx_students_roll on public.students(roll_number);
create index if not exists idx_attendance_batch_date on public.attendance(batch_id, date);
create index if not exists idx_attendance_status on public.attendance(status);
create index if not exists idx_fees_batch_month on public.fees(batch_id, month);
create index if not exists idx_fees_due on public.fees(due_date);
create index if not exists idx_fees_month_paid on public.fees(month, paid);
create index if not exists idx_leads_phone on public.leads(phone);
```
