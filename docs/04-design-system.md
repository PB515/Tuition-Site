# 04 — Design System & Vibe

*Frozen. Generate these as CSS variables / Tailwind tokens in Phase 0, then FORBID hardcoded hex for the rest of the build.*

```
VIBE (one line): Clean, premium, academic, locally trusted — "experienced maths sir",
                 not flashy coaching. Calm authority; the teacher is the hero.
REFERENCES:      restrained academic/education sites; the CA-firm warm-trust feel
                 (sand/teal) — here it's WHITE surface + TEAL. (confirm any you like — TBD)
```

**COLOR (tokens — hex lives ONLY here + globals.css; contrast checked vs WCAG AA)**
```
--bg              #FFFFFF   page background (white — per brief)
--surface         #F8FAFC   cards / alt sections (slate-50)
--border          #E2E8F0   hairlines (slate-200)
--ink             #0F172A   primary text (slate-900) — ~16:1 on white
--ink-muted       #475569   secondary text (slate-600) — ~7:1 on white
--primary         #0F766E   teal-700 — CTAs / links / brand (white text on it ~4.9:1, use bold/large)
--primary-strong  #0D5C56   hover / active / link text on white (~6.5:1 — AA for body)
--primary-tint    #CCFBF1   soft teal wash for highlights / chips (teal-100)
--accent          #B45309   amber-700 — SPARINGLY, achievement/result badges only (~5.6:1 on white)
--success         #15803D   green-700
--warning         #B45309   amber-700
--error           #B91C1C   red-700
```
*Rule: teal is the only brand colour; amber appears only on result/achievement badges. No other hues. Buttons = `--primary` bg + white text (bold); text links on white use `--primary-strong`.*

**TYPE**
```
Headings:  a confident sans (e.g. "Plus Jakarta Sans" / "Sora") — 600/700
           sizes: 40 / 32 / 24 / 20 (clamp down on mobile, min 28 for H1)
Body:      a readable sans (e.g. "Inter") — 16px / line-height 1.6, muted = --ink-muted
Numerals:  tabular for results/marks (97/100 reads crisp)
```

**SPACING (scale only):** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
**RADIUS:** sm 6 · md 10 · lg 16 (cards lg, buttons md)
**SHADOWS:** sm (cards rest) · md (card hover / sticky CTA) — that's it.
**ASSETS:** logo (provided) · Applied-Maths result creative · achievement creative · Sir portrait (real photo — needed) — see 06b.

**MOTION** *(calm/credible brand → restrained motion; follows the Brief's voice)*
```
Vibe: calm, understated — nothing flashy.
Pieces used:
  reveal  — sections/cards fade+slide-up on scroll, ONCE (the workhorse)
  pop-in  — hero headline + primary CTA land in on load
  bounce  — the result "weak chapters" reveal in the Concept-Gap Test (once)
Hard rules: animate transform/opacity ONLY (never width/height/margin); entrances fire once;
            honor prefers-reduced-motion → page fully static & readable.
```
*Executed by the `frontend-design` skill steered to the RESTRAINED end (never its bold default); verify contrast at launch.*

**Done-check:** a stranger reading the vibe line can describe how it feels: a trusted, experienced maths teacher's calm, credible academy.
