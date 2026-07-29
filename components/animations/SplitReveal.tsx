"use client";

import { createElement, JSX } from "react";
import { motion } from "framer-motion";

interface SplitRevealProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  splitBy?: "words" | "chars";
  delay?: number;
  stagger?: number;
}

export default function SplitReveal({
  text,
  as = "span",
  className = "",
  splitBy = "words",
  delay = 0,
  stagger = 0.04,
}: SplitRevealProps) {
  const pieces = splitBy === "chars" ? text.split("") : text.split(" ");

  return createElement(
    as,
    { className },
    pieces.map((piece, i) => (
      <span key={`${piece}-${i}`} className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
        <motion.span
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {piece === " " ? "\u00A0" : piece}
          {splitBy === "words" && i < pieces.length - 1 ? "\u00A0" : ""}
        </motion.span>
      </span>
    ))
  );
}
