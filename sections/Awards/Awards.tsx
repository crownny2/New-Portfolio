"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Medal, Globe2, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { awards, type Award } from "@/data/awards";

const icons: Record<Award["icon"], React.ElementType> = {
  trophy: Trophy,
  medal: Medal,
  globe: Globe2,
};

function AwardCard({ award, index }: { award: Award; index: number }) {
  const Icon = icons[award.icon];
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(award.image) && !imgFailed;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky/10 bg-white shadow-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(56,189,248,0.22)]"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Certificate photo, shown only if the image actually exists */}
      {showImage && (
        <a
          href={award.image}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group/img relative aspect-[4/3] w-full overflow-hidden bg-sky/5"
        >
          <Image
            src={award.image as string}
            alt={`${award.title} certificate`}
            fill
            onError={() => setImgFailed(true)}
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover/img:bg-ink/40 group-hover/img:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-sans text-xs font-medium text-ink">
              <Eye size={13} /> View Certificate
            </span>
          </div>
        </a>
      )}

      <div className="relative flex flex-1 flex-col p-8">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-[0_10px_30px_rgba(56,189,248,0.4)]"
        >
          <Icon size={28} />
        </motion.div>

        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-sky">
          {award.year}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
          {award.title}
        </h3>
        <p className="mt-1.5 font-sans text-sm font-medium text-ink/60">
          {award.organization}
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
          {award.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-gradient-to-b from-sky-light/15 via-white to-white px-6 py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-sky/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[24rem] w-[24rem] rounded-full bg-sky-light/25 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Awards & Recognition"
          title="Recognized for research that matters."
          description="Three milestones from RiceSure's journey from a campus research fair to an international conference stage."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {awards.map((award, i) => (
            <FadeIn key={award.title} delay={i * 0.12}>
              <AwardCard award={award} index={i} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
