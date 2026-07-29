"use client";

import { motion, MotionValue, useMotionTemplate } from "framer-motion";

interface MouseGlowProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  className?: string;
}

export default function MouseGlow({ x, y, className = "" }: MouseGlowProps) {
  const left = useMotionTemplate`${x}%`;
  const top = useMotionTemplate`${y}%`;
  const background = useMotionTemplate`radial-gradient(600px circle at ${left} ${top}, rgba(56,189,248,0.14), transparent 70%)`;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ background }}
    />
  );
}
