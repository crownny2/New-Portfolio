"use client";

import { profile } from "@/data/profile";
import { navLinks } from "@/constants/navigation";
import { Github, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-white px-6 pb-8 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <a href="#home" className="font-display text-2xl font-semibold text-ink">
            Crown<span className="text-sky">.</span>
          </a>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
            {profile.role} based in {profile.location}, building clean,
            functional web experiences.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ink/70 transition-colors hover:text-sky"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-ink/70 transition-colors hover:text-sky"
                >
                  <Github size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-sans text-sm text-ink/70 transition-colors hover:text-sky"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
        <p className="font-sans text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <motion.a
          href="#home"
          data-cursor-hover
          whileHover={{ y: -3 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 font-sans text-xs font-medium text-ink transition-colors hover:border-sky hover:text-sky"
        >
          Back to top <ArrowUp size={13} />
        </motion.a>
      </div>
    </footer>
  );
}
