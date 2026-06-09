# 06b — Image & Asset Plan

*Frozen. Counted INSTANCE-LEVEL from 03b's page list. Each image earns its place by doing a job text can't.*

**Hard rules:** real beats stock on trust slots; **never AI-generate a fake Snehal Soni Sir or fake students/testimonials** (trust-led site → misrepresentation); logo is the provided vector/raster, not AI; compress before adding (Squoosh/TinyPNG); use `next/image`.

**Per-page depth decision (default fewer on content-led pages):**

```
FILE (folder/name)                 TYPE          DEPTH    SOURCE              STATUS  ALT/NOTES
brand/logo.(svg|png)               vector/raster unique   provided            HAVE    "Inspire Academy of Mathematics"
home/hero-sir.jpg                  real photo    unique   own (shoot)         NEEDED  Snehal Soni Sir teaching — trust hero
home/og-cover.png                  illustration  unique   AI/made OK          NEEDED  social share card
about/sir-portrait.jpg             real photo    unique   own (shoot)         NEEDED  Sir portrait — the trust spine
about/premises.jpg                 real photo    unique   own                 NEEDED  3 Nand Complex classroom/premises
results/applied-2026.png           result creat. unique   provided            HAVE    Applied Maths 2026 results creative
results/achievement-97.png         result creat. unique   provided            HAVE    Chirayu Jani 97/100 (permission granted)
results/<more creatives>.png       result creat. shared   provided            TBD     as available, with permission
courses/icon-* (per class/exam)    icons         n/a      icon set (lucide)   HAVE    NOT photos — category icons
method/step-icons                  icons         n/a      icon set            HAVE    learning-system steps
seo-heroes/hero-class-10.jpg       photo/illus.  shared   own or icon-led     OPTION  may reuse a shared academic image
seo-heroes/hero-class-12.jpg       "             shared   "                   OPTION  default: shared/icon, not 5 unique shoots
seo-heroes/hero-applied.jpg        "             shared   "                   OPTION
seo-heroes/hero-gujcet.jpg         "             shared   "                   OPTION
seo-heroes/hero-new-sama-road.jpg  real photo    unique   own (premises/area) NEEDED  locality page → real local signal
blog/<slug>-cover.png (×3)         illustration  unique   AI/made OK          NEEDED  3 seed posts
contact/map                        embed         n/a      Google Maps         HAVE    not an image — iframe + address fallback
```

**Decisions baked in:**
- Trust slots (Sir, premises, results) = **real**, never faked.
- Course/method = **icons**, not photos (identify a category fast).
- 5 SEO heroes default to **shared/icon-led** (avoid 5 redundant shoots) — only the **New Sama Road locality** hero is a real local photo (it earns it).
- Blog covers = AI illustration is fine (concept slots).

**Done-check:** every image FILE implied by 03b has a row with type/depth/source/alt; nothing decorative survived "does it do a job?".
