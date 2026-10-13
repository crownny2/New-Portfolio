const SITE_URL = "https://crownjames.vercel.app";
const PERSON_ID = `${SITE_URL}/#person`;
const PAPER_URL = "https://doi.org/10.1117/12.3119413";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Crown James C. Cedeño",
      alternateName: ["Crown James Cedeño", "Crown James Cedeno"],
      url: SITE_URL,
      image: `${SITE_URL}/profile/grad.jpg`,
      email: "mailto:kacrown4@gmail.com",
      jobTitle: "Full Stack Developer",
      description:
        "Information Technology graduate of Holy Cross of Davao College and co-author of a Scopus-indexed SPIE paper on CNN-based rice grain purity analysis presented at ICMIP 2026 in Sapporo, Japan.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Davao City",
        addressCountry: "PH",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Holy Cross of Davao College",
      },
      knowsAbout: [
        "Web Development",
        "Next.js",
        "React",
        "React Native",
        "Convolutional Neural Networks",
        "Image Processing",
      ],
      sameAs: [
        "https://github.com/crownny2",
        "https://www.researchgate.net/scientific-contributions/Crown-James-C-Cedeno-2361831243",
        "https://www.linkedin.com/in/crown-james-cedeno/",
        // "https://www.facebook.com/YOUR-FACEBOOK-USERNAME",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      "@id": PAPER_URL,
      url: PAPER_URL,
      headline:
        "A CNN-based biological image processing and multimedia framework for rice grain purity analysis using enhanced mobile imaging",
      datePublished: "2026",
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: "14298",
        name: "Proceedings of SPIE — 11th International Conference on Multimedia and Image Processing (ICMIP 2026)",
      },
      author: [
        { "@type": "Person", name: "Jazrel Shan Kurvy A. Balbuena" },
        { "@id": PERSON_ID },
        { "@type": "Person", name: "Geovin Josh O. Algusar" },
        { "@type": "Person", name: "Drexler Van R. Arroyo" },
        { "@type": "Person", name: "Arvin G. Lauron" },
        { "@type": "Person", name: "Owen B. Pilongo" },
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
