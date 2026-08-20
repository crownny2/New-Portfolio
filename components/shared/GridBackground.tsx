"use client";

import { motion } from "framer-motion";

export default function GridBackground({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      animate={{ backgroundPosition: ["0px 0px", "56px 56px"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
      }}
    />
  );
}
