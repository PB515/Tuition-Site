-- Homepage "Results that speak" highlight block.
-- Run once in the Supabase SQL editor. Until this runs, the homepage shows the
-- built-in default (97 / Chirayu Jani); after it runs, edit it in admin -> Results.

create table if not exists public.results_highlight (
  id          smallint primary key default 1,
  score       text not null default '97',
  out_of      text not null default '100',
  student_name text not null default 'Chirayu Jani',
  description  text not null default 'The highest score in Navrachana Applied Math. More board and Applied Math results are added each year, with student permission.',
  updated_at  timestamptz not null default now(),
  constraint results_highlight_one_row check (id = 1)
);

-- Seed the single editable row.
insert into public.results_highlight (id) values (1) on conflict (id) do nothing;

alter table public.results_highlight enable row level security;

-- Anyone can read it (it shows on the public homepage).
drop policy if exists "results_highlight read" on public.results_highlight;
create policy "results_highlight read" on public.results_highlight
  for select using (true);

-- Only staff can edit it.
drop policy if exists "results_highlight write" on public.results_highlight;
create policy "results_highlight write" on public.results_highlight
  for update
  using (exists (select 1 from public.staff where user_id = auth.uid()))
  with check (exists (select 1 from public.staff where user_id = auth.uid()));
