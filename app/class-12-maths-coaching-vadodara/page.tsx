import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 12 Regular-Math Coaching & Batches in Vadodara",
  description:
    "Class 12 math coaching and small batches in Vadodara by Snehal Sir. Board syllabus plus JEE and GUJCET readiness, with calculus made clear and weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Board and beyond",
  title: "Class 12 Regular-Math Coaching & Batches in Vadodara",
  intro:
    "Class 12 math coaching by Snehal Sir, covering the board syllabus and the readiness needed for JEE and GUJCET, with weekly tests and personal doubt-solving.",
  body: [
    "Class 12 is where everything is counted at once. The board result, JEE, GUJCET, and the cut-offs that follow all rest on this one year, and maths usually carries the heaviest weight of all.",
    "Snehal Sir prepares boards and competitive exams together rather than treating them as separate jobs. Every topic is taught to real depth, from the concept up to board-pattern and JEE and GUJCET style questions, with a weekly test and honest mistake analysis so nothing is left to chance in the final months.",
    "Batches stay capped at 20, so even in the busiest year of school, every student gets personal doubt-solving with Sir. The goal is simple: walk into each exam knowing the maths is genuinely under control.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Class 12 students who want strong board marks in math",
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
    "Custom, curated study material from Sir, not generic handouts",
  ],
  teaching:
    "Class 12 math rewards understanding, not memory. Calculus is built step by step from the idea, then practised at board level and pushed to competitive-exam difficulty for students who need it. Weekly tests keep the large syllabus under control.",
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
    {
      q: "Do you provide study material?",
      a: "Yes. Snehal Sir provides his own custom, curated notes and practice material for each topic, not generic photocopies.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/class-12-maths-coaching-vadodara" />;
}
