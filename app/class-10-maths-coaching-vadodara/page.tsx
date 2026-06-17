import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Class 10 Math Coaching & Batches in Vadodara",
  description:
    "Class 10 math coaching and small batches in Vadodara by Snehal Sir. NCERT-based for CBSE and GSEB, with weekly tests and personal doubt-solving for the board year.",
};

const content: SeoContent = {
  eyebrow: "Board year",
  title: "Class 10 Math Coaching & Batches in Vadodara",
  intro:
    "Focused Class 10 math coaching by Snehal Sir for the board year. NCERT-based, so it works for both CBSE and GSEB students, with weekly tests and personal doubt-solving.",
  body: [
    "Class 10 is the first year that really counts. The board exam puts a number on years of work, and for many students it is also the first time maths feels like it could make or break a result. That pressure is exactly why how a student is taught in Class 10 matters so much.",
    "At Inspire, Snehal Sir teaches every Class 10 batch himself. The method is simple and proven: start from the concept until it genuinely makes sense, then practise it the way the board actually asks. Because the teaching is built on NCERT, it fits CBSE and GSEB students alike, and nothing important gets skipped. A weekly test keeps every chapter fresh, and the mistake-analysis session afterwards is where the real progress happens, as students stop repeating the small errors that quietly cost marks.",
    "Batches stay capped at 20, so Sir knows each student's weak spots and clears doubts personally instead of leaving them for later. What parents notice by the end is not only better marks, but a child who walks into the board exam calm, because the subject finally feels under control.",
  ],
  bodyImageSide: "right",
  whoFor: [
    "Class 10 students who find math hard and want it explained slowly and clearly",
    "Students aiming to lift their board marks with steady practice",
    "Parents who want an experienced teacher, not a random tutor",
    "Both CBSE and GSEB students, since the NCERT base serves both",
  ],
  covered: [
    "Real numbers, polynomials and pair of linear equations",
    "Quadratic equations and arithmetic progressions",
    "Triangles, circles and coordinate geometry",
    "Trigonometry and its applications",
    "Surface areas, volumes, statistics and probability",
    "Full board-pattern revision and test practice",
    "Custom, curated study material from Sir, not generic handouts",
  ],
  teaching:
    "Every chapter starts from the concept, then moves to NCERT and board-pattern questions, with a weekly test to catch weak spots early. Word problems and trigonometry, where Class 10 students lose the most marks, get extra attention and doubt-solving with Sir.",
  faqs: [
    {
      q: "Is this for CBSE or GSEB?",
      a: "Both. The teaching is NCERT-based and the books are the same, so CBSE and GSEB Class 10 students are both covered.",
    },
    {
      q: "How often are tests held?",
      a: "Weekly, followed by mistake analysis, so students fix errors well before the board exam.",
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
  return <SeoPage content={content} path="/class-10-maths-coaching-vadodara" />;
}
