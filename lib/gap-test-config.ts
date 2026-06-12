// Concept-Gap Test config. This is a SELF-ASSESSMENT (student rates their own
// confidence per chapter), not a graded test, so no answer key is published and
// nothing here can be "wrong math" on a public page.
//
// REVIEW WITH SIR: adjust the chapter list for each class as needed. This is the
// single editable source for the killer feature (the domain-expert dependency).

export type GapClass = { id: string; label: string; chapters: string[] };

export const GAP_CLASSES: GapClass[] = [
  {
    id: "class-9",
    label: "Class 9",
    chapters: [
      "Number Systems",
      "Polynomials",
      "Linear Equations in Two Variables",
      "Triangles",
      "Quadrilaterals",
      "Circles",
      "Surface Areas and Volumes",
      "Statistics",
    ],
  },
  {
    id: "class-10",
    label: "Class 10",
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Trigonometry",
      "Coordinate Geometry",
    ],
  },
  {
    id: "class-11",
    label: "Class 11",
    chapters: [
      "Sets and Functions",
      "Trigonometric Functions",
      "Complex Numbers",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines and Conics",
      "Limits and Derivatives",
    ],
  },
  {
    id: "class-12",
    label: "Class 12",
    chapters: [
      "Matrices and Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Differential Equations",
      "Vectors",
      "Three-Dimensional Geometry",
      "Probability",
    ],
  },
  {
    id: "applied",
    label: "Applied Math",
    chapters: [
      "Numbers and Quantification",
      "Algebra and Matrices",
      "Calculus",
      "Probability Distributions",
      "Inferential Statistics",
      "Financial Mathematics",
      "Linear Programming",
      "Data Interpretation",
    ],
  },
  {
    id: "gujcet",
    label: "GUJCET",
    chapters: [
      "Relations and Functions",
      "Matrices and Determinants",
      "Differentiation",
      "Integration",
      "Differential Equations",
      "Vectors and 3D Geometry",
      "Application of Derivatives",
      "Probability",
    ],
  },
  {
    id: "jee",
    label: "JEE",
    chapters: [
      "Quadratic Equations and Sequences",
      "Trigonometry",
      "Complex Numbers",
      "Permutations and Combinations",
      "Coordinate Geometry",
      "Limits and Continuity",
      "Integral Calculus",
      "Vectors and 3D Geometry",
    ],
  },
];

export const RATINGS = [
  { value: "good", label: "Confident" },
  { value: "practice", label: "Need practice" },
  { value: "weak", label: "Not yet" },
] as const;

export type Rating = (typeof RATINGS)[number]["value"];
