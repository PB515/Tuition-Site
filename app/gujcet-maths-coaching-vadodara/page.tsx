import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "GUJCET Maths Coaching in Vadodara",
  description:
    "GUJCET maths coaching in Vadodara by Snehal Sir. GUJCET-pattern maths prepared alongside Class 12 GSEB boards, with exam-pattern practice, weekly tests and small batches.",
};

const content: SeoContent = {
  eyebrow: "Competitive prep",
  title: "GUJCET Maths Coaching in Vadodara",
  intro:
    "GUJCET maths sits right on top of the Class 12 GSEB syllabus, so it is best prepared together with the boards. At Inspire Academy of Mathematics, Snehal Sir covers GUJCET-pattern maths inside the Class 12 system, with the exam format practised, not a simplified version.",
  whoFor: [
    "Class 12 Science students appearing for GUJCET",
    "GSEB students who want GUJCET and board maths prepared together",
    "Students who want real GUJCET-pattern questions, not just textbook sums",
    "Anyone in Vadodara wanting small-batch, teacher-led GUJCET maths prep",
  ],
  teaching:
    "GUJCET maths is about accuracy and speed on a known pattern. Sir teaches the concept, drills GUJCET-style questions, and runs weekly tests with mistake analysis so errors are fixed well before the exam. Small batches mean personal doubt-solving throughout.",
  faqs: [
    {
      q: "Is GUJCET maths taught separately?",
      a: "It is prepared inside the Class 12 batch, alongside the GSEB board syllabus, since the two overlap heavily. Students cover both in one structured system.",
    },
    {
      q: "Do you cover the GUJCET exam pattern?",
      a: "Yes. We practise real GUJCET-pattern maths questions and timing, followed by mistake analysis, so the exam format feels familiar on the day.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Send your class and school on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/gujcet-maths-coaching-vadodara" />;
}
