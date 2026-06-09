import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 12 Maths Coaching in Vadodara",
  description:
    "Class 12 maths coaching in Vadodara by Snehal Soni Sir. Board syllabus plus JEE and GUJCET readiness, with calculus made clear and weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Board and beyond",
  title: "Class 12 Maths Coaching in Vadodara",
  intro:
    "Class 12 maths coaching by Snehal Soni Sir, covering the board syllabus and the readiness needed for JEE and GUJCET, with weekly tests and personal doubt-solving.",
  whoFor: [
    "Class 12 students who want strong board marks in maths",
    "Students preparing for GUJCET or JEE alongside boards",
    "Students who want calculus and algebra made clear, not just memorised",
    "Both CBSE and GSEB students",
  ],
  covered: [
    "Relations, functions and inverse trigonometry",
    "Matrices, determinants and continuity",
    "Differentiation, integration and their applications",
    "Differential equations and vectors",
    "Three-dimensional geometry, linear programming and probability",
    "Board-pattern revision plus competitive-level practice",
  ],
  teaching:
    "Class 12 maths rewards understanding, not memory. Calculus is built step by step from the idea, then practised at board level and pushed to competitive-exam difficulty for students who need it. Weekly tests keep the large syllabus under control.",
  faqs: [
    {
      q: "Do you prepare for boards and JEE or GUJCET together?",
      a: "Yes. The board syllabus is the base, and students who need competitive preparation get harder practice on the same topics.",
    },
    {
      q: "How often are tests held?",
      a: "Weekly, with mistake analysis, which matters a lot given the size of the Class 12 syllabus.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} />;
}
