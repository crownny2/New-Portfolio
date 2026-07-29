"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { skillCategories } from "@/data/skills";
import { Code2, Server, Database, Sparkles, Wrench, Bot } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiPython,
  SiLaravel,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiClaude,
  SiGithubcopilot,
  SiGit,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Category header icon + accent color, all tuned to the Sky Blue system.
const categoryMeta: Record<
  string,
  { icon: React.ElementType; from: string; to: string }
> = {
  Frontend: { icon: Code2, from: "#38BDF8", to: "#7DD3FC" },
  Backend: { icon: Server, from: "#0EA5E9", to: "#38BDF8" },
  Database: { icon: Database, from: "#0284C7", to: "#38BDF8" },
  "AI Tools": { icon: Sparkles, from: "#7DD3FC", to: "#BAE6FD" },
  "Tools & Platforms": { icon: Wrench, from: "#0F172A", to: "#38BDF8" },
};

// Real brand icon + brand color per individual skill (kept as-is for recognizability).
const skillMeta: Record<string, { icon: React.ElementType; color: string }> = {
  HTML5: { icon: FaHtml5, color: "#E34F26" },
  CSS3: { icon: FaCss3Alt, color: "#1572B6" },
  "JavaScript (ES6+)": { icon: FaJs, color: "#D7B301" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "React.js": { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#0F172A" },
  "React Native": { icon: FaReact, color: "#61DAFB" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  "Node.js": { icon: FaNodeJs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#0F172A" },
  Python: { icon: SiPython, color: "#3776AB" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Claude: { icon: SiClaude, color: "#D97757" },
  ChatGPT: { icon: Bot, color: "#10A37F" },
  "GitHub Copilot": { icon: SiGithubcopilot, color: "#0F172A" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: FaGithub, color: "#0F172A" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  Vercel: { icon: SiVercel, color: "#0F172A" },
  "VS Code": { icon: VscVscode, color: "#007ACC" },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-light/10 to-white px-6 py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-sky-light/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills & Tools"
          title="The stack behind the work."
          description="A practical toolkit built through coursework, an internship, and real projects from pixels to production."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const meta = categoryMeta[cat.category] ?? categoryMeta.Frontend;
            const Icon = meta.icon;

            return (
              <FadeIn key={cat.category} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-sky/10 bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)]">
                  <div
                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                    style={{ background: meta.to }}
                  />

                  <div className="flex items-center justify-between">
                    <div
                      className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${meta.from}, ${meta.to})`,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="mb-5 rounded-full bg-sky/5 px-2.5 py-1 font-sans text-[10px] font-semibold text-muted">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-ink">
                    {cat.category}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-muted">{cat.description}</p>

                  <motion.div
                    className="mt-5 flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ staggerChildren: 0.045, delayChildren: i * 0.08 }}
                  >
                    {cat.skills.map((skill) => {
                      const sMeta = skillMeta[skill];
                      const SkillIcon = sMeta?.icon;
                      return (
                        <motion.span
                          key={skill}
                          variants={{
                            hidden: { opacity: 0, y: 8, scale: 0.9 },
                            visible: { opacity: 1, y: 0, scale: 1 },
                          }}
                          whileHover={{ scale: 1.06, y: -2 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-flex items-center gap-1.5 rounded-full bg-sky/5 px-3 py-1.5 font-sans text-xs font-medium text-ink/75 transition-colors group-hover:bg-sky/10"
                        >
                          {SkillIcon && (
                            <SkillIcon size={13} style={{ color: sMeta.color }} />
                          )}
                          {skill}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
