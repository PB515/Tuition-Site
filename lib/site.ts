// Single source of truth for site content + contact. No hardcoded copy in components.
// Shape rule (locked): buttons = full pill, cards = rounded-2xl (16px), chips/inputs = rounded-lg.

// Canonical site URL (sitemap, robots, OG, structured data). Override with
// NEXT_PUBLIC_SITE_URL once a custom domain is connected.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://tuition-site-git-main-purven-s-projects.vercel.app";

export const SITE = {
  name: "Inspire Academy of Mathematics",
  teacher: "Snehal Sir",
  phoneDisplay: "+91 98980 41402",
  tel: "+919898041402",
  whatsapp: "919898041402",
  email: "sonideepsneh@gmail.com",
  address: "3, Nand Complex, near Umiyangagar, New Sama Road, Vadodara",
  yearsExperience: "25+",
  since: "2000",
  mapsQuery: "Inspire Academy of Mathematics, New Sama Road, Vadodara",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_ENQUIRY = waLink(
  "Hi Inspire Academy, I want admission details for Math coaching.",
);

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;

// Two branches in Vadodara. The main branch (Sama) carries the embedded map;
// Alkapuri is link-only (its own Google share link, no embed).
export const BRANCHES: {
  name: string;
  main: boolean;
  address: string;
  mapsLink: string;
  mapsEmbed: string | null;
}[] = [
  {
    name: "Sama (New Sama Road)",
    main: true,
    address: SITE.address,
    mapsLink: MAPS_LINK,
    mapsEmbed: MAPS_EMBED,
  },
  {
    name: "Alkapuri",
    main: false,
    address: "202, Dwarkesh Complex, R.C. Dutt Road, Alkapuri, Vadodara",
    mapsLink: "https://share.google/jHdIm6YLPuQKel2bb",
    mapsEmbed: null,
  },
];

export const ENQUIRY_CLASSES = [
  "Class 9",
  "Class 10",
  "Class 11 Regular",
  "Class 11 Applied",
  "Class 12 Regular",
  "Class 12 Applied",
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
  { label: "Class 9", note: "Build strong foundations before the board years begin", href: "/class-9-maths-coaching-vadodara" },
  { label: "Class 10", note: "Concept-first board preparation with proven results", href: "/class-10-maths-coaching-vadodara" },
  { label: "Class 11 Regular-Math", note: "The steepest jump in school math, made manageable", href: "/class-11-maths-coaching-vadodara" },
  { label: "Class 11 Applied-Math", note: "The real-world, data-driven math track", href: "/class-11-applied-maths-coaching-vadodara" },
  { label: "Class 12 Regular-Math", note: "Boards, JEE and GUJCET prepared together, in depth", href: "/class-12-maths-coaching-vadodara" },
  { label: "Class 12 Applied-Math", note: "Where Inspire scored 97 out of 100", href: "/class-12-applied-maths-coaching-vadodara" },
];

// Class chips for the segment router below the hero.
export const CLASS_CHIPS = [
  { label: "Class 9", href: "/class-9-maths-coaching-vadodara" },
  { label: "Class 10", href: "/class-10-maths-coaching-vadodara" },
  { label: "Class 11 Regular-Math", href: "/class-11-maths-coaching-vadodara" },
  { label: "Class 11 Applied-Math", href: "/class-11-applied-maths-coaching-vadodara" },
  { label: "Class 12 Regular-Math", href: "/class-12-maths-coaching-vadodara" },
  { label: "Class 12 Applied-Math", href: "/class-12-applied-maths-coaching-vadodara" },
];

export const METHOD_STEPS = [
  { title: "Start with the real-world idea", body: "Every concept is introduced through what it means and where it is used, before a single formula appears." },
  { title: "Build on NCERT, don't race past it", body: "NCERT is the spine of every class, giving CBSE and GSEB students one solid, shared foundation." },
  { title: "Work through problems together", body: "Problems are solved step by step, out loud, so students learn to think on paper, not just memorise steps." },
  { title: "Practise with real exam questions", body: "Real board, GUJCET and JEE style questions, with handcrafted material for specific needs." },
  { title: "Test every week without exception", body: "Consistent testing is the real preparation. Each test is followed by a mistake-analysis session." },
  { title: "Personal doubt-solving with Sir", body: "Small batches mean Sir knows every student's weak spots, so doubts are answered personally, never left for later." },
];

export const FAQS = [
  {
    q: "Who actually teaches the classes?",
    a: "Snehal Sir teaches all classes from 9 to 12 personally. Parents often ask because they have been promised experienced faculty elsewhere and got someone else. That does not happen here.",
  },
  {
    q: "What makes Applied Math coaching different here?",
    a: "Applied Math is a relatively new subject, and most centres treat it as a lighter version of standard Math. It is not. Snehal Sir has built a dedicated approach and study material around what the subject actually tests, real-world mathematical thinking. The results speak for themselves.",
  },
  {
    q: "How many students are in one batch?",
    a: "A maximum of 20 students per batch. This is non-negotiable, it is what makes personal attention possible.",
  },
  {
    q: "Which boards and exams do you cover?",
    a: "All teaching is NCERT-based, which serves both CBSE and GSEB students. We prepare students for the boards, JEE and GUJCET, and other competitive exams within the same structured system.",
  },
  {
    q: "Do you take regular tests?",
    a: "Every week, without exception. Students receive printed notes, sit a weekly test, and get direct feedback on their mistakes from Sir.",
  },
  {
    q: "Will parents receive updates?",
    a: "Yes. The parent app gives you real-time attendance, test scores, fee records and exam reminders, so you always know where your child stands.",
  },
  {
    q: "My child really fears math. Can Inspire help?",
    a: "This is the most common worry we hear, and the answer is yes. Most students who fear math are missing one earlier concept, not the whole subject. Sir starts by finding that gap and rebuilding from there, so confidence returns along with understanding.",
  },
];
