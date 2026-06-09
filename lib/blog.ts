// Seed blog posts. Real, general study advice that is safe to publish.
// REVIEW WITH SIR: confirm the advice matches how the academy teaches, then add more.

export type BlogSection = { heading?: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  readingMin: number;
  excerpt: string;
  body: BlogSection[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "score-90-plus-class-10-maths",
    title: "How to Score 90+ in Class 10 Maths Boards",
    date: "2 June 2026",
    dateISO: "2026-06-02",
    readingMin: 4,
    excerpt:
      "Scoring 90+ in board maths is less about talent and more about a few steady habits. Here is what actually moves the marks.",
    body: [
      {
        paragraphs: [
          "Most students who score 90+ in Class 10 maths are not the ones who study the most hours. They are the ones who study the right things, in the right order, and fix their mistakes early. Here is a simple plan that works.",
        ],
      },
      {
        heading: "Get the NCERT basics solid first",
        paragraphs: [
          "The board paper is built on NCERT. Before any reference book, make sure every NCERT example and exercise is something you can solve on your own. This is the same for CBSE and GSEB students, because the books are the same.",
        ],
      },
      {
        heading: "Practice the full pattern, not just hard sums",
        paragraphs: [
          "Marks are lost on easy and medium questions far more often than on the toughest one. Practice the whole pattern, including the one and two mark questions, so you do not give away simple marks under exam pressure.",
        ],
      },
      {
        heading: "Fix mistakes the same week",
        paragraphs: [
          "A mistake you do not correct becomes a habit. After every test, spend time on exactly the questions you got wrong, and redo them until they are easy. A weekly test followed by this kind of analysis is the fastest way to improve.",
        ],
      },
      {
        heading: "Give extra time to the high-weight chapters",
        paragraphs: [
          "Trigonometry, geometry and algebra carry a large share of the paper, and word problems trip up many students. Put extra practice here, and ask for help the moment a chapter feels unclear rather than leaving it for later.",
        ],
      },
      {
        paragraphs: [
          "At Inspire Academy, this is exactly how we teach Class 10: concept first, full-pattern practice, a weekly test, and honest mistake analysis. If your child needs this kind of structure, message Snehal Soni Sir.",
        ],
      },
    ],
  },
  {
    slug: "applied-maths-vs-core-maths-class-11",
    title: "Applied Maths or Core Maths: How to Choose in Class 11",
    date: "26 May 2026",
    dateISO: "2026-05-26",
    readingMin: 3,
    excerpt:
      "Both are real maths, but they point in different directions. Here is a simple way to decide which one fits your plan.",
    body: [
      {
        paragraphs: [
          "When students reach Class 11, many have to choose between core Mathematics and Applied Mathematics. Both are serious subjects, but they suit different goals. Here is how to think about it.",
        ],
      },
      {
        heading: "What core maths is for",
        paragraphs: [
          "Core maths is more theoretical and is the usual choice for students heading towards engineering and exams like JEE. If you enjoy proofs, calculus and abstract problem solving, and your future plans need it, core maths is the path.",
        ],
      },
      {
        heading: "What Applied Maths is for",
        paragraphs: [
          "Applied Maths leans towards data, statistics, finance and real-world quantitative skills. It is a strong choice for students heading towards commerce, economics, data and management fields, and it is often more scoring for students who prefer practical maths.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Start from where you want to go after Class 12, then pick the subject that path needs. If you are unsure, talk to a teacher who has taught both. Inspire Academy teaches core and Applied Maths, and our highest Applied Maths score is 97 out of 100, so we can help you decide and then do well in whichever you choose.",
        ],
      },
    ],
  },
  {
    slug: "gujcet-maths-preparation-plan",
    title: "A Simple GUJCET Maths Preparation Plan",
    date: "19 May 2026",
    dateISO: "2026-05-19",
    readingMin: 3,
    excerpt:
      "GUJCET maths rewards speed and accuracy on objective questions. A short, steady plan beats last-minute cramming.",
    body: [
      {
        paragraphs: [
          "GUJCET tests how quickly and accurately you can handle objective maths questions drawn from the Class 12 syllabus. The students who do well are usually the ones who practised under time, not the ones who only revised theory. Here is a simple plan.",
        ],
      },
      {
        heading: "Know the pattern",
        paragraphs: [
          "GUJCET maths is objective and time-bound. Learn the kinds of questions that appear and how many minutes you can spend on each. Knowing the pattern removes a lot of exam-day stress.",
        ],
      },
      {
        heading: "Build speed with timed practice",
        paragraphs: [
          "Solve sets of questions with a clock running. The goal is to get faster without getting careless. Track which topics slow you down and give them more practice.",
        ],
      },
      {
        heading: "Revise the high-yield topics and take mock tests",
        paragraphs: [
          "Calculus, algebra and vectors carry steady weight, so keep them sharp. In the final weeks, take full mock tests on the GUJCET pattern, then review every mistake. At Inspire Academy, GUJCET practice is timed and pattern-based for exactly this reason.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
