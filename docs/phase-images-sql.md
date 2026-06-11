# Admin image manager - SQL

Run in the Supabase SQL editor. Creates a public-read storage bucket, staff-only write policies,
and a slot -> image table so staff can change any site photo from the admin.

```sql
-- 1. Public-read bucket for site images
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- 2. Staff can upload / replace / delete in that bucket (public read needs no policy)
create policy "staff upload site-images" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and exists (select 1 from public.staff s where s.user_id = auth.uid()));
create policy "staff update site-images" on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and exists (select 1 from public.staff s where s.user_id = auth.uid()));
create policy "staff delete site-images" on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and exists (select 1 from public.staff s where s.user_id = auth.uid()));

-- 3. Slot -> stored path map (public read; staff write)
create table if not exists public.site_images (
  slot text primary key,
  path text not null,
  updated_at timestamptz default now()
);
alter table public.site_images enable row level security;
create policy "public read site_images" on public.site_images for select to anon, authenticated using (true);
create policy "staff write site_images" on public.site_images for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```
