import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Applied Maths Coaching in Vadodara",
  description:
    "Applied Maths coaching in Vadodara by Snehal Soni Sir, where our student scored 97 out of 100, the highest in Navrachana. Concept-first teaching with weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Where we scored 97 out of 100",
  title: "Applied Maths Coaching in Vadodara",
  intro:
    "Applied Mathematics coaching by Snehal Soni Sir, the subject where our student scored 97 out of 100, the highest in Navrachana. Concept-first teaching with weekly tests.",
  whoFor: [
    "Students who chose Applied Maths over core maths",
    "Students who want a teacher with a proven Applied Maths record",
    "Students who want data, finance and quantitative topics made clear",
    "Both CBSE and GSEB students",
  ],
  covered: [
    "Numbers, quantification and numerical applications",
    "Algebra and matrices for applied contexts",
    "Calculus and its real-world applications",
    "Probability distributions and inferential statistics",
    "Financial mathematics and interest",
    "Linear programming and data interpretation",
  ],
  teaching:
    "Applied Maths is practical, and it is taught that way. Every topic is tied to where it is used, then practised with exam-pattern questions. Our highest Applied Maths score, 97 out of 100 at Navrachana, came from exactly this focus and steady weekly testing.",
  faqs: [
    {
      q: "How is Applied Maths different from core maths?",
      a: "Applied Maths leans towards data, finance and real-world quantitative topics, while core maths is more theoretical. We help you with the one you have chosen.",
    },
    {
      q: "What is your Applied Maths record?",
      a: "Our student Chirayu Jani scored 97 out of 100, the highest in Navrachana Applied Maths.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} imageSlug="applied" />;
}
