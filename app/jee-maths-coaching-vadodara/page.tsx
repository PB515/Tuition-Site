import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "JEE Maths Coaching in Vadodara",
  description:
    "JEE maths coaching in Vadodara by Snehal Soni Sir. Concept-first problem-solving for JEE Main, taught alongside Class 11 and 12, with timed practice and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Competitive maths",
  title: "JEE Maths Coaching in Vadodara",
  intro:
    "JEE maths coaching by Snehal Soni Sir for deeper problem-solving, taught alongside Class 11 and 12. Concept-first, with timed practice for JEE Main.",
  whoFor: [
    "Class 11 and 12 students preparing for JEE Main alongside boards",
    "Students who want stronger problem-solving, not just formula drilling",
    "Students who need speed and accuracy under timed conditions",
    "Students who want personal doubt-solving with an experienced teacher",
  ],
  covered: [
    "Algebra: quadratics, complex numbers, sequences and the binomial theorem",
    "Calculus: limits, continuity, differentiation and integration",
    "Coordinate geometry: straight lines, circles and conic sections",
    "Trigonometry and inverse trigonometry",
    "Vectors and three-dimensional geometry",
    "Probability and timed problem-solving practice",
  ],
  teaching:
    "JEE maths rewards depth and speed. Concepts are built thoroughly, then drilled with JEE-pattern problems and timed practice, with mistake analysis so accuracy improves week on week. It runs alongside the Class 11 and 12 syllabus, so boards and JEE move together.",
  faqs: [
    {
      q: "Does this cover JEE Main?",
      a: "Yes, the maths section for JEE Main, built on a strong Class 11 and 12 base.",
    },
    {
      q: "Can students prepare for boards and JEE together?",
      a: "Yes. The teaching is planned so the board syllabus and JEE problem-solving reinforce each other.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp with your class and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} />;
}
