# Phase 3 setup - parent portal (auth + RLS)

## 1. SQL - parents link table + parent read-only RLS (run in Supabase)

A parent reads ONLY their own child's data. Staff policies are unchanged; these ADD
parent read access scoped to the parent's linked students.

```sql
-- maps a parent's login (auth user) to their child(ren)
create table if not exists public.parents (
  user_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, student_id)
);
alter table public.parents enable row level security;

create policy "staff all parents" on public.parents for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

create policy "parent read own links" on public.parents for select to authenticated
  using (user_id = auth.uid());

-- parent can read ONLY their child rows
create policy "parent read own students" on public.students for select to authenticated
  using (exists (select 1 from public.parents p
                 where p.user_id = auth.uid() and p.student_id = students.id));

create policy "parent read own batch" on public.batches for select to authenticated
  using (exists (select 1 from public.parents p join public.students s on s.id = p.student_id
                 where p.user_id = auth.uid() and s.batch_id = batches.id));

create policy "parent read own attendance" on public.attendance for select to authenticated
  using (exists (select 1 from public.parents p
                 where p.user_id = auth.uid() and p.student_id = attendance.student_id));

create policy "parent read own marks" on public.marks for select to authenticated
  using (exists (select 1 from public.parents p
                 where p.user_id = auth.uid() and p.student_id = marks.student_id));

create policy "parent read tests" on public.tests for select to authenticated
  using (exists (select 1 from public.parents p join public.students s on s.id = p.student_id
                 where p.user_id = auth.uid() and s.batch_id = tests.batch_id));

create policy "parent read own fees" on public.fees for select to authenticated
  using (exists (select 1 from public.parents p
                 where p.user_id = auth.uid() and p.student_id = fees.student_id));
```

## 2. Auth -> URL Configuration (Supabase)
Add to the **Redirect URLs** allowlist:
- `http://localhost:3000/**`
- `https://<your-production-host>/**`

## 3. (For self-serve email reset) Email template
Auth -> Email Templates -> **Reset Password**, set the link to:
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/parent/reset
```
(Email reset also needs custom SMTP + a verified Resend domain to reach parents. The
staff "Send reset link" over WhatsApp works without any of that.)

## 4. To test before the invite UI exists
Create a parent test account: Authentication -> Users -> Add user (email + password, Auto
Confirm). Copy its UID, then link it to a student:
```sql
insert into public.parents (user_id, student_id) values ('PARENT-UID', 'STUDENT-ID');
```
Then log in at `/parent/login`.
