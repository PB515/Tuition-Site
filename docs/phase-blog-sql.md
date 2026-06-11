# Blog CMS - SQL

Run in the Supabase SQL editor. Creates the posts table (public reads published; staff manage all),
and migrates the 3 existing blog posts into it. Post images reuse the `site-images` bucket (blog/ folder).

```sql
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_path text,
  body text not null,
  published boolean default false,
  published_at date,
  created_at timestamptz default now()
);
alter table public.posts enable row level security;
create policy "public read published posts" on public.posts for select to anon, authenticated using (published = true);
create policy "staff all posts" on public.posts for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

-- Migrate the 3 existing posts
insert into public.posts (slug, title, excerpt, body, published, published_at) values
(
  'score-90-plus-class-10-maths',
  'How to Score 90+ in Class 10 Maths Boards',
  'Scoring 90+ in board maths is less about talent and more about a few steady habits. Here is what actually moves the marks.',
  E'Most students who score 90+ in Class 10 maths are not the ones who study the most hours. They are the ones who study the right things, in the right order, and fix their mistakes early. Here is a simple plan that works.\n\n## Get the NCERT basics solid first\nThe board paper is built on NCERT. Before any reference book, make sure every NCERT example and exercise is something you can solve on your own. This is the same for CBSE and GSEB students, because the books are the same.\n\n## Practice the full pattern, not just hard sums\nMarks are lost on easy and medium questions far more often than on the toughest one. Practice the whole pattern, including the one and two mark questions, so you do not give away simple marks under exam pressure.\n\n## Fix mistakes the same week\nA mistake you do not correct becomes a habit. After every test, spend time on exactly the questions you got wrong, and redo them until they are easy. A weekly test followed by this kind of analysis is the fastest way to improve.\n\n## Give extra time to the high-weight chapters\nTrigonometry, geometry and algebra carry a large share of the paper, and word problems trip up many students. Put extra practice here, and ask for help the moment a chapter feels unclear rather than leaving it for later.\n\nAt Inspire Academy, this is exactly how we teach Class 10: concept first, full-pattern practice, a weekly test, and honest mistake analysis. If your child needs this kind of structure, message Snehal Soni Sir.',
  true, '2026-06-02'
),
(
  'applied-maths-vs-core-maths-class-11',
  'Applied Maths or Core Maths: How to Choose in Class 11',
  'Both are real maths, but they point in different directions. Here is a simple way to decide which one fits your plan.',
  E'When students reach Class 11, many have to choose between core Mathematics and Applied Mathematics. Both are serious subjects, but they suit different goals. Here is how to think about it.\n\n## What core maths is for\nCore maths is more theoretical and is the usual choice for students heading towards engineering and exams like JEE. If you enjoy proofs, calculus and abstract problem solving, and your future plans need it, core maths is the path.\n\n## What Applied Maths is for\nApplied Maths leans towards data, statistics, finance and real-world quantitative skills. It is a strong choice for students heading towards commerce, economics, data and management fields, and it is often more scoring for students who prefer practical maths.\n\n## How to choose\nStart from where you want to go after Class 12, then pick the subject that path needs. If you are unsure, talk to a teacher who has taught both. Inspire Academy teaches core and Applied Maths, and our highest Applied Maths score is 97 out of 100, so we can help you decide and then do well in whichever you choose.',
  true, '2026-05-26'
),
(
  'gujcet-maths-preparation-plan',
  'A Simple GUJCET Maths Preparation Plan',
  'GUJCET maths rewards speed and accuracy on objective questions. A short, steady plan beats last-minute cramming.',
  E'GUJCET tests how quickly and accurately you can handle objective maths questions drawn from the Class 12 syllabus. The students who do well are usually the ones who practised under time, not the ones who only revised theory. Here is a simple plan.\n\n## Know the pattern\nGUJCET maths is objective and time-bound. Learn the kinds of questions that appear and how many minutes you can spend on each. Knowing the pattern removes a lot of exam-day stress.\n\n## Build speed with timed practice\nSolve sets of questions with a clock running. The goal is to get faster without getting careless. Track which topics slow you down and give them more practice.\n\n## Revise the high-yield topics and take mock tests\nCalculus, algebra and vectors carry steady weight, so keep them sharp. In the final weeks, take full mock tests on the GUJCET pattern, then review every mistake. At Inspire Academy, GUJCET practice is timed and pattern-based for exactly this reason.',
  true, '2026-05-19'
)
on conflict (slug) do nothing;
```
