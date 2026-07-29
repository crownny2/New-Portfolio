"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

/**
 * Wrap the app body with this in app/layout.tsx:
 *
 *   <LoadingGate>{children}</LoadingGate>
 *
 * The page renders underneath the loader the whole time (so nothing pops in
 * late) and simply fades/scales into place once the loader finishes.
 */
export default function LoadingGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={loading ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
