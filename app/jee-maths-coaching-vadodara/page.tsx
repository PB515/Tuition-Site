import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "JEE Maths Coaching in Vadodara",
  description:
    "JEE maths coaching in Vadodara by Snehal Sir. Concept-first preparation for JEE Main maths alongside Class 11 and 12 boards, with real exam-pattern practice, weekly tests and small batches.",
};

const content: SeoContent = {
  eyebrow: "Competitive prep",
  title: "JEE Maths Coaching in Vadodara",
  intro:
    "JEE maths is built on the same Class 11 and 12 concepts, taught with more depth and the right practice. At Inspire Academy of Mathematics, Snehal Sir prepares students for JEE Main maths inside the same focused system that covers their boards, so the two reinforce each other.",
  whoFor: [
    "Class 11 and 12 Science students targeting JEE Main",
    "Students who want JEE maths and board maths prepared together, not separately",
    "Students who need strong fundamentals before heavy problem-solving",
    "Anyone in Vadodara wanting small-batch, teacher-led JEE maths prep",
  ],
  teaching:
    "JEE maths rewards clear concepts and pattern recognition. Sir teaches the idea first, then works real JEE-style problems step by step, not just textbook sums. Weekly tests and mistake analysis catch weak areas early, and small batches mean doubts get solved personally, never left for later.",
  faqs: [
    {
      q: "Do you teach JEE maths separately or with boards?",
      a: "Together. The Class 11 and 12 Regular Maths batches cover the board syllabus and JEE-level depth in one structured system, so students do not have to split their time.",
    },
    {
      q: "Is JEE maths only about hard problems?",
      a: "No. Hard problems are easy once the concept is solid. We build fundamentals first, then layer in JEE-pattern practice, so problem-solving actually sticks.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Message us on WhatsApp with your class and school and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/jee-maths-coaching-vadodara" />;
}
