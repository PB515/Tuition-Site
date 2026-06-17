import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes near Karelibaug, Vadodara",
  description:
    "Maths classes near Karelibaug, Vadodara by Snehal Sir. Students from Karelibaug join our New Sama Road or Alkapuri branches for Class 9 to 12, Regular and Applied Maths, JEE and GUJCET, with small batches and weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Near Karelibaug",
  title: "Maths Classes near Karelibaug, Vadodara",
  intro:
    "Looking for maths tuition near Karelibaug? Inspire Academy of Mathematics teaches Class 9 to 12 Maths, Applied Maths, JEE Maths and GUJCET Maths at our New Sama Road and Alkapuri branches. Students from Karelibaug and nearby areas can easily join whichever batch location is most convenient.",
  body: [
    "Plenty of our students travel in from Karelibaug, and it is an easy trip. We do not have a branch in Karelibaug itself, but both of ours, New Sama Road and Alkapuri, are a short ride away, so students from the area join whichever batch is more convenient.",
    "Wherever they come from, the teaching is the same: Snehal Sir takes every class himself, Class 9 to 12, Regular and Applied, starting from the concept, building on NCERT, and testing weekly with honest mistake analysis.",
    "With batches capped at 20, Karelibaug students get the same personal doubt-solving as everyone else. Tell us your school and we will point you to the nearest branch and the right batch.",
  ],
  bodyImageSide: "right",
  whoFor: [
    "Students and parents in Karelibaug and nearby areas of east Vadodara",
    "Class 9 to 12 students who want concept-first, NCERT-based teaching",
    "CBSE and GSEB students aiming to lift their board marks",
    "Students choosing Applied Maths or preparing for JEE and GUJCET",
  ],
  teaching:
    "Karelibaug students choose us for the same reason others do: Sir teaches every class himself, in small batches, starting from the concept and testing weekly. Both branches are an easy ride from Karelibaug, so the travel stays short while the teaching stays personal.",
  nearby: {
    title: "Nearest branch for students from Karelibaug",
    body: "Students from Karelibaug usually choose our New Sama Road or Alkapuri branch, depending on school route, class timing and batch availability. Tell us where you are on WhatsApp and we will suggest the most convenient one.",
  },
  faqs: [
    {
      q: "Do you have a branch in Karelibaug?",
      a: "We teach students from Karelibaug at our two branches, New Sama Road and Alkapuri, both a short ride away. Message us and we will suggest the easier one for you.",
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
