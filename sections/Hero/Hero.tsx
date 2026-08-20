"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SplitReveal from "@/components/animations/SplitReveal";
import Particles from "@/components/shared/Particles";
import GridBackground from "@/components/shared/GridBackground";
import AnimatedWaves from "@/components/shared/AnimatedWaves";
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

// Cycles through profile.roles in the signature script font, with a
// blurred handwriting-style dissolve between each — like a signature
// being rewritten.
function RoleCycle() {
  const roles = profile.roles?.length ? profile.roles : [profile.role];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative mt-1 flex h-[1.2em] items-center justify-center overflow-visible px-4 sm:h-[1.3em] lg:h-[1.4em]">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10, rotate: -3 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0, rotate: -3 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -10, rotate: -3 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute whitespace-nowrap font-script text-4xl text-ink/90 sm:text-6xl lg:text-7xl"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = useMouseGlow(sectionRef as React.RefObject<HTMLElement>);

  // Subtle parallax tilt on the headline block, driven by pointer position.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 60, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const parallaxXInverse = useTransform(parallaxX, (v) => v * -1);
  const parallaxYInverse = useTransform(parallaxY, (v) => v * -1);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-10 pt-40"
    >
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-sky-light/15 via-white to-white" />
      <GridBackground className="-z-10" />
      <MouseGlow x={x} y={y} className="-z-10" />
      <Particles count={46} className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />

      {/* Diagonal gradient beams, continuously sweeping across the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: ["-45%", "45%"] }}
          transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -top-1/2 left-1/2 h-[220%] w-[45%] -translate-x-1/2 rotate-[22deg] bg-gradient-to-b from-transparent via-sky/25 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ x: ["40%", "-40%"] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.5 }}
          className="absolute -top-1/2 left-1/2 h-[220%] w-[30%] -translate-x-1/2 rotate-[-18deg] bg-gradient-to-b from-transparent via-sky-light/20 to-transparent blur-3xl"
        />
      </div>

      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="pointer-events-none absolute -left-24 top-16 -z-10 h-80 w-80 animate-blob rounded-full bg-sky/25 blur-3xl"
      />
      <motion.div
        style={{ x: parallaxXInverse, y: parallaxYInverse }}
        className="pointer-events-none absolute right-0 top-1/3 -z-10 h-96 w-96 animate-blob rounded-full bg-sky-light/35 blur-3xl [animation-delay:2s]"
      />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-72 w-72 animate-blob rounded-full bg-sky/15 blur-3xl [animation-delay:4s]" />

      {/* Flowing wave layers along the bottom of the hero */}
      <AnimatedWaves className="-z-10 h-1/2" />

      {/* Main content — centered, huge type, signature moment */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <h1 className="font-display text-[11vw] font-semibold leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.2rem]">
          <span className="relative inline-block">
            <SplitReveal text="Building Scalable" as="span" className="block" splitBy="words" delay={0.15} stagger={0.03} />
            <motion.span
              aria-hidden
              animate={{ backgroundPosition: ["-150% 0%", "250% 0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }}
              className="pointer-events-none absolute inset-0 block bg-[length:60%_100%] bg-no-repeat bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 30%, rgba(56,189,248,0.9) 50%, transparent 70%)",
              }}
            >
              Building Scalable
            </motion.span>
          </span>
          <SplitReveal
            text="Web & Mobile Solutions"
            as="span"
            className="block bg-gradient-to-r from-sky via-sky-light to-sky bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x"
            splitBy="words"
            delay={0.35}
            stagger={0.03}
          />
        </h1>

        <RoleCycle />

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
      </motion.div>

      {/* Meta bar — location / name / live time, then scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6"
      >
        <div className="flex w-full items-center justify-between font-sans text-sm">
          <span className="text-muted">{profile.location}</span>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden font-semibold text-sky sm:inline"
          >
            {profile.name}
          </motion.span>
          <span className="text-muted">
            <LiveClock /> <span className="hidden sm:inline">PHT</span>
          </span>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          whileHover={{ scale: 1.2 }}
          className="relative flex h-9 w-9 items-center justify-center text-muted"
        >
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-sky/30" />
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
