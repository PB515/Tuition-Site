import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 11 Regular-Math Coaching in Vadodara",
  description:
    "Class 11 maths coaching in Vadodara by Snehal Soni Sir. Concept-first higher maths for CBSE and GSEB, a strong base for Class 12 boards, JEE and GUJCET, with weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Higher maths begins",
  title: "Class 11 Regular-Math Coaching in Vadodara",
  intro:
    "Class 11 maths coaching by Snehal Soni Sir that makes the jump to higher maths clear. A strong base for Class 12 boards and competitive exams like JEE and GUJCET.",
  whoFor: [
    "Class 11 students moving into higher maths for the first time",
    "Students aiming for boards along with JEE or GUJCET",
    "Students who want concepts built properly, not rushed",
    "Both CBSE and GSEB students",
  ],
  covered: [
    "Sets, relations and functions",
    "Trigonometric functions and identities",
    "Complex numbers and quadratic equations",
    "Permutations, combinations and the binomial theorem",
    "Sequences and series, straight lines and conic sections",
    "Limits and derivatives, statistics and probability",
  ],
  teaching:
    "Class 11 is a big jump in difficulty, so each topic is built from the concept up before moving to exam-pattern problems. A weekly test keeps the pace steady and catches gaps early, so the Class 12 and competitive years stand on a solid base.",
  faqs: [
    {
      q: "Does this prepare for JEE and GUJCET too?",
      a: "Yes. The Class 11 base is taught with boards and competitive exams in mind, so students are ready for both.",
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
  return <SeoPage content={content} imageSlug="class-11" />;
}
