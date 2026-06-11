// Single source of truth for site content + contact. No hardcoded copy in components.
// Shape rule (locked): buttons = full pill, cards = rounded-2xl (16px), chips/inputs = rounded-lg.

// Canonical site URL (sitemap, robots, OG, structured data). Override with
// NEXT_PUBLIC_SITE_URL once a custom domain is connected.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://tuition-site-git-main-purven-s-projects.vercel.app";

export const SITE = {
  name: "Inspire Academy of Mathematics",
  teacher: "Snehal Soni Sir",
  phoneDisplay: "+91 90166 79929",
  tel: "+919016679929",
  whatsapp: "919016679929",
  address: "3, Nand Complex, near Umiyangagar, New Sama Road, Vadodara",
  yearsExperience: "25+",
  since: "2000",
  mapsQuery: "Inspire Academy of Mathematics, New Sama Road, Vadodara",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_ENQUIRY = waLink(
  "Hi Inspire Academy, I want admission details for Maths coaching.",
);

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;

export const ENQUIRY_CLASSES = [
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Applied Maths",
  "JEE",
  "GUJCET",
  "Other",
];

export const NAV = [
  { label: "About Sir", href: "/about-snehal-soni-sir" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/results" },
  { label: "Method", href: "/teaching-method" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const AREAS = [
  "New Sama Road",
  "Sama",
  "Karelibaug",
  "Fatehgunj",
  "Nizampura",
  "Chhani",
  "Harni",
  "Alkapuri",
];

// Course tiles. Launch SEO pages get their own route; staged ones point to /courses for now.
export const COURSES = [
  { label: "Class 9 Maths", note: "Build the base for the board year", href: "/class-9-maths-coaching-vadodara" },
  { label: "Class 10 Maths", note: "Board-focused, concept and practice", href: "/class-10-maths-coaching-vadodara" },
  { label: "Class 11 Maths", note: "The jump to higher maths, made clear", href: "/class-11-maths-coaching-vadodara" },
  { label: "Class 12 Maths", note: "Boards plus competitive readiness", href: "/class-12-maths-coaching-vadodara" },
  { label: "Applied Maths", note: "Where Inspire scored 97 out of 100", href: "/applied-maths-coaching-vadodara" },
  { label: "GUJCET Maths", note: "Timed, exam-pattern practice", href: "/gujcet-maths-coaching-vadodara" },
  { label: "JEE Maths", note: "Deeper problem-solving for JEE", href: "/jee-maths-coaching-vadodara" },
];

// Class chips for the segment router below the hero.
export const CLASS_CHIPS = [
  { label: "Class 9", href: "/class-9-maths-coaching-vadodara" },
  { label: "Class 10", href: "/class-10-maths-coaching-vadodara" },
  { label: "Class 11", href: "/class-11-maths-coaching-vadodara" },
  { label: "Class 12", href: "/class-12-maths-coaching-vadodara" },
  { label: "Applied", href: "/applied-maths-coaching-vadodara" },
  { label: "GUJCET", href: "/gujcet-maths-coaching-vadodara" },
  { label: "JEE", href: "/jee-maths-coaching-vadodara" },
];

export const METHOD_STEPS = [
  { title: "Concept clarity first", body: "Every topic starts from the idea, not the formula, so it actually sticks." },
  { title: "NCERT foundation", body: "NCERT-based teaching that covers both CBSE and GSEB students." },
  { title: "Step-by-step problem solving", body: "Worked the way an examiner expects, one clean step at a time." },
  { title: "Exam-pattern practice", body: "Real board, GUJCET and JEE style questions, not just textbook sums." },
  { title: "Weekly tests and mistake analysis", body: "A test every week, then a close look at what went wrong and why." },
  { title: "Doubt-solving and revision", body: "Personal doubt-solving with Sir, plus planned revision before exams." },
];

export const FAQS = [
  {
    q: "Which boards and exams do you cover?",
    a: "Teaching is NCERT-based, which covers both CBSE and GSEB students, along with Applied Maths, JEE and GUJCET preparation.",
  },
  {
    q: "What are the batch timings?",
    a: "Batches run through the week. Tell us your class and school on WhatsApp and we will share the current timings that fit.",
  },
  {
    q: "What is the fee?",
    a: "Fees depend on the class and batch. We explain them directly when you enquire, so you get the right batch first.",
  },
  {
    q: "How many students are in one batch?",
    a: "Batches are kept small, so every student gets personal attention from Snehal Soni Sir.",
  },
  {
    q: "Do you take regular tests?",
    a: "Yes. Weekly tests, followed by mistake analysis, are a fixed part of the schedule. Printed notes are provided too.",
  },
  {
    q: "Will parents get progress updates?",
    a: "Yes. Parents receive important test, class and progress updates from the academy team when required.",
  },
];
