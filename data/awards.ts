export type Award = {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: "trophy" | "medal" | "globe" | "book";
  // Optional path to a photo/scan of the actual award certificate.
  // Drop the image into /public/awards/ and point this at it, e.g.
  // "/awards/technofair-2026.jpg". Leave undefined to show the icon only.
  image?: string;
  // Optional external link (e.g. a DOI page). If set, the card becomes
  // clickable and opens this in a new tab instead of/alongside the image.
  link?: string;
};

// Sourced from resume — RiceSure recognitions.
export const awards: Award[] = [
  {
    title: "2nd Runner-Up — SDG 2: Zero Hunger Category",
    organization: "TechnoFair 2026, Holy Cross of Davao College",
    year: "2026",
    description:
      "Recognized among campus-wide research entries for RiceSure, an AI-powered rice grain purity detection app tackling food security under the Zero Hunger SDG track.",
    icon: "trophy",
    image: "/awards/techno.jpg",
  },
  {
  title: "2nd Best Research Paper",
  organization: "Center for Research and Development Conversazione 2026",
  year: "2026",
  description:
    "Awarded for the research paper documenting RiceSure's CNN-based rice grain classification methodology and results.",
  icon: "medal",
  image: "/awards/crd.jpg",
},
  {
    title: "International Conference Presenter",
    organization: "11th International Conference on Multimedia and Image Processing (ICMIP 2026), Sapporo, Japan",
    year: "2026",
    description:
      "Presented RiceSure's research and technical approach to an international academic audience in image processing and multimedia.",
    icon: "globe",
    image: "/awards/japan.png",
  },
  {
    title: "Published in SPIE Digital Library",
    organization: "Proceedings of SPIE, Volume 14298 (ICMIP 2026)",
    year: "2026",
    description:
      "\"A CNN-based biological image processing and multimedia framework for rice grain purity analysis using enhanced mobile imaging\" — DOI: 10.1117/12.3119413",
    icon: "book",
    link: "https://doi.org/10.1117/12.3119413",
  },
];
