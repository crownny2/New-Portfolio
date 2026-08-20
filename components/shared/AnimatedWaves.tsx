"use client";

import { motion } from "framer-motion";

// Three layered SVG waves that continuously scroll horizontally, each at a
// different speed/opacity for a parallax "ocean" feel. Each path is drawn
// twice side-by-side (0–100% and 100–200%) so looping from x:0% to x:-50%
// is perfectly seamless.
const LAYERS = [
  {
    duration: 14,
    opacity: 0.35,
    color: "#38BDF8", // sky
    y: "62%",
    path: "M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,200 L0,200 Z",
  },
  {
    duration: 20,
    opacity: 0.25,
    color: "#7DD3FC", // sky-light
    y: "72%",
    path: "M0,70 C200,20 400,120 600,70 C800,20 1000,120 1200,70 L1200,200 L0,200 Z",
  },
  {
    duration: 26,
    opacity: 0.18,
    color: "#38BDF8",
    y: "82%",
    path: "M0,50 C180,100 420,0 600,50 C780,100 1020,0 1200,50 L1200,200 L0,200 Z",
  },
];

export default function AnimatedWaves({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}>
      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: layer.duration, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 h-40 w-[200%] sm:h-56"
          style={{ top: layer.y }}
        >
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d={layer.path} fill={layer.color} opacity={layer.opacity} />
            <path
              d={layer.path}
              fill={layer.color}
              opacity={layer.opacity}
              transform="translate(1200, 0)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
