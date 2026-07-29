export type Project = {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  year?: string;
  github?: string;
  live?: string;
  featured: boolean;
  problem: string;
  solution: string;
  features: string[];
  lessons: string;
  recognitions?: string[];
};

export const projects: Project[] = [
  {
    slug: "ricesure",
    category: "Award-Winning Research Project",
    title: "RiceSure",
    description:
      "An AI-powered mobile application that detects rice grain purity using image-based classification with a Convolutional Neural Network (CNN) — helping reduce food fraud and support SDG 2: Zero Hunger.",
    image: "/projects/Ricesure.png",
    stack: ["React Native (Expo)", "Flask", "TensorFlow", "Python"],
    year: "2026",
    github:
      "https://github.com/crownny2/RiceSure-Frontend-Mobile-App-Expo-React-Native-.git",
    live: "https://ricesure-showcase.vercel.app/",
    featured: true,
    problem:
      "Verifying rice grain purity typically requires manual inspection or lab equipment inaccessible to everyday consumers, farmers, and small retailers — making it easy for adulterated rice to go undetected.",
    solution:
      "Built a mobile app where users snap a photo of rice grains; a CNN model served through a Flask backend classifies purity in seconds, returning clear, actionable results on-device.",
    features: [
      "Image-based CNN classification for rice grain purity",
      "RESTful API layer connecting React Native to the Flask/TensorFlow backend",
      "Image upload pipeline with real-time prediction feedback",
      "Responsive, user-friendly mobile interface designed for non-technical users",
    ],
    lessons:
      "Integrating a trained ML model into a production-style mobile pipeline taught me how much UX design matters even for deeply technical, model-driven products — prediction confidence needs to be communicated simply.",
    recognitions: [
      "2nd Runner-Up, SDG 2 – Zero Hunger Category, TechnoFair 2026, Holy Cross of Davao College",
      "2nd Best Research Paper, Center for Research and Development Conversazione 2026",
      "Presented at the 11th International Conference on Multimedia and Image Processing (ICMIP 2026), Sapporo, Japan",
    ],
  },
  {
    slug: "pzam-cups",
    category: "Full Stack E-Commerce",
    title: "PZAM Cups Online Ordering System",
    description:
      "A full-stack e-commerce web application for online cup ordering, with secure GCash payments, cart management, and a checkout flow optimized for both desktop and mobile.",
    image: "/projects/PZAM.png",
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "PayMongo"],
    year: "2022",
    github:
      "https://github.com/crownny2/PZAM-Cups-Online-Ordering-System-React-Vite-.git",
    live: "https://pzamcupsprintingdavao.vercel.app/",
    featured: true,
    problem:
      "The client needed a straightforward way for customers to browse products, order cups online, and pay securely without relying on manual, message-based ordering.",
    solution:
      "Developed a complete storefront with authentication, a persistent shopping cart, order management, and PayMongo-powered checkout supporting GCash and other payment methods.",
    features: [
      "User authentication and session management",
      "Shopping cart and order management",
      "Product catalog with category filtering",
      "PayMongo integration for GCash and card payments",
      "Admin dashboard for product and order management",
      "RESTful API built with Express.js",
      "Responsive design for desktop and mobile",
    ],
    lessons:
      "Building an end-to-end e-commerce platform taught me how to integrate secure payment gateways, design scalable REST APIs, manage relational databases, and create a seamless checkout experience while handling real-world edge cases and transaction flows.",
  },
  {
    slug: "infogram",
    category: "UI/UX Design",
    title: "Infogram",
    description:
      "A Figma-designed social media platform inspired by Instagram, created exclusively for Holy Cross of Davao College. The platform serves as a centralized space for school announcements, updates, events, and student engagement through a familiar and user-friendly interface.",
    image: "/projects/Figmadesign.png",
    stack: ["Figma", "UI Design", "UX Design", "Prototyping"],
    year: "2025",
    featured: true,
    problem:
      "Students often miss important school announcements because updates are scattered across different platforms, making it difficult to stay informed.",
    solution:
      "Designed a mobile-first interface in Figma that brings announcements, events, and school updates into a single platform with an Instagram-inspired layout, making information easier to access and more engaging for students.",
    features: [
      "Instagram-inspired feed for school announcements",
      "Event and campus updates",
      "User-friendly mobile UI prototype",
      "Interactive navigation and screen flow",
      "Modern and accessible interface design",
    ],
    lessons:
      "Strengthened my UI/UX design skills by creating user-centered layouts, building interactive prototypes in Figma, and applying design principles to improve usability and accessibility.",
  },
];