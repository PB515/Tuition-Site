# 01 — User Flow Map

*Frozen (approved). The skeleton the site hangs on. Every page/component/table/image falls out of these.*

**Homepage's main job = segment router.** Two buyers, no single primary → the hero routes by class/goal in one click. The router's interactive path *is* the Concept-Gap Test (killer feature).

```
FLOW 1 — Anxious parent, Class 9–10 (the core flow)
Trigger:  Google "maths tuition new sama road" / GBP / word-of-mouth "Snehal Soni Sir"
Steps:    1 Home (router: "Which class?") → 2 Class 10 Maths page (method + Sir + proof)
          → 3 Concept-Gap Test ("see your child's weak chapters") → 4 Result + "WhatsApp Sir"
Success:  WhatsApp admission enquiry opens, prefilled (class + weak area)
Drop-off: Step 2 if proof feels thin → fix: Navrachana 97/100 + 25-yr credibility above the fold
Data:     reads: none private · writes: lead (name, parent#, class, source, test-result tag, consent_at)

FLOW 2 — JEE / GUJCET / Class 11–12 student (+ parent)
Trigger:  Search "GUJCET maths coaching Vadodara" / "applied maths Vadodara"
Steps:    1 Exam page (GUJCET / Applied) → 2 Results proof → 3 Call for batch details / WhatsApp
Success:  tel: call to 9016679929 or WhatsApp enquiry
Drop-off: "just boards, or serious competitive prep?" → fix: exam-specific method + result band
Data:     writes: lead (optional — many will just call)

FLOW 3 — Concept-Gap Test (killer feature, standalone entry)
Trigger:  Home CTA "Free: find your child's weak maths chapters"
Steps:    1 Pick class (router) → 2 answer 8–10 chapter-tagged questions
          → 3 personalised gap result ("strong: algebra · weak: trigonometry")
          → 4 "WhatsApp Sir — he'll target these chapters"
Success:  killer_feature_completed + WhatsApp enquiry
Drop-off: mid-quiz abandonment → fix: short, progress bar, no signup wall, result BEFORE the ask
Data:     writes: lead + result tags. Question→weakness logic in ONE editable config (expert-reviewed)

FLOW 4 — Local "near me" searcher
Trigger:  Google Business Profile / "maths classes near sama"
Steps:    1 Locality SEO page (New Sama Road) → 2 About Snehal Soni Sir → 3 Map + Call
Success:  call / directions tap to 3 Nand Complex
Drop-off: trust → fix: real photo of Sir + premises, GBP reviews embedded
Data:     none private

FLOW 5 — Trust-check before committing
Trigger:  Referred parent verifying the name
Steps:    1 About Snehal Soni Sir (25+ yrs, since 2000) → 2 Results → 3 Enquiry form
Success:  Submit Enquiry (form) → email to academy
Drop-off: credential gap → fix: qualification line (TBD) + result creatives
Data:     writes: lead (consented)
```

**Done-check:** every page in 03b appears in ≥1 flow · the killer feature is Flow 3 · every "writes: lead …" maps to the `leads` table (06). 03b's page list is the authoritative one; this doc predicts movement, 03b declares structure.
