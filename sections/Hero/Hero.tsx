"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SplitReveal from "@/components/animations/SplitReveal";
import Particles from "@/components/shared/Particles";
import GridBackground from "@/components/shared/GridBackground";
import MouseGlow from "@/components/shared/MouseGlow";
import Button from "@/components/ui/Button";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { profile } from "@/data/profile";

function LiveClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Manila",
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 1000 * 15);
    return () => clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = useMouseGlow(sectionRef as React.RefObject<HTMLElement>);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-10 pt-40"
    >
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-sky-light/15 via-white to-white" />
      <GridBackground className="-z-10" />
      <MouseGlow x={x} y={y} className="-z-10" />
      <Particles count={46} className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />

      <div className="pointer-events-none absolute -left-24 top-16 -z-10 h-80 w-80 animate-blob rounded-full bg-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-96 w-96 animate-blob rounded-full bg-sky-light/35 blur-3xl [animation-delay:2s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-72 w-72 animate-blob rounded-full bg-sky/15 blur-3xl [animation-delay:4s]" />

      {/* Main content — centered, huge type, signature moment */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-display text-[11vw] font-semibold leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.2rem]">
          <SplitReveal text="Building Scalable" as="span" className="block" splitBy="words" delay={0.15} stagger={0.03} />
          <SplitReveal
            text="Web & Mobile Solutions"
            as="span"
            className="block text-sky"
            splitBy="words"
            delay={0.35}
            stagger={0.03}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="-mt-3 font-script text-6xl text-ink/90 sm:text-7xl lg:text-8xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-6 max-w-lg font-sans text-base leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#projects">View Projects</Button>
          <Button href={profile.resumeUrl} variant="ghost" target="_blank">
            Download Resume
          </Button>
        </motion.div>
      </div>

      {/* Meta bar — location / name / live time, then scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6"
      >
        <div className="flex w-full items-center justify-between font-sans text-sm">
          <span className="text-muted">{profile.location}</span>
          <span className="hidden font-semibold text-sky sm:inline">{profile.name}</span>
          <span className="text-muted">
            <LiveClock /> <span className="hidden sm:inline">PHT</span>
          </span>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-muted"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
