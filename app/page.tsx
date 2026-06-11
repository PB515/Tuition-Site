import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Check,
  Target,
  MapPin,
  Award,
  BellRing,
} from "lucide-react";
import CtaButton from "@/components/site/CtaButton";
import InstallButton from "@/components/InstallButton";
import HeroCarousel from "@/components/site/HeroCarousel";
import Faq from "@/components/home/Faq";
import { resolveImage } from "@/lib/site-images";
import {
  SITE,
  WA_ENQUIRY,
  MAPS_EMBED,
  MAPS_LINK,
  CLASS_CHIPS,
  COURSES,
  METHOD_STEPS,
} from "@/lib/site";

const STATS = [
  { value: "25+", label: "years of teaching" },
  { value: "2000", label: "teaching since" },
  { value: "97/100", label: "highest in Navrachana Applied Maths" },
  { value: "1", label: "subject: Maths, done deeply" },
];

const WHY = [
  { t: "Maths, and only Maths", b: "One subject taught deeply, not one of many on a crowded timetable." },
  { t: "Taught by Sir himself", b: "Personal attention from Snehal Soni Sir, not a rotating set of tutors." },
  { t: "Concepts before formulas", b: "Students learn why a method works, so it holds under exam pressure." },
  { t: "NCERT for CBSE and GSEB", b: "One strong NCERT foundation that serves both boards at once." },
  { t: "Weekly tests, real feedback", b: "A test every week, printed notes, and honest mistake analysis." },
  { t: "Boards and competitive together", b: "Applied, JEE and GUJCET prepared inside one focused system." },
];

const UPDATES = [
  "Rahul attended today's Class 10 Maths lecture. Topic covered: Quadratic Equations.",
  "Test result: 38 out of 50 in Trigonometry. Focus area for revision: identities.",
  "Reminder: Class 12 Maths test on Sunday. Syllabus: Matrices and Determinants.",
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
  return (
    <main>
      {/* 1. HERO (asymmetric split) */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p
              className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong"
              style={{ animationDelay: "0ms" }}
            >
              Maths-only academy in Vadodara
            </p>
            <h1
              className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl"
              style={{ animationDelay: "90ms" }}
            >
              Strong maths concepts, taught by Snehal Soni Sir.
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
              style={{ animationDelay: "170ms" }}
            >
              Focused Class 9 to 12, Applied, JEE and GUJCET coaching in New Sama Road, with{" "}
              {SITE.yearsExperience} years of teaching.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "250ms" }}
            >
              <CtaButton href={WA_ENQUIRY} external>
                <MessageCircle size={18} strokeWidth={2} /> WhatsApp Enquiry
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
              Not sure where your child is stuck in maths?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              Take the free Maths Concept-Gap Test. Answer a few questions and get a clear read on
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
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why students stay with Inspire
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Parents come for Snehal Soni Sir, and stay because maths finally makes sense. Here is
              what that focus looks like in practice.
            </p>
            <div className="mt-7">
              <CtaButton href={WA_ENQUIRY} external>
                <MessageCircle size={18} strokeWidth={2} /> WhatsApp Enquiry
              </CtaButton>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7">
            {WHY.map((w) => (
              <div key={w.t} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong">
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
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
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

      {/* 7. TEACHING METHOD (numbered steps) */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">
            The Inspire Maths Learning System
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            How a topic goes from confusing to clear
          </h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {METHOD_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-bold text-white">
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
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
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
              The highest score in Navrachana Applied Maths, by our student Chirayu Jani. More board
              and Applied Maths results are added each year, with student permission.
            </p>
            <div className="mt-7">
              <CtaButton href="/results" variant="secondary">
                See more results <ArrowRight size={18} strokeWidth={2} />
              </CtaButton>
            </div>
          </div>
          {/* Result creative slots: drop the real result images here (see docs/image-prompts.md). */}
          <div className="grid grid-cols-2 gap-4">
            {["Applied Maths 2026 result", "Board results creative"].map((label) => (
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
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">
              The parent app
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              See your child&apos;s progress anytime
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              Inspire Academy gives parents a private app. Log in to check attendance, test marks
              and fees, and get class and test updates. Install it on your phone in one tap.
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
              Examples of updates parents receive
            </div>
            <ul className="mt-4 space-y-3">
              {UPDATES.map((u) => (
                <li
                  key={u}
                  className="rounded-lg border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink-muted"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Questions parents ask
          </h2>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      {/* 11. CONTACT BAND */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Visit the academy or message us
            </h2>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-start gap-3 text-base text-ink-muted hover:text-primary-strong"
            >
              <MapPin size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
              {SITE.address}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={WA_ENQUIRY} external>
                <MessageCircle size={18} strokeWidth={2} /> WhatsApp Enquiry
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
