# Phase 5 (Dashboard) - SQL

Adds `paid_at` so "Collected this month" is real. Run in the Supabase SQL editor.

```sql
alter table public.fees add column if not exists paid_at timestamptz;
-- approximate backfill for already-paid fees
update public.fees set paid_at = created_at where paid and paid_at is null;
```

Note: "Batches today" / "Attendance pending today" use each batch's **Class days**. Set them when
creating a batch (the day checkboxes) so the dashboard knows which batches run today.
