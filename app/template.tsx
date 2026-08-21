"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // motion.div acts as a wrapper that animates on mount
    <motion.div
      // Start state: hidden and slightly shifted to the right
      initial={{ opacity: 0, x: 20 }}
      // End state: fully visible and at its original position
      animate={{ opacity: 1, x: 0 }}
      // Transition settings: smooth sliding effect
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
