import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes near Fatehgunj, Vadodara",
  description:
    "Maths classes near Fatehgunj, Vadodara by Snehal Sir. Students from Fatehgunj join our Alkapuri or New Sama Road branches for Class 9 to 12, Regular and Applied Maths, JEE and GUJCET, with small batches and weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Near Fatehgunj",
  title: "Maths Classes near Fatehgunj, Vadodara",
  intro:
    "Looking for maths tuition near Fatehgunj? Inspire Academy of Mathematics teaches Class 9 to 12 Maths, Applied Maths, JEE Maths and GUJCET Maths at our Alkapuri and New Sama Road branches. Students from Fatehgunj and nearby central Vadodara can easily join whichever batch location is most convenient.",
  body: [
    "Students from Fatehgunj study with us too, and the trip is short. We do not run a branch in Fatehgunj itself, but our Alkapuri branch on R.C. Dutt Road is usually the closer one, with New Sama Road as the other option.",
    "The teaching does not change with the address: Snehal Sir teaches every batch himself, Class 9 to 12, Regular and Applied, concept first, built on NCERT, and tested weekly with a proper look at each mistake.",
    "In batches capped at 20, every Fatehgunj student gets real attention from Sir. Message us with your class and school and we will suggest the easier branch and batch for you.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Students and parents in Fatehgunj, Sayajigunj and central Vadodara",
    "Class 9 to 12 students who want personal attention, not a crowded class",
    "CBSE and GSEB students, since the NCERT base serves both",
    "Students choosing Applied Maths or preparing for JEE and GUJCET",
  ],
  teaching:
    "Fatehgunj students get the same teaching everyone does: Sir takes every batch himself, starting from the concept, building on NCERT, and running a weekly test so nothing slips before the boards. The Alkapuri branch on R.C. Dutt Road is usually the shorter trip from Fatehgunj.",
  nearby: {
    title: "Nearest branch for students from Fatehgunj",
    body: "Students from Fatehgunj usually prefer our Alkapuri branch on R.C. Dutt Road, with New Sama Road as the other option, depending on school route, class timing and batch availability. Message us and we will point you to the easier one.",
  },
  faqs: [
    {
      q: "Do you have a branch in Fatehgunj?",
      a: "We teach students from Fatehgunj at our two branches, Alkapuri (R.C. Dutt Road) and New Sama Road. Alkapuri is usually the closer one. Message us and we will guide you.",
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
