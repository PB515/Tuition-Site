import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "GUJCET Maths Coaching in Vadodara",
  description:
    "GUJCET maths coaching in Vadodara by Snehal Soni Sir. Timed, exam-pattern practice for the maths section, alongside the Class 12 board syllabus.",
};

const content: SeoContent = {
  eyebrow: "Competitive exam",
  title: "GUJCET Maths Coaching in Vadodara",
  intro:
    "GUJCET maths coaching by Snehal Soni Sir, with timed, exam-pattern practice for the Gujarat Common Entrance Test, alongside the Class 12 board syllabus.",
  whoFor: [
    "Class 12 science students preparing for GUJCET",
    "Students who want the maths section of GUJCET handled by a specialist",
    "Students who want speed and accuracy under time pressure",
    "GSEB and CBSE students sitting GUJCET",
  ],
  covered: [
    "The Class 12 maths topics that GUJCET draws from",
    "Quick methods for objective, MCQ-style questions",
    "Timed practice that builds speed and accuracy",
    "Common traps and how to avoid them",
    "Regular mock-style tests on the GUJCET pattern",
    "Targeted revision of weak chapters before the exam",
  ],
  teaching:
    "GUJCET maths rewards speed and accuracy on objective questions. Practice is timed and pattern-based, so students learn to solve quickly without careless mistakes. Weak chapters are found through weekly tests and fixed before the exam.",
  faqs: [
    {
      q: "Does GUJCET coaching also help with boards?",
      a: "Yes. GUJCET draws on the Class 12 maths syllabus, so the preparation strengthens board performance too.",
    },
    {
      q: "Is the practice timed?",
      a: "Yes. Objective, exam-pattern questions are practised under time, which is what GUJCET tests.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the batch. Message us on WhatsApp and we will share current timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} />;
}
