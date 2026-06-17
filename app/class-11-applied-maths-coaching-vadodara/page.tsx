import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 11 Applied-Math Coaching & Batches in Vadodara",
  description:
    "Class 11 Applied Math coaching and small batches in Vadodara by Snehal Sir. Concept-first teaching of data, statistics and real-world math, with weekly tests and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Applied-Math, Class 11",
  title: "Class 11 Applied-Math Coaching & Batches in Vadodara",
  intro:
    "Class 11 Applied Math coaching by Snehal Sir, the data, statistics and real-world math track. Taught concept-first, with weekly tests and personal doubt-solving.",
  body: [
    "Applied Maths is still a new subject, and most places treat it as a lighter version of standard maths. It is not. It asks for real, practical mathematical thinking, and it rewards students who are taught it properly rather than handed leftover notes.",
    "Snehal Sir has built a dedicated approach and his own study material around what Applied Maths actually tests. Class 11 Applied students get the same concept-first teaching, weekly tests and personal doubt-solving as everyone else, aimed at the way this subject is really examined, not a watered-down maths course.",
    "It suits commerce and other students who need strong, usable maths without the full rigour of the science stream. In small batches capped at 20, Sir makes sure each student actually understands the reasoning, not just the steps.",
  ],
  bodyImageSide: "right",
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
    "Custom, curated study material from Sir, not generic handouts",
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
    {
      q: "Do you provide study material?",
      a: "Yes. Snehal Sir provides his own custom, curated notes and practice material for each topic, not generic photocopies.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/class-11-applied-maths-coaching-vadodara" />;
}
