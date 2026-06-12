import { SITE, AREAS, BRANCHES, SITE_URL } from "./site";

function postalAddress(full: string) {
  return {
    "@type": "PostalAddress",
    streetAddress: full.replace(/,?\s*Vadodara\s*$/i, ""),
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  };
}

export function organizationLd() {
  const main = BRANCHES.find((b) => b.main) ?? BRANCHES[0];
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: SITE.name,
    url: SITE_URL,
    telephone: SITE.tel,
    email: SITE.email,
    description:
      "Focused offline math coaching in Vadodara led by Snehal Sir, with 25+ years of teaching. Two branches: Alkapuri and Sama. Class 9 to 12, Applied Math, NCERT, JEE and GUJCET.",
    address: postalAddress(main.address),
    location: BRANCHES.map((br) => ({
      "@type": "Place",
      name: `${SITE.name} - ${br.name}`,
      address: postalAddress(br.address),
    })),
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
      "Mathematics teacher in Vadodara with 25+ years of experience, teaching since 2000. Holds a BSc and MSc in Mathematics and a B.Ed. Taught Higher Secondary mathematics at Navrachana School, Sama (2006 to 2024), where he served as Head of the Mathematics Department, and at Navrachana International, Bhayli.",
    knowsAbout: ["Mathematics", "Applied Mathematics", "JEE preparation", "GUJCET preparation"],
    worksFor: { "@type": "EducationalOrganization", name: SITE.name },
  };
}
