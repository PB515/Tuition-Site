import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "GSEB Maths Coaching in Vadodara",
  description:
    "GSEB maths coaching in Vadodara by Snehal Sir. NCERT-based teaching for GSEB Class 9 to 12, Regular and Applied Maths, with GUJCET prep, small batches and weekly tests.",
};

const content: SeoContent = {
  eyebrow: "GSEB board",
  title: "GSEB Maths Coaching in Vadodara",
  intro:
    "GSEB maths follows NCERT, and that is exactly how Snehal Sir teaches it. At Inspire Academy of Mathematics, GSEB students from Class 9 to 12 get concept-first coaching, with GUJCET preparation built in for Class 12 Science.",
  whoFor: [
    "GSEB students from Class 9 to 12 in Vadodara",
    "Class 12 Science students who also need GUJCET preparation",
    "Students who want clear concepts before exam technique",
    "Commerce and Science students choosing Applied Maths",
  ],
  teaching:
    "The NCERT base maps straight to the GSEB syllabus. Each topic begins with the concept, then board-pattern and GUJCET-style questions, with a weekly test and mistake analysis. Batches are small, so every GSEB student gets personal doubt-solving with Sir.",
  faqs: [
    {
      q: "Is the teaching aligned to GSEB?",
      a: "Yes. It is NCERT-based, which the GSEB syllabus follows, with board-pattern practice and, for Class 12 Science, GUJCET preparation included.",
    },
    {
      q: "Do you teach in English or Gujarati medium?",
      a: "Teaching is primarily in English with explanation support as needed. Tell us your medium and school on WhatsApp and we will guide you to the right batch.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Send your class and school on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/gseb-maths-coaching-vadodara" />;
}
