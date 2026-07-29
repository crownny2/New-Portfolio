"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
  target?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon,
  target,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const styles = {
    primary:
      "bg-ink text-white hover:bg-sky hover:text-ink shadow-[0_8px_30px_rgba(15,23,42,0.15)]",
    secondary:
      "bg-white text-ink border border-slate-200 hover:border-sky hover:text-sky",
    ghost: "bg-transparent text-ink hover:text-sky",
  };

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
    >
      {children}
      {icon}
    </motion.span>
  );

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: reset,
    className: cn(
      "group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-medium transition-colors duration-300",
      styles[variant],
      className
    ),
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        data-cursor-hover
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        {...sharedProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-cursor-hover
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      {...sharedProps}
    >
      {content}
    </motion.button>
  );
}
