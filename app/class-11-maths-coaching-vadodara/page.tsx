import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 11 Regular-Math Coaching & Batches in Vadodara",
  description:
    "Class 11 math coaching and small batches in Vadodara by Snehal Sir. Concept-first higher math for CBSE and GSEB, a strong base for Class 12 boards, JEE and GUJCET, with weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Higher math begins",
  title: "Class 11 Regular-Math Coaching & Batches in Vadodara",
  intro:
    "Class 11 math coaching by Snehal Sir that makes the jump to higher math clear. A strong base for Class 12 boards and competitive exams like JEE and GUJCET.",
  body: [
    "Class 11 is the steepest jump in school maths. The pace doubles, the topics get abstract, and students who coasted through Class 10 often hit a wall in the first few months. Knowing this is half the battle.",
    "Snehal Sir bridges that jump deliberately. He links each new Class 11 topic back to the Class 10 idea it grows from, so nothing feels like it came from nowhere, then builds up to the harder questions step by step. The teaching is NCERT-based and tested weekly, with mistake analysis so weak spots are fixed before they compound.",
    "With batches capped at 20, Sir can see exactly who is struggling with the new pace and give them the personal attention a crowded class never can. Students come out ready for Class 12, not just done with Class 11.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Class 11 students moving into higher math for the first time",
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
    "Custom, curated study material from Sir, not generic handouts",
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
    {
      q: "Do you provide study material?",
      a: "Yes. Snehal Sir provides his own custom, curated notes and practice material for each topic, not generic photocopies.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/class-11-maths-coaching-vadodara" />;
}
