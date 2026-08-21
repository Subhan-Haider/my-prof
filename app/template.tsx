"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1
      }}
    >
      {children}
    </motion.div>
  );
}
