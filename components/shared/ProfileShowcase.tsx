"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { profile } from "@/data/profile";

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ProfileShowcase() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Raw pointer position, normalized to -0.5..0.5 across the card.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  const shineX = useTransform(px, [-0.5, 0.5], ["10%", "90%"]);
  const shineY = useTransform(py, [-0.5, 0.5], ["10%", "90%"]);
  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.55), transparent 45%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-sm"
      style={{ perspective: 1200 }}
    >
      {/* ambient blob behind the card */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-sky/25 via-sky-light/20 to-transparent blur-3xl" />

      {/* rotating gradient light ring */}
      <motion.div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem]"
        style={{
          background:
            "conic-gradient(from 0deg, #38BDF8, transparent 30%, #7DD3FC, transparent 70%, #38BDF8)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-2 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem]">
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* noise texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: NOISE_BG }}
          />

          {/* mouse-follow shine */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: shineBackground }} />

          {/* bottom caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-5">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/80">Available for work</p>
            <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
