"use client";

import { useRef, useState, type MouseEvent } from "react";

export function useTilt(strength = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setStyle({
      rotateX: (0.5 - py) * strength,
      rotateY: (px - 0.5) * strength,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const reset = () => setStyle({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  return { ref, style, onMouseMove, reset };
}
