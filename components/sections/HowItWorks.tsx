
"use client";

import { motion } from "framer-motion";
import { Search, Users, FileText, Handshake, ClipboardCheck } from "lucide-react";

const steps = [
  { icon: Search,          label: "Step 1", title: "Search Your Requirement" },
  { icon: Users,           label: "Step 2", title: "Compare Verified Providers" },
  { icon: FileText,        label: "Step 3", title: "Receive Quotations" },
  { icon: Handshake,       label: "Step 4", title: "Hire with Confidence" },
  { icon: ClipboardCheck,  label: "Step 5", title: "Track & Complete Project" },
];

export default function HowItWorks() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-12 lg:py-16 bg-white">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-10 lg:mb-14"
      >
        How Abhiyantri Setu Works
      </motion.h2>

      {/* Steps */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-start justify-between gap-8 sm:gap-0">

        {steps.map((step, i) => (
          <div key={step.label} className="relative flex flex-col items-center text-center flex-1">

            {/* Dashed connector line — between steps, desktop only */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="hidden sm:block absolute top-9 left-1/2 w-full h-px origin-left"
                style={{
                  backgroundImage: "repeating-linear-gradient(to right, #D97706 0, #D97706 6px, transparent 6px, transparent 14px)",
                  opacity: 0.45,
                }}
              />
            )}

            {/* Icon circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative z-10 w-16 h-16 sm:w-72px sm:h-72px rounded-full bg-amber-100 flex items-center justify-center mb-4 shrink-0"
            >
              <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" strokeWidth={1.5} />
            </motion.div>

            {/* Step label + title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
            >
              <p className="text-sm font-semibold text-amber-500 mb-1">{step.label}</p>
              <p className="text-sm font-semibold text-gray-900 leading-snug max-w-120px">
                {step.title}
              </p>
            </motion.div>

          </div>
        ))}

      </div>
    </section>
  );
}