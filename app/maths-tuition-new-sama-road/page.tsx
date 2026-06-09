import SeoPage, { type SeoContent } from "@/components/site/SeoPage";

export const metadata = {
  title: "Maths Tuition in New Sama Road, Vadodara",
  description:
    "Maths tuition in New Sama Road, Vadodara, led by Snehal Soni Sir. Offline coaching for Class 9 to 12, Applied, JEE and GUJCET, close to home.",
};

const content: SeoContent = {
  eyebrow: "Maths tuition near you",
  title: "Maths Tuition in New Sama Road, Vadodara",
  intro:
    "Inspire Academy of Mathematics is on New Sama Road, Vadodara, led by Snehal Soni Sir. Offline maths coaching for Class 9 to 12, Applied, JEE and GUJCET, close to home.",
  whoFor: [
    "Families in New Sama Road, Sama, Karelibaug and nearby areas",
    "Students who want offline, in-person maths classes near home",
    "Parents looking for an experienced local maths teacher",
    "Class 9 to 12, Applied, JEE and GUJCET students",
  ],
  covered: [
    "Class 9 to 12 maths, boards and competitive",
    "Applied Maths, NCERT, JEE and GUJCET preparation",
    "Weekly tests and printed notes",
    "Personal doubt-solving with Sir",
    "Progress updates for parents when required",
    "A short distance from Sama, Karelibaug, Nizampura and Harni",
  ],
  teaching:
    "Inspire Academy is at 3, Nand Complex, near Umiyangagar, New Sama Road. Classes are offline and in person, taught by Snehal Soni Sir himself, so students from New Sama Road and nearby areas get serious maths coaching without travelling across the city.",
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
  return <SeoPage content={content} />;
}
