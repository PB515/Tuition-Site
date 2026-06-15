import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes in Karelibaug, Vadodara",
  description:
    "Maths classes and tuition for students in Karelibaug, Vadodara by Snehal Sir. Class 9 to 12, Regular and Applied Maths, small batches and weekly tests, a short ride from our Sama and Alkapuri branches.",
};

const content: SeoContent = {
  eyebrow: "Serving Karelibaug",
  title: "Maths Classes for Karelibaug, Vadodara",
  intro:
    "Many of our students come from Karelibaug to learn maths with Snehal Sir. With branches in Sama (New Sama Road) and Alkapuri, both an easy ride from Karelibaug, you get focused, small-batch coaching for Class 9 to 12, Regular and Applied Maths.",
  whoFor: [
    "Students and parents in Karelibaug and nearby areas of east Vadodara",
    "Class 9 to 12 students who want concept-first, NCERT-based teaching",
    "CBSE and GSEB students aiming to lift their board marks",
    "Students choosing Applied Maths or preparing for JEE and GUJCET",
  ],
  teaching:
    "Karelibaug students choose us for the same reason others do: Sir teaches every class himself, in small batches, starting from the concept and testing weekly. The Sama branch on New Sama Road is the closest for most of Karelibaug.",
  faqs: [
    {
      q: "Which branch is nearest to Karelibaug?",
      a: "Our Sama branch on New Sama Road is the closest for most of Karelibaug. We also have an Alkapuri branch. Message us and we will suggest the easier one for you.",
    },
    {
      q: "Do you teach both CBSE and GSEB?",
      a: "Yes. The teaching is NCERT-based, which serves both CBSE and GSEB students from Class 9 to 12.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Send your class and school on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-classes-karelibaug-vadodara" />;
}
