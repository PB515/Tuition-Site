# PROJECT CONTEXT — read this first

## What this is
A conversion-first marketing website for **Inspire Academy of Mathematics**, a maths-specialist coaching academy in **Vadodara**, led personally by **Snehal Soni Sir** (teaching since 2000, 25+ years). Offline classes only, Class 9–12 + Applied + NCERT + JEE + GUJCET. The site sells *maths learning under Snehal Soni Sir*. **Killer feature:** a free interactive **Maths Concept-Gap Test** (routes by class → personalised weak-chapter result → **WhatsApp admission enquiry**). Built with the Vibe Coding Toolkit (current version).

## Current status
```
PHASE:          ADMIN 1000-STUDENT REDESIGN in progress (8 phases). DONE: P1 admin shell (AdminShell: left sidebar
                Dashboard/Leads/Students/Batches/Attendance/Tests&Marks/Fees/Messages/Reports/Settings + top bar global
                student search + sign out + mobile drawer; replaced top AdminNav). P2 Attendance daily screen
                (AttendanceGrid: summary cards, Mark-All, colour segmented status, per-student note, block-on-unmarked,
                edit mode, bulk upsert w/ batch_id, post-save Notify panel: absent/late WhatsApp + Copy list + Mark notified).
                P3 Fees collection dashboard (KPI cards, filters month/batch/status/search, FeeGenerator preview->generate,
                FeesTable bulk select + mark paid/pending/reminded/delete + row WhatsApp/view, export pending CSV). Parent
                portal (prior Phase 3) shipped. 27 routes, build green.
LAST COMPLETED: P3 fees. docs/redesign-schema.md (run: students roll_number/default_monthly_fee/alternate_number, batches
                days/capacity, attendance batch_id/notified_at/note, marks status, fees batch_id/reminded_at, indexes) +
                docs/phase-3-fees-sql.md (dedupe + backfill batch_id + unique(student_id,month)). ALL SQL RUN by user.
NEXT UP:        Redesign remaining: P4 Students (rich table att%/fee-status/last-test via a DB view, bulk actions, CSV
                import, duplicate detection by name+parent phone, roll number, Save&AddAnother etc). P5 operational
                Dashboard (Today's Ops + This Month + Alerts + Quick Actions; needs batch days for "scheduled today").
                P6 Tests&Marks (status appeared/absent/not_submitted + test summary stats). P7 Reports (filterable + CSV).
                P8 Messages (WhatsApp hub: templates + notified log) + Settings. Vercel Deployment Protection was ON
                (whole site behind Vercel login) - user turning it OFF. SUPABASE_SECRET_KEY must be in Vercel env for live invites.
LAST COMMIT:    Redesign P3 fees on main (auto-deploys to Vercel).
```

## Stack
Next.js (App Router) · Tailwind v4 (tokens in globals.css) · shadcn/ui (light) · Supabase (Postgres, **Mumbai**) · Resend · `wa.me`/`tel:` · Vercel. Cookieless analytics. Full reasoning in `/docs/05-tech-stack.md`.

## Conventions
- Folders: `/app` `/components` `/lib` `/docs`, content as MDX in `/content`.
- Components PascalCase, one per file; build shared once, reuse.
- **Colours: only the tokens in `/docs/04-design-system.md` (white + teal) — never hardcode hex.**
- **No new dependencies — and no upgrades — without asking.**
- Secrets in gitignored `.env.local` + Vercel env vars — never in code, never in a prompt.
- Branch per phase; QA gate (`/docs/10`) before merge; Stuck-State = 3 strikes then revert.

## Decisions made (do NOT revisit)
- Homepage is a **segment router**; the router's interactive path is the Concept-Gap Test.
- **No fees shown · no demo class** — conversion is a soft WhatsApp/call enquiry (CTA: "WhatsApp for Admission Enquiry").
- **Snehal Soni Sir is the trust spine** — sell the teacher, not just the brand.
- Board = **NCERT (covers both CBSE + GSEB)** — don't split.
- **Lead with Applied Maths + boards** (where the Navrachana 97/100 proof is); JEE/GUJCET secondary.
- **5 SEO pages launch**, 5 staged. No portal/auth/payments in Phase 1.
- Gap-test answer→weakness logic lives in **one editable config** (`/lib/gap-test-config.ts`), reviewed by Sir.
- DPDP: consent checkbox + real privacy policy; India data region.
- Real proof only — never invent testimonials/results/faces. Permission granted for "Chirayu Jani / Navrachana 97/100".

## Key facts (verbatim — the site must use these)
- Address: **3, Nand Complex, near Umiyangagar, New Sama Road, Vadodara**
- Phone + WhatsApp: **9016679929** → `tel:+919016679929`, `wa.me/919016679929`
- Areas: New Sama Road · Sama · Karelibaug · Fatehgunj · Nizampura · Chhani · Harni · Alkapuri

## Open TBDs (non-blocking — site omits until filled)
Sir's qualification/degree · approx students taught / #90+ scorers · GBP opening hours · 2–3 more result creatives · brand fonts confirm.

## Where things live
Tokens → `app/globals.css` (source: `/docs/04`) · Schema → `/docs/06` · Flows `/docs/01` · PRD `/docs/02` · Site map `/docs/03b` · Roadmap `/docs/08` · Build log `/docs/09` · QA `/docs/10` · Analytics `/docs/11` · Portal `/docs/app-*.md` · Inputs → `/docs/business-brief.md`, `/docs/research-report.md`.
