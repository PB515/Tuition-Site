import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 12 Applied-Math Coaching & Batches in Vadodara",
  description:
    "Class 12 Applied Math coaching and small batches in Vadodara by Snehal Sir, where our student scored 97 out of 100, the highest in Navrachana Applied Math. Weekly tests and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Applied-Math, Class 12",
  title: "Class 12 Applied-Math Coaching & Batches in Vadodara",
  intro:
    "Class 12 Applied Math coaching by Snehal Sir, where our student Chirayu Jani scored 97 out of 100, the highest in Navrachana Applied Math. Concept-first, with weekly tests and doubt-solving.",
  whoFor: [
    "Class 12 students taking Applied Math for the board year",
    "Students heading towards commerce, economics, data and management fields",
    "Students who want a high, scoring board result in Applied Math",
    "Students who prefer practical, application-based math",
  ],
  covered: [
    "Numbers, quantification and numerical applications",
    "Algebra and matrices",
    "Calculus and its applications",
    "Probability distributions and inferential statistics",
    "Index numbers and time-based data",
    "Financial mathematics and linear programming",
    "Custom, curated study material from Sir, not generic handouts",
  ],
  teaching:
    "Applied Math is highly scoring when the concepts and the exam pattern are both practised well. Every chapter starts from the concept, then moves to application and board-pattern questions, with a weekly test and mistake analysis. This is exactly how our student reached 97 out of 100.",
  faqs: [
    {
      q: "Is Applied Math scoring for boards?",
      a: "Yes. It is application-based and, with steady practice, often more scoring than core Math. Our highest Applied Math result is 97 out of 100.",
    },
    {
      q: "How often are tests held?",
      a: "Weekly, followed by mistake analysis, so students fix errors well before the board exam.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp with your school and we will share current timings and fees.",
    },
    {
      q: "Do you provide study material?",
      a: "Yes. Snehal Sir provides his own custom, curated notes and practice material for each topic, not generic photocopies.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} imageSlug="class-12-applied" />;
}
