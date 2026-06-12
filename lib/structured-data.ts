import { SITE, AREAS, SITE_URL } from "./site";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: SITE.name,
    url: SITE_URL,
    telephone: SITE.tel,
    description:
      "Focused offline math coaching in Vadodara led by Snehal Sir, with 25+ years of teaching. Class 9 to 12, Applied Math, NCERT, JEE and GUJCET.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3, Nand Complex, near Umiyangagar, New Sama Road",
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    areaServed: AREAS.map((a) => `${a}, Vadodara`),
    founder: { "@type": "Person", name: SITE.teacher },
  };
}

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.teacher,
    jobTitle: "Mathematics Teacher",
    description:
      "Mathematics teacher in Vadodara with 25+ years of experience, teaching since 2000.",
    worksFor: { "@type": "EducationalOrganization", name: SITE.name },
  };
}
