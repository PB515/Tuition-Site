import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 12 Applied Maths Coaching in Vadodara",
  description:
    "Class 12 Applied Maths coaching in Vadodara by Snehal Soni Sir, where our student scored 97 out of 100, the highest in Navrachana Applied Maths. Weekly tests and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Applied Maths, Class 12",
  title: "Class 12 Applied Maths Coaching in Vadodara",
  intro:
    "Class 12 Applied Maths coaching by Snehal Soni Sir, where our student Chirayu Jani scored 97 out of 100, the highest in Navrachana Applied Maths. Concept-first, with weekly tests and doubt-solving.",
  whoFor: [
    "Class 12 students taking Applied Maths for the board year",
    "Students heading towards commerce, economics, data and management fields",
    "Students who want a high, scoring board result in Applied Maths",
    "Students who prefer practical, application-based maths",
  ],
  covered: [
    "Numbers, quantification and numerical applications",
    "Algebra and matrices",
    "Calculus and its applications",
    "Probability distributions and inferential statistics",
    "Index numbers and time-based data",
    "Financial mathematics and linear programming",
  ],
  teaching:
    "Applied Maths is highly scoring when the concepts and the exam pattern are both practised well. Every chapter starts from the concept, then moves to application and board-pattern questions, with a weekly test and mistake analysis. This is exactly how our student reached 97 out of 100.",
  faqs: [
    {
      q: "Is Applied Maths scoring for boards?",
      a: "Yes. It is application-based and, with steady practice, often more scoring than core Maths. Our highest Applied Maths result is 97 out of 100.",
    },
    {
      q: "How often are tests held?",
      a: "Weekly, followed by mistake analysis, so students fix errors well before the board exam.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp with your school and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} imageSlug="class-12-applied" />;
}
