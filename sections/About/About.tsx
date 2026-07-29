"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SplitReveal from "@/components/animations/SplitReveal";
import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { profile } from "@/data/profile";

const stats = [
  { label: "Awards", value: 3, },
  { label: "Certificates", value: 9, },
  { label: "Projects", value: 3, },
  { label: "Passion", value: 100, suffix: "%" },
];

function PhotoShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 90%", "start 30%"],
  });

  const reveal = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const revealY = useTransform(reveal, [0, 1], [60, 0]);
  const revealOpacity = useTransform(reveal, [0, 1], [0, 1]);

  return (
    <div ref={scrollRef} className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute -left-10 -top-10 -z-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-6 -z-10 h-64 w-64 rounded-full bg-sky-light/25 blur-3xl" />

      <motion.div
        style={{ y: revealY, opacity: revealOpacity }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-3 shadow-[0_30px_80px_rgba(56,189,248,0.18)]"
      >
        <PhotoFrame />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pointer-events-none absolute -right-3 top-6 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-xl"
        >
          <span className="text-base">💼</span>
          <span className="font-sans text-xs font-semibold text-ink">
            Open to Work
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function PhotoFrame() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky/15 via-sky-light/20 to-white">
        <span className="font-display text-8xl font-semibold text-sky/50">
          CJ
        </span>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[2rem]">
      {/* Lego Image - visible by default */}
      <Image
        src="/profile/lego.jpg"
        alt="Lego"
        fill
        sizes="(max-width:768px) 100vw, 450px"
        onError={() => setFailed(true)}
        className="pointer-events-none object-cover transition-opacity duration-500 group-hover:opacity-0"
      />

      {/* Graduation Image - hidden by default, shows on hover */}
      <Image
        src="/profile/grad.jpg"
        alt="Graduation"
        fill
        sizes="(max-width:768px) 100vw, 450px"
        className="pointer-events-none object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-sky shadow-sm transition-opacity duration-300 group-hover:opacity-0">
        Hover to see more
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <PhotoShowcase />

          <div>
            <FadeIn>
              <span className="mb-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sky">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                About Me
              </span>
            </FadeIn>

            <SplitReveal
              text="Curious builder, Always learning, Always shipping"
              as="h2"
              splitBy="words"
              trigger="scroll"
              stagger={0.04}
              className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
            />

            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
                {profile.summary}
              </p>
            </FadeIn>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <FadeIn delay={0.22}>
                <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-sky/5 to-white p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky/15 text-sky">
                    <GraduationCap size={18} />
                  </div>

                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-sky">
                    {profile.education.period}
                  </p>

                  <h3 className="mt-1.5 font-display text-base font-semibold text-ink">
                    {profile.education.degree}
                  </h3>

                  <p className="mt-1 font-sans text-xs text-muted">
                    {profile.education.school}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-sky/5 to-white p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky/15 text-sky">
                    <Briefcase size={18} />
                  </div>

                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-sky">
                    {profile.internship.period}
                  </p>

                  <h3 className="mt-1.5 font-display text-base font-semibold text-ink">
                    Technical Intern
                  </h3>

                  <p className="mt-1 font-sans text-xs text-muted">
                    {profile.internship.company}
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.35 + i * 0.08}>
                  <div>
                    <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>

                    <p className="mt-1 font-sans text-xs text-muted">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}