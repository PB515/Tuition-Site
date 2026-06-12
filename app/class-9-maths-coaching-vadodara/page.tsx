import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 9 Coaching in Vadodara",
  description:
    "Class 9 maths coaching in Vadodara by Snehal Soni Sir. NCERT-based for CBSE and GSEB, building a strong base for the Class 10 board year, with weekly tests and doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "Foundation year",
  title: "Class 9 Coaching in Vadodara",
  intro:
    "Class 9 maths coaching by Snehal Soni Sir that builds the base for the board year. NCERT-based, so it serves both CBSE and GSEB students, with weekly tests and personal doubt-solving.",
  whoFor: [
    "Class 9 students who want a strong base before the Class 10 board year",
    "Students who find maths confusing and want it explained slowly and clearly",
    "Parents who want an experienced teacher, not a random tutor",
    "Both CBSE and GSEB students, since the NCERT base serves both",
  ],
  covered: [
    "Number systems, polynomials and coordinate geometry",
    "Linear equations in two variables",
    "Lines and angles, triangles and quadrilaterals",
    "Circles, and areas of parallelograms and triangles",
    "Surface areas and volumes",
    "Statistics, probability and Euclid's geometry",
  ],
  teaching:
    "Class 9 is where the base for Class 10 is built. Each chapter starts from the concept, moves to NCERT questions, and is checked with a weekly test, so weak spots are caught and fixed early, well before the board year.",
  faqs: [
    {
      q: "Is this for CBSE or GSEB?",
      a: "Both. The teaching is NCERT-based and the books are the same, so CBSE and GSEB Class 9 students are both covered.",
    },
    {
      q: "Why start coaching in Class 9?",
      a: "Class 9 builds the foundation that the Class 10 boards rely on. A strong base now makes the board year far easier.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp with your school and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} imageSlug="class-9" />;
}
