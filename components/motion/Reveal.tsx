"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  flip: {
    hidden: { opacity: 0, rotateX: -35, y: 50, transformPerspective: 1200 },
    show: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
  },
  zoom: { hidden: { opacity: 0, scale: 0.9, z: -80 }, show: { opacity: 1, scale: 1, z: 0 } },
  left: { hidden: { opacity: 0, x: -50, rotateY: 15 }, show: { opacity: 1, x: 0, rotateY: 0 } },
  right: { hidden: { opacity: 0, x: 50, rotateY: -15 }, show: { opacity: 1, x: 0, rotateY: 0 } },
};

// Animates its children into view as they scroll onto the screen
export default function Reveal({
  children,
  type = "flip",
  delay = 0,
  className,
}: {
  children: ReactNode;
  type?: keyof typeof variants;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      variants={variants[type]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
