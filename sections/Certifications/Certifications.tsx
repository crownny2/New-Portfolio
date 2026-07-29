"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-light/10 to-white px-6 py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[24rem] w-[24rem] rounded-full bg-sky/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-sky-light/20 blur-[110px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title="9 certifications, one continuous learning habit."
          description="A grid ready for your real certificates swap in the images, titles, and dates whenever you have them, no layout changes needed."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.id} delay={(i % 6) * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky/10 bg-white shadow-sm transition-shadow hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky/5">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {cert.isPlaceholder && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-sky shadow-sm">
                      Placeholder
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-sky/10 px-2.5 py-1 font-sans text-[10px] font-semibold text-sky">
                    <BadgeCheck size={12} />
                    Certified
                  </div>

                  <h3 className="font-display text-base font-semibold leading-snug text-ink">
                    {cert.title}
                  </h3>

                  <p className="mt-1 font-sans text-sm text-muted">
                    {cert.organization}
                  </p>

                  <p className="mt-0.5 font-sans text-xs text-muted/80">
                    {cert.date}
                  </p>

                  <div className="mt-5">
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-sans text-xs font-medium text-white transition-colors hover:bg-sky hover:text-ink"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
