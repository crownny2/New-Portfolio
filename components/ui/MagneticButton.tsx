"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  target?: string;
  showArrow?: boolean;
}

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  target,
  showArrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  }

  const isPrimary = variant === "primary";
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-sans text-sm font-medium transition-shadow duration-300";
  const skin = isPrimary
    ? "bg-ink text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.45)] hover:shadow-[0_14px_36px_-8px_rgba(56,189,248,0.55)]"
    : "border border-ink/15 text-ink hover:border-sky/50 hover:bg-sky-light/10";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${skin}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <motion.span className="relative z-10 inline-flex" whileHover={{ x: 3, y: -3 }}>
          <ArrowUpRight size={16} />
        </motion.span>
      )}
    </motion.a>
  );
}
