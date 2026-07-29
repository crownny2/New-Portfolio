"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, ArrowUpRight, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";

const AUTO_ADVANCE_MS = 6000;

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const total = projects.length;
  const project = projects[active];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [paused, total]);

  const goTo = (index: number) => setActive(((index % total) + total) % total);

  return (
    <section
      id="projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden bg-gradient-to-b from-sky-light/20 via-white to-white px-6 py-28 text-ink"
    >
      {/* ambient glow, on-brand sky blue */}
      <div className="pointer-events-none absolute -left-32 top-0 -z-0 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-0 h-[24rem] w-[24rem] rounded-full bg-sky-light/25 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="mb-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            Projects
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Crafted through code and creativity.
          </h2>
        </div>
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Mockup panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -24, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: -1.5 }}
              exit={{ opacity: 0, x: 24, rotate: -2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[2rem] border border-sky/20 bg-gradient-to-br from-sky/20 via-white to-sky-light/10 shadow-[0_40px_100px_rgba(56,189,248,0.18)]"
              onClick={() => setSelected(project)}
            >
              {failedImages[project.slug] ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl font-semibold text-sky/30 transition-transform duration-500 group-hover:scale-110 sm:text-8xl">
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [project.slug]: true }))
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/70 px-5 py-3 font-sans text-xs text-ink/60 backdrop-blur-sm">
                <span>
                  {failedImages[project.slug] ? `Add screenshot: ${project.image}` : ""}
                </span>
                <span className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowUpRight size={12} />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Info panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-ink/40">
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span className="text-sky">{project.category}</span>
              </div>
              <h3 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 font-sans text-sm text-ink/60">
                {project.year && <span>{project.year}</span>}
                {project.year && <span className="text-ink/30">·</span>}
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-sky/20 bg-sky/5 px-3 py-1 text-xs font-medium text-ink/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelected(project)}
                  data-cursor-hover
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-sky hover:text-ink"
                >
                  View Details <ArrowUpRight size={14} />
                </button>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-sky hover:text-ink"
                  >
                    <Globe size={14} /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 px-5 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:border-sky hover:text-sky"
                  >
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Bottom bar — progress, name, manual controls */}
        <div className="mt-16 flex items-center gap-4 border-t border-sky/15 pt-6 font-sans text-sm text-ink/50">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous project"
            data-cursor-hover
            className="rounded-full border border-sky/20 p-2 transition-colors hover:border-sky hover:text-sky"
          >
            <ArrowLeft size={14} />
          </button>
          <div className="relative h-px flex-1 overflow-hidden bg-sky/15">
            <motion.div
              key={`${project.slug}-${paused}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
              className="absolute inset-y-0 left-0 w-full origin-left bg-sky"
            />
          </div>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next project"
            data-cursor-hover
            className="rounded-full border border-sky/20 p-2 transition-colors hover:border-sky hover:text-sky"
          >
            <ArrowRight size={14} />
          </button>
          <span className="whitespace-nowrap font-semibold text-ink">
            {project.title} <span className="font-normal text-ink/40">{String(active + 1).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
