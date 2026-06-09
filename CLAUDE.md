# PROJECT CONTEXT — read this first

## What this is
A conversion-first marketing website for **Inspire Academy of Mathematics**, a maths-specialist coaching academy in **Vadodara**, led personally by **Snehal Soni Sir** (teaching since 2000, 25+ years). Offline classes only, Class 9–12 + Applied + NCERT + JEE + GUJCET. The site sells *maths learning under Snehal Soni Sir*. **Killer feature:** a free interactive **Maths Concept-Gap Test** (routes by class → personalised weak-chapter result → **WhatsApp admission enquiry**). Built with the Vibe Coding Toolkit (current version).

## Current status
```
PHASE:          Phase 1-2 (homepage + ALL secondary pages) built on main, deploying via Vercel. Brand colour
                changed to teal-blue #069494 (was #0F766E green-teal): --primary highlight, --primary-strong
                interactive (AA), --primary-deep hover. Real pages: home, About Sir, Courses, Results, Method,
                Contact, + 5 SEO pages (unique content, SeoPage template). Prod build passes, 17 routes, zero em-dashes.
LAST COMPLETED: Secondary pages via reusable PageHeader / EnquiryBand / SeoPage components. Color token swap across
                globals.css + doc 04. Only placeholders left: blog, blog/[slug], privacy, maths-concept-gap-test.
NEXT UP:        Phase 3 Concept-Gap Test (needs Sir's question bank), Phase 4 enquiry form + Supabase + Resend,
                blog seed posts, privacy policy. IMAGES STILL NEEDED from Sir: hero/about photo + result creatives.
LAST COMMIT:    Phase 1-2 pages + #069494 colour on main (auto-deploys to Vercel).
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
