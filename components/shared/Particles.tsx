"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ParticlesProps {
  count?: number;
  className?: string;
}

export default function Particles({ count = 40, className = "" }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: (i * 53.7) % 100,
        top: (i * 29.3) % 100,
        size: 1.5 + ((i * 11) % 3),
        duration: 8 + (i % 6),
        delay: (i % 9) * 0.5,
      })),
    [count]
  );

  return (
    <div aria-hidden className={className}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-sky/30"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
