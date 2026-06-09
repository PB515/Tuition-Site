# 08 — Build Roadmap

*Living. Phases ordered for safety; each has acceptance criteria. Branch per phase, merge when green.*

```
PHASE 0: Scaffold
  Goal: Next.js + Tailwind tokens (white+teal) + shadcn + empty routes; deploys blank to Vercel.
  Acceptance: all 03b routes exist (empty) · tokens in globals.css · no hardcoded hex · builds & deploys.
  Out of scope: any real content.

PHASE 1: Homepage (static)
  Goal: the segment-router homepage — hero + router chips, trust strip, all 11 sections.
  Acceptance: 360px mobile · CTAs are real wa.me/tel: · tokens only · reveal/pop-in motion · no console errors.
  Out of scope: the Concept-Gap Test logic (Phase 3), DB wiring (Phase 4).

PHASE 2: Secondary pages (static)
  Goal: About Sir · Courses · Results · Teaching Method · 5 SEO pages · Blog (3 seed) · Contact · Privacy · 404.
  Acceptance: each page section order matches 03b · SEO pages genuinely differentiated (not templated) ·
              global empty/error/404 states · map embed has address fallback.
  Out of scope: enquiry persistence.

PHASE 3: Killer feature (front-end first)
  Goal: Concept-Gap Test — class router → 8–10 Qs → gap result → WhatsApp CTA.
  Acceptance: logic in /lib/gap-test-config.ts (expert-reviewed by Sir) · loading-timeout/empty/failed states ·
              result renders before any ask · works with JS-throttled · reduced-motion safe.
  Out of scope: storing the lead (wired in Phase 4).

PHASE 4: Data wiring
  Goal: enquiry form + gap-test → Supabase `leads` (insert-only RLS) + Resend notification.
  Acceptance: honeypot + server validation + rate limit + consent enforced · success/error states ·
              failed submit still shows the gap result · email arrives.
  Out of scope: admin dashboard (Phase 1.5).

PHASE 5: Polish
  Goal: responsive pass · real states · SEO (title/meta/OG/schema LocalBusiness+Person) · a11y (alt/focus/contrast/kbd) ·
        performance (image sizes/bundle) · cookieless analytics + privacy page.
  Acceptance: every QA-gate line checked · Lighthouse sane · titles correct per page type (not doubled).

LAUNCH: deploy · verify Resend domain · real images (06b) · GBP set up · live smoke test · DPDP privacy real.
```
