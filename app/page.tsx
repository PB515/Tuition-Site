import Link from "next/link";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  Check,
  Target,
  MapPin,
  Award,
  BellRing,
} from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import CtaButton from "@/components/site/CtaButton";
import InstallButton from "@/components/InstallButton";
import HeroCarousel from "@/components/site/HeroCarousel";
import FloatingMath from "@/components/site/FloatingMath";
import Faq from "@/components/home/Faq";
import { resolveImage } from "@/lib/site-images";
import ResultCard from "@/components/site/ResultCard";
import TestimonialCard from "@/components/site/TestimonialCard";
import { getResults, getTestimonials } from "@/lib/content";
import {
  SITE,
  WA_ENQUIRY,
  MAPS_EMBED,
  BRANCHES,
  CLASS_CHIPS,
  COURSES,
  METHOD_STEPS,
} from "@/lib/site";

const STATS = [
  { value: "25+", label: "years of teaching" },
  { value: "2", label: "branches in Vadodara" },
  { value: "20", label: "students per batch (max)" },
  { value: "97/100", label: "highest in Navrachana Applied Math" },
];

const WHY = [
  { t: "Experience that reads the room", b: "25+ years in the classroom, including years at Navrachana School, mean Sir knows exactly where students get stuck and how to bring them back." },
  { t: "Snehal Sir teaches every class", b: "For Class 9 to 12, the founder himself is in every session. Not a substitute, not a junior tutor." },
  { t: "Practical, hands-on learning", b: "Concepts are grounded in where they come from and how they are used, before exam technique." },
  { t: "Small batches. Maximum 20.", b: "Every batch is capped at 20, so we know where each student is and how they progress week to week." },
  { t: "Applied Math specialists", b: "A dedicated, experience-backed approach with handcrafted material, already producing top results." },
  { t: "Weekly tests, real feedback", b: "A test every week, printed notes, and an honest conversation about what went wrong." },
];

const APPLIED_POINTS = [
  "Taught by Snehal Sir personally",
  "Purpose-built curriculum aligned to real exam patterns",
  "Ideal for Commerce and Science students choosing Applied over standard Math",
  "Batches filling fast, limited to 20 students",
];

const UPDATES = [
  "Absent today: Rahul was not present in the Class 10 Math class. Please let us know if it was planned.",
  "Test result: Diya scored 38 out of 50 in Trigonometry. Focus area for revision: identities.",
  "Exam reminder: Class 12 Math test on Sunday. Syllabus: Matrices and Determinants.",
];

const HERO_SLOTS = [
  { src: "/images/hero/1.jpg", label: "Sir teaching in class" },
  { src: "/images/hero/2.jpg", label: "Students in classroom" },
  { src: "/images/hero/3.jpg", label: "Sir explaining on board" },
  { src: "/images/hero/4.jpg", label: "Students solving problems" },
  { src: "/images/hero/5.jpg", label: "Test or practice session" },
];

export default async function Home() {
  const heroSlides = await Promise.all(
    HERO_SLOTS.map(async (s) => ({ url: await resolveImage(s.src), label: s.label, src: s.src })),
  );
  const [featuredResults, featuredTestimonials] = await Promise.all([getResults(), getTestimonials()]);
  return (
    <main>
      {/* 1. HERO (asymmetric split) */}
      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p
              className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong"
              style={{ animationDelay: "0ms" }}
            >
              Mathematics coaching in Alkapuri and Sama, Vadodara
            </p>
            <h1
              className="animate-fade-up mt-4 font-heading font-bold leading-[1.1] tracking-tight text-ink"
              style={{ animationDelay: "90ms" }}
            >
              <span className="block text-xl font-semibold text-ink-muted sm:text-2xl">
                25 years of teaching, one goal
              </span>
              <span className="mt-2 block text-4xl sm:text-5xl">
                Make students love mathematics
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
              style={{ animationDelay: "170ms" }}
            >
              Focused Class 9 to 12, Applied, JEE and GUJCET coaching across our Alkapuri and Sama
              branches, with {SITE.yearsExperience} years of teaching by Snehal Sir.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "250ms" }}
            >
              <CtaButton href={WA_ENQUIRY} external>
                <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
              <CtaButton href={`tel:${SITE.tel}`} variant="secondary" external>
                <Phone size={18} strokeWidth={2} /> Call Sir
              </CtaButton>
            </div>
          </div>

          {/* Hero carousel: drop photos at /public/images/hero/1.jpg ... 5.jpg */}
          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <HeroCarousel slides={heroSlides} />
          </div>
        </div>
      </section>

      {/* 2. SEGMENT ROUTER (class chips) */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-semibold text-ink">Find coaching for your class</p>
          <div className="flex flex-wrap gap-2">
            {CLASS_CHIPS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-lg border border-border bg-bg px-3.5 py-1.5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary-strong"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl font-bold text-primary-strong sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONCEPT-GAP TEST PROMO (cta band) */}
      <section className="bg-primary-strong">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Not sure where your child is stuck in math?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              Take the free Math Concept-Gap Test. Answer a few questions and get a clear read on
              the weak chapters, then message Sir to work on exactly those.
            </p>
          </div>
          <Link
            href="/maths-concept-gap-test"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-strong transition-transform hover:scale-[0.98] active:translate-y-px lg:self-auto"
          >
            <Target size={18} strokeWidth={2} /> Start the free test
          </Link>
        </div>
      </section>

      {/* 5. WHY INSPIRE (asymmetric content split) */}
      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={0} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why students stay with Inspire
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Parents come for Snehal Sir, and stay because math finally makes sense. Here is
              what that focus looks like in practice.
            </p>
            <div className="mt-7">
              <CtaButton href={WA_ENQUIRY} external>
                <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {WHY.map((w) => (
              <div
                key={w.t}
                className="group flex gap-3 rounded-2xl border border-border bg-bg p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong transition-transform duration-200 group-hover:scale-110">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{w.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{w.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COURSES (tile grid) */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={1} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Coaching for every stage, from Class 9 to competitive exams
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div>
                  <p className="font-heading text-lg font-semibold text-ink">{c.label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{c.note}</p>
                </div>
                <ArrowRight
                  size={20}
                  strokeWidth={1.75}
                  className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
            <Link
              href="/courses"
              className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-primary bg-primary-tint/50 p-5 text-primary-strong transition-all duration-200 hover:-translate-y-1 hover:bg-primary-tint hover:shadow-md"
            >
              <p className="font-heading text-lg font-semibold">See all courses</p>
              <ArrowUpRight size={20} strokeWidth={1.75} className="shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6b. APPLIED MATH SPOTLIGHT */}
      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={2} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Newly introduced: Applied Mathematics
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Applied Math is new. Snehal Sir isn&apos;t.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Applied Mathematics was introduced as an alternative to standard Math, and most schools
              are still working out how to teach it well. Snehal Sir has spent years understanding its
              real intent, connecting mathematics to practical, real-world thinking. The result:
              Chirayu Jani scored 97 out of 100 at Navrachana, the highest in the school. If your child
              has chosen Applied Math, this is where they need to be.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaButton href="/class-12-applied-maths-coaching-vadodara">
                Explore Applied Math <ArrowRight size={18} strokeWidth={2} />
              </CtaButton>
              <CtaButton href={WA_ENQUIRY} variant="secondary" external>
                <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
            </div>
          </div>
          <ul className="grid gap-3">
            {APPLIED_POINTS.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. TEACHING METHOD (numbered steps) */}
      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">
            The Inspire Math Learning System
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            How a topic goes from confusing to clear
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {METHOD_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="group flex gap-4 rounded-2xl border border-border bg-bg p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-bold text-white transition-transform duration-200 group-hover:scale-110">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. RESULTS (highlight + creative slots) */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={4} />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Results that speak for the teaching
            </h2>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-heading text-6xl font-bold text-primary-strong sm:text-7xl">
                97<span className="text-3xl text-ink-muted">/100</span>
              </span>
              <Award size={28} strokeWidth={1.5} className="text-accent" />
            </div>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              The highest score in Navrachana Applied Math, by our student Chirayu Jani. More board
              and Applied Math results are added each year, with student permission.
            </p>
            <div className="mt-7">
              <CtaButton href="/results" variant="secondary">
                See more results <ArrowRight size={18} strokeWidth={2} />
              </CtaButton>
            </div>
          </div>
          {/* Result creative slots: drop the real result images here (see docs/image-prompts.md). */}
          <div className="grid grid-cols-2 gap-4">
            {["Applied Math 2026 result", "Board results creative"].map((label) => (
              <div
                key={label}
                className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-bg p-5 text-center"
              >
                <Award size={26} strokeWidth={1.5} className="text-primary" />
                <p className="text-xs font-medium text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PARENT UPDATES (calm band) */}
      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={5} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">
              The parent app
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              See your child&apos;s progress anytime
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Inspire Academy gives parents a private app. Log in to check attendance, test marks
              and fees, and get WhatsApp updates for absences, marks and exams. Install it on your
              phone in one tap.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <InstallButton
                label="Install the app"
                className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-deep"
              />
              <CtaButton href="/parent/login" variant="secondary">
                Parent login
              </CtaButton>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              On iPhone: open in Safari, tap Share, then Add to Home Screen.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BellRing size={18} strokeWidth={1.75} className="text-primary" />
              Examples of WhatsApp updates parents get
            </div>
            <ul className="mt-4 space-y-3">
              {UPDATES.map((u) => (
                <li
                  key={u}
                  className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-ink hover:shadow-sm"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9b. RESULTS + TESTIMONIALS (from the admin collections) */}
      {(featuredResults.length > 0 || featuredTestimonials.length > 0) && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            {featuredResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Recent results
                  </h2>
                  <Link href="/results" className="text-sm font-medium text-primary-strong hover:underline">
                    All results
                  </Link>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {featuredResults.slice(0, 4).map((r) => (
                    <ResultCard key={r.id} r={r} />
                  ))}
                </div>
              </div>
            )}
            {featuredTestimonials.length > 0 && (
              <div className={featuredResults.length > 0 ? "mt-16" : ""}>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  What students and parents say
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredTestimonials.slice(0, 3).map((t) => (
                    <TestimonialCard key={t.id} t={t} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 10. FAQ */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={6} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Questions parents ask
          </h2>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      {/* 11. CONTACT BAND */}
      <section className="relative overflow-hidden">
        <FloatingMath preset="band" offset={7} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Two branches. One standard of teaching.
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              Whichever branch your child attends, the teaching, the batch size and the personal
              attention stay exactly the same.
            </p>
            <div className="mt-6 space-y-4">
              {BRANCHES.map((br) => (
                <a
                  key={br.name}
                  href={br.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-base text-ink-muted hover:text-primary-strong"
                >
                  <MapPin size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    <span className="font-semibold text-ink">
                      {br.name}
                      {br.main ? " · main" : ""}
                    </span>
                    <span className="block text-sm">{br.address}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={WA_ENQUIRY} external>
                <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
              <CtaButton href={`tel:${SITE.tel}`} variant="secondary" external>
                <Phone size={18} strokeWidth={2} /> {SITE.phoneDisplay}
              </CtaButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map to ${SITE.name}`}
              src={MAPS_EMBED}
              className="h-72 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
