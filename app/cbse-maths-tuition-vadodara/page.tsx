import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "CBSE Maths Tuition in Vadodara",
  description:
    "CBSE maths tuition in Vadodara by Snehal Sir. NCERT-based teaching for CBSE Class 9 to 12, Regular and Applied Maths, with small batches, weekly tests and personal doubt-solving.",
};

const content: SeoContent = {
  eyebrow: "CBSE board",
  title: "CBSE Maths Tuition in Vadodara",
  intro:
    "CBSE maths is built on NCERT, and so is our teaching. At Inspire Academy of Mathematics, Snehal Sir prepares CBSE students from Class 9 to 12, Regular and Applied Maths, with the concept-first method that holds up under board pressure.",
  body: [
    "CBSE maths is built on NCERT, and so is the way Snehal Sir teaches. Nothing in the book is skipped or rushed, because the questions that decide board marks come straight from a thorough command of it.",
    "Each chapter starts from the concept, moves through NCERT and board-pattern questions, and is tested every week, with a session afterwards that goes through each mistake. Class 9 to 12 CBSE students get the same concept-first teaching, and the foundation also serves anyone heading towards JEE.",
    "Batches are capped at 20, so Sir knows where each CBSE student is and clears doubts personally. The aim is a student who is comfortable with the whole syllabus, not just the chapters they liked.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "CBSE students from Class 9 to 12 in Vadodara",
    "Students who want NCERT covered thoroughly, not skipped",
    "Commerce and Science students choosing Applied Maths",
    "Students aiming to lift CBSE board marks with steady practice",
  ],
  teaching:
    "Because the teaching is NCERT-based, it maps directly to the CBSE pattern. Every chapter starts from the concept, moves to NCERT and board-style questions, and is tested weekly with mistake analysis. Small batches mean each CBSE student gets personal attention from Sir.",
  faqs: [
    {
      q: "Is the teaching suited to the CBSE pattern?",
      a: "Yes. It is NCERT-based, which is the core of the CBSE syllabus, with board-pattern question practice and weekly tests built in.",
    },
    {
      q: "Do you also teach GSEB students?",
      a: "Yes. The NCERT base serves both CBSE and GSEB, so students from either board are covered in the same batches.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Message us on WhatsApp with your class and school and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/cbse-maths-tuition-vadodara" />;
}
