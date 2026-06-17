import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Classes in Alkapuri, Vadodara",
  description:
    "Maths classes and tuition in Alkapuri, Vadodara by Snehal Sir. Our Alkapuri branch at R.C. Dutt Road covers Class 9 to 12, Regular and Applied Maths, small batches, weekly tests.",
};

const content: SeoContent = {
  eyebrow: "Alkapuri branch",
  title: "Maths Classes in Alkapuri, Vadodara",
  intro:
    "Looking for maths classes in Alkapuri? Inspire Academy of Mathematics runs a branch at 202, Dwarkesh Complex, R.C. Dutt Road, Alkapuri, taught personally by Snehal Sir. Class 9 to 12, Regular and Applied Maths, in small batches.",
  body: [
    "Our Alkapuri branch puts experienced maths coaching right in central Vadodara, at 202, Dwarkesh Complex, R.C. Dutt Road. For students in and around Alkapuri, it means Sir's teaching without a long commute.",
    "The Alkapuri batches run exactly like the main branch: Snehal Sir teaches Class 9 to 12 himself, Regular and Applied, starting from concepts, building on NCERT, and running a weekly test with mistake analysis. The teaching, batch size and personal attention are identical at both branches.",
    "With groups capped at 20, every Alkapuri student gets real doubt-solving time with Sir, not a seat in a crowded hall. It suits students near R.C. Dutt Road, Sayajigunj and the central parts of the city.",
  ],
  bodyImageSide: "right",
  whoFor: [
    "Students and parents in and around Alkapuri who want maths classes close to home",
    "Class 9 to 12 students, CBSE or GSEB, who want concept-first teaching",
    "Commerce and Science students choosing Applied Maths",
    "Anyone near R.C. Dutt Road, Sayajigunj or central Vadodara",
  ],
  teaching:
    "The Alkapuri branch follows the same method Snehal Sir has used for 25+ years: start from the concept, build on NCERT, practise real exam questions, and run a weekly test with mistake analysis. Batches are capped at 20 so every student gets personal doubt-solving with Sir.",
  faqs: [
    {
      q: "Where exactly is the Alkapuri branch?",
      a: "202, Dwarkesh Complex, R.C. Dutt Road, Alkapuri, Vadodara. Message us on WhatsApp and we will share the exact location and current batch timings.",
    },
    {
      q: "Which classes are taught at Alkapuri?",
      a: "Class 9 to 12, both Regular and Applied Maths, NCERT-based for CBSE and GSEB, with JEE and GUJCET preparation included where relevant.",
    },
    {
      q: "What are the timings and fees?",
      a: "They depend on the class and batch. Send us your class and school on WhatsApp and we will share the current Alkapuri timings and fees.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-classes-alkapuri-vadodara" />;
}
