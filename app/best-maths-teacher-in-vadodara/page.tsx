import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Best Maths Teacher in Vadodara, Snehal Sir",
  description:
    "Looking for the best maths teacher in Vadodara? Snehal Sir has 25+ years of experience, was Head of the Mathematics Department at Navrachana School, and teaches Class 9 to 12 personally in small batches.",
};

const content: SeoContent = {
  eyebrow: "The teacher",
  title: "Best Maths Teacher in Vadodara",
  intro:
    "If you are looking for the best maths teacher in Vadodara, Snehal Sir teaches every class personally at Inspire Academy of Mathematics. With 25+ years of experience and a record as Head of the Mathematics Department at Navrachana School, he turns students who fear maths into students who understand it.",
  whoFor: [
    "Parents who want an experienced, proven teacher, not a rotating set of tutors",
    "Students who have struggled with maths and want it explained clearly",
    "Class 9 to 12 students, Regular or Applied, CBSE or GSEB",
    "Families who value small batches and personal attention over big classes",
  ],
  teaching:
    "What makes Sir different is the same thing 25 years in the classroom teaches you: where students get stuck, why, and how to bring them back. He holds a BSc and MSc in Mathematics and a B.Ed, taught Higher Secondary maths at Navrachana School (Sama) and Navrachana International (Bhayli), and now teaches every batch himself. His Applied Maths students have scored up to 97 out of 100, the highest in Navrachana. Concepts come first, NCERT is the spine, tests are weekly, and doubts are solved with Sir personally.",
  faqs: [
    {
      q: "Who is the best maths teacher in Vadodara?",
      a: "Snehal Sir, founder of Inspire Academy of Mathematics, is among Vadodara's most experienced maths teachers, with 25+ years of teaching and a record as Head of the Mathematics Department at Navrachana School. He teaches Class 9 to 12 personally in small batches.",
    },
    {
      q: "What are his qualifications?",
      a: "A BSc and MSc in Mathematics and a B.Ed. He taught Higher Secondary mathematics at Navrachana School, Sama (2006 to 2024), where he served as Head of the Mathematics Department, and at Navrachana International, Bhayli.",
    },
    {
      q: "Does Sir teach the classes himself?",
      a: "Yes. For Class 9 to 12, Snehal Sir is personally present in every session. Not a substitute, not a junior tutor.",
    },
    {
      q: "How can I join or know the fees?",
      a: "Message us on WhatsApp with your class and school, and we will share the right batch, timings and fees at the Sama or Alkapuri branch.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/best-maths-teacher-in-vadodara" />;
}
