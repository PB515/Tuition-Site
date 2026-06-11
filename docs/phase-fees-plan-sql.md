# Fees installment plan - SQL

One column: the per-student annual fee (used as the default total when generating a plan).

```sql
alter table public.students add column if not exists annual_fee integer;
```
