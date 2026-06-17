import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Tuition Fees in Vadodara",
  description:
    "Maths tuition fees in Vadodara at Inspire Academy of Mathematics depend on the class and batch. Here is what is included for the fee, and how to get the exact figure for your class.",
};

const content: SeoContent = {
  eyebrow: "Fees & value",
  title: "Maths Tuition Fees in Vadodara",
  intro:
    "Maths tuition fees in Vadodara vary by class, board and the amount of teaching involved. At Inspire Academy of Mathematics we keep it simple: fees depend on the class and batch, and we share the exact figure when you enquire, so you get the right batch first rather than a one-size price.",
  body: [
    "Fees are a fair question to ask early, and we keep the answer honest: the fee depends on the class and batch, so we share the exact figure when you enquire rather than quoting a one-size price that does not fit your child.",
    "What the fee pays for is the thing that actually moves marks, personal teaching by Snehal Sir himself in a batch capped at 20. It includes weekly tests with mistake analysis, his own custom study material, personal doubt-solving, and progress updates for parents. The value is in the teaching, not in a crowd.",
    "Because the right batch matters more than the lowest number, we focus on placing your child correctly first, then explain the fee clearly, with no surprises later. Message us with the class and school to get the exact figure.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Parents comparing maths tuition fees in Vadodara",
    "Families who want to know what the fee actually includes",
    "Class 9 to 12 students, Regular or Applied",
    "Anyone deciding between a big class and small-batch coaching",
  ],
  teaching:
    "The fee is for personal, small-batch teaching by Snehal Sir himself, not a crowded class. It includes weekly tests with mistake analysis, custom study material made by Sir, personal doubt-solving, and progress updates for parents. Because the value is in the teaching, we focus on the right batch for your child first, then the fee.",
  faqs: [
    {
      q: "How much is the maths tuition fee?",
      a: "It depends on the class and batch, so we share the exact figure when you enquire. Message us on WhatsApp with your class and school and we will tell you the fee and timings.",
    },
    {
      q: "What is included in the fee?",
      a: "Personal teaching by Snehal Sir in a small batch (max 20), weekly tests with mistake analysis, custom study material, personal doubt-solving, and parent progress updates.",
    },
    {
      q: "Are there different fees for Regular and Applied Maths?",
      a: "Fees can differ by class, stream and batch. Tell us whether you want Regular or Applied Maths and your class, and we will share the right fee.",
    },
    {
      q: "Is there a registration or material charge?",
      a: "Any such details are explained clearly when you enquire, before you join, so there are no surprises. Message us and we will walk you through it.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-tuition-fees-vadodara" />;
}
