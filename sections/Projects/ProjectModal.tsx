"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ArrowUpRight, Globe, Award, CheckCircle } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-ink/5 p-2 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-sky/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-sky/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky">
                  {project.category}
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {project.title}
                </h2>
                {project.year && (
                  <p className="mt-1 font-sans text-sm text-ink/40">{project.year}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-sky px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-secondary"
                  >
                    <Globe size={16} />
                    Live Demo
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:border-sky hover:text-sky"
                  >
                    <Github size={16} /> Code
                  </a>
                )}
              </div>
            </div>

            <p className="mt-4 font-sans text-base leading-relaxed text-muted">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                Tech Stack
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-sky/20 bg-sky/5 px-3 py-1 text-xs font-medium text-ink/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                  Problem
                </h4>
                <p className="mt-1 font-sans text-sm leading-relaxed text-muted">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                  Solution
                </h4>
                <p className="mt-1 font-sans text-sm leading-relaxed text-muted">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                Key Features
              </h4>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 font-sans text-sm text-muted">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lessons Learned */}
            <div className="mt-6">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                Lessons Learned
              </h4>
              <p className="mt-1 font-sans text-sm leading-relaxed text-muted">
                {project.lessons}
              </p>
            </div>

            {/* Recognitions */}
            {project.recognitions && project.recognitions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40">
                  Recognitions
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {project.recognitions.map((recognition, index) => (
                    <li key={index} className="flex items-start gap-2 font-sans text-sm text-muted">
                      <Award size={14} className="mt-0.5 flex-shrink-0 text-amber-500" />
                      <span>{recognition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
