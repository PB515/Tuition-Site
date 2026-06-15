import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 11 Applied-Math Coaching & Batches in Vadodara",
  description:
    "Class 11 Applied Math coaching in Vadodara by Snehal Sir. Concept-first teaching of data, statistics and real-world math, with weekly tests and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Applied-Math, Class 11",
  title: "Class 11 Applied-Math Coaching & Batches in Vadodara",
  intro:
    "Class 11 Applied Math coaching by Snehal Sir, the data, statistics and real-world math track. Taught concept-first, with weekly tests and personal doubt-solving.",
  whoFor: [
    "Class 11 students taking Applied Math instead of core Math",
    "Students heading towards commerce, economics, data and management fields",
    "Students who prefer practical, application-based math",
    "Students who want a strong base for Class 12 Applied Math",
  ],
  covered: [
    "Numbers, quantification and numerical applications",
    "Algebra and mathematical reasoning",
    "Basics of calculus",
    "Descriptive statistics",
    "Basics of financial mathematics",
    "Coordinate geometry and probability",
  ],
  teaching:
    "Applied Math rewards clear thinking with numbers and data, so each topic is built from the concept and then practised with application-based and exam-pattern questions. A weekly test and honest mistake analysis keep the base strong for the Class 12 Applied year.",
  faqs: [
    {
      q: "How is Applied Math different from core Math?",
      a: "Applied Math leans towards data, statistics, finance and real-world quantitative skills, and suits commerce, economics and management paths. Core Math is more theoretical and is the usual choice for engineering and JEE.",
    },
    {
      q: "How often are tests held?",
      a: "Weekly, followed by mistake analysis, so students fix errors early.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp with your school and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} imageSlug="class-11-applied" />;
}
