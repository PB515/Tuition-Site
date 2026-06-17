import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes in Sama, Vadodara",
  description:
    "Maths classes and tuition in Sama, Vadodara by Snehal Sir. Our main branch on New Sama Road covers Class 9 to 12, Regular and Applied Maths, small batches, weekly tests, NCERT for CBSE and GSEB.",
};

const content: SeoContent = {
  eyebrow: "Sama branch (main)",
  title: "Maths Classes in Sama, Vadodara",
  intro:
    "Inspire Academy of Mathematics has its main branch in Sama, on New Sama Road, taught personally by Snehal Sir. If you are looking for maths classes in Sama or nearby, this is focused, small-batch coaching for Class 9 to 12, Regular and Applied Maths.",
  body: [
    "If you are looking for maths classes in Sama, our main branch is right here, on New Sama Road. Inspire Academy of Mathematics has taught Sama students for years, in person, with Snehal Sir leading every batch.",
    "The approach is steady and proven: each topic starts from the idea, builds on NCERT so CBSE and GSEB students are both covered, and is tested weekly with a session that goes through exactly what went wrong. Class 9 to 12, Regular and Applied, are all taught here.",
    "Batches are capped at 20, so Sir knows every student's weak spots and clears doubts personally. For families in Sama, Chhani Jakatnaka and the streets around New Sama Road, it is genuinely local, experienced coaching.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Students and parents in Sama, New Sama Road, Chhani Jakatnaka and nearby",
    "Class 9 to 12 students who want a teacher, not a rotating set of tutors",
    "CBSE and GSEB students, since the NCERT base serves both",
    "Students choosing Applied Maths or aiming for JEE and GUJCET",
  ],
  teaching:
    "At the Sama branch, every batch is taught by Sir himself in groups capped at 20. Each topic starts from the idea, builds on NCERT, and is tested weekly with an honest look at what went wrong, so weak chapters are caught early, well before the board exams.",
  faqs: [
    {
      q: "Where is the Sama branch?",
      a: "3, Nand Complex, near Umiyangagar, New Sama Road, Sama, Vadodara. It is our main branch. Message us on WhatsApp for the exact location and batch timings.",
    },
    {
      q: "Do you also have a branch in Alkapuri?",
      a: "Yes. We have a second branch in Alkapuri (R.C. Dutt Road). The teaching, batch size and personal attention are the same at both.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Tell us your class and school on WhatsApp and we will share the current Sama timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-classes-sama-vadodara" />;
}
