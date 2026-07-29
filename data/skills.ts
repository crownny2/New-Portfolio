export type SkillCategory = {
  category: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    description: "Interfaces people actually enjoy using.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    description: "APIs and server logic that hold everything together.",
    skills: ["Node.js", "Express.js", "Python", "Laravel"],
  },
  {
    category: "Database",
    description: "Structuring and storing data reliably.",
    skills: ["MySQL", "Supabase", "Firebase"],
  },
  {
    category: "AI Tools",
    description: "Building faster, smarter, with AI in the loop.",
    skills: ["Claude", "ChatGPT", "GitHub Copilot"],
  },
  {
    category: "Tools & Platforms",
    description: "The everyday toolkit for shipping and collaborating.",
    skills: ["Git", "GitHub", "Postman", "Vercel", "VS Code"],
  },
];
