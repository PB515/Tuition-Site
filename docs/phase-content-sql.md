# Results + Testimonials collections - SQL

Run in the Supabase SQL editor. Public reads only published rows; staff manage everything.
Images reuse the existing `site-images` bucket (results/ and testimonials/ folders).

```sql
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  student_name text,
  marks text,
  class_course text,
  school text,
  year text,
  image_path text,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table public.results enable row level security;
create policy "public read published results" on public.results for select to anon, authenticated using (published = true);
create policy "staff all results" on public.results for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text,
  author_name text,
  author_detail text,
  image_path text,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table public.testimonials enable row level security;
create policy "public read published testimonials" on public.testimonials for select to anon, authenticated using (published = true);
create policy "staff all testimonials" on public.testimonials for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```
