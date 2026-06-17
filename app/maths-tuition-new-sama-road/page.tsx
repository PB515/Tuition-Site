import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Math Tuition in New Sama Road, Vadodara",
  description:
    "Math tuition in New Sama Road, Vadodara, led by Snehal Sir. Offline coaching for Class 9 to 12, Applied, JEE and GUJCET, close to home.",
};

const content: SeoContent = {
  eyebrow: "Math tuition near you",
  title: "Math Tuition in New Sama Road, Vadodara",
  intro:
    "Inspire Academy of Mathematics is on New Sama Road, Vadodara, led by Snehal Sir. Offline math coaching for Class 9 to 12, Applied, JEE and GUJCET, close to home.",
  body: [
    "For families on and around New Sama Road, Inspire Academy of Mathematics is genuinely close to home. Our main branch sits at 3, Nand Complex, near Umiyangagar, so students get serious maths coaching without travelling across the city.",
    "Every class here is taught in person by Snehal Sir himself, for Class 9 to 12, Regular and Applied. The method is the same that has worked for 25+ years: start from the concept, build on NCERT, practise real exam questions, and test every week with honest mistake analysis.",
    "Because batches are capped at 20, Sir knows each student personally and clears doubts on the spot. For New Sama Road and the areas around it, it is local, experienced, offline coaching, the kind that is getting rare.",
  ],
  bodyImageSide: "left",
  whoFor: [
    "Families in New Sama Road, Sama, Karelibaug and nearby areas",
    "Students who want offline, in-person math classes near home",
    "Parents looking for an experienced local math teacher",
    "Class 9 to 12, Applied, JEE and GUJCET students",
  ],
  covered: [
    "Class 9 to 12 math, boards and competitive",
    "Applied Math, NCERT, JEE and GUJCET preparation",
    "Weekly tests and printed notes",
    "Personal doubt-solving with Sir",
    "Progress updates for parents when required",
    "A short distance from Sama, Karelibaug, Nizampura and Harni",
  ],
  teaching:
    "Inspire Academy is at 3, Nand Complex, near Umiyangagar, New Sama Road. Classes are offline and in person, taught by Snehal Sir himself, so students from New Sama Road and nearby areas get serious math coaching without travelling across the city.",
  faqs: [
    {
      q: "Where exactly is the academy?",
      a: "3, Nand Complex, near Umiyangagar, New Sama Road, Vadodara. The map is on our contact page.",
    },
    {
      q: "Which areas do students come from?",
      a: "Mostly New Sama Road, Sama, Karelibaug, Fatehgunj, Nizampura, Chhani, Harni and Alkapuri.",
    },
    {
      q: "Are classes online or offline?",
      a: "Offline and in person only, so students get direct attention from Sir.",
    },
  ],
};

export default function Page() {
  return <SeoPage content={content} path="/maths-tuition-new-sama-road" />;
}
