import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes in Fatehgunj, Vadodara",
  description:
    "Maths classes and tuition for students in Fatehgunj, Vadodara by Snehal Sir. Class 9 to 12, Regular and Applied Maths, small batches and weekly tests, close to our Alkapuri and Sama branches.",
};

const content: SeoContent = {
  eyebrow: "Serving Fatehgunj",
  title: "Maths Classes for Fatehgunj, Vadodara",
  intro:
    "Students from Fatehgunj study maths with Snehal Sir at Inspire Academy of Mathematics. With branches in Alkapuri (R.C. Dutt Road) and Sama, both close to Fatehgunj, you get small-batch, concept-first coaching for Class 9 to 12, Regular and Applied Maths.",
  whoFor: [
    "Students and parents in Fatehgunj, Sayajigunj and central Vadodara",
    "Class 9 to 12 students who want personal attention, not a crowded class",
    "CBSE and GSEB students, since the NCERT base serves both",
    "Students choosing Applied Maths or preparing for JEE and GUJCET",
  ],
  teaching:
    "For Fatehgunj students, the Alkapuri branch on R.C. Dutt Road is usually the closest. Sir teaches every batch himself, starting from the concept, building on NCERT, and running a weekly test so nothing slips before the boards.",
  faqs: [
    {
      q: "Which branch is nearest to Fatehgunj?",
      a: "The Alkapuri branch (R.C. Dutt Road) is closest for most of Fatehgunj. We also have a Sama branch on New Sama Road. Message us and we will point you to the easier one.",
    },
    {
      q: "Which classes and boards do you cover?",
      a: "Class 9 to 12, Regular and Applied Maths, NCERT-based for both CBSE and GSEB, with JEE and GUJCET preparation included where relevant.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Tell us your class and school on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-classes-fatehgunj-vadodara" />;
}
