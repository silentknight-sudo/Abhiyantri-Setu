"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  Layers,
  Wrench,
  Zap,
  Paintbrush,
  Droplets,
  Box,
  Wind,
  ChefHat,
  Square,
  Plus,
} from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Building2,  label: "Architecture" },
  { icon: Hammer,      label: "Civil Construction" },
  { icon: Layers,      label: "Interior Design" },
  { icon: Wrench,      label: "Plumbing" },
  { icon: Zap,         label: "Electrical" },
  { icon: Paintbrush,  label: "Painting" },
  { icon: Droplets,    label: "Waterproofing" },
  { icon: Box,         label: "Fabrication" },
  { icon: Wind,        label: "HVAC" },
  { icon: ChefHat,     label: "Modular Kitchen" },
  { icon: Square,      label: "Flooring" },
];

export default function AllServices() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8"
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Construction Services
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Everything you need under one roof
        </p>

        {/* Icon grid */}
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-7 gap-x-4">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center gap-2.5 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center transition-colors group-hover:bg-amber-200">
                <s.icon className="w-6 h-6 text-amber-600" strokeWidth={1.75} />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 leading-snug max-w-20">
                {s.label}
              </p>
            </motion.div>
          ))}

          {/* More button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: services.length * 0.05 }}
            whileHover={{ y: -3 }}
            className="flex flex-col items-center text-center gap-2.5 cursor-pointer"
          >
            <Link href='/services' className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" strokeWidth={2} />
            </Link>
            <Link href='/services' className="text-xs sm:text-[13px] text-gray-700 leading-snug">More</Link>
          </motion.div>
        </div>

        {/* View All Services button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex justify-center mt-9"
        >
          <Link href = '/services'className="border border-amber-400 text-gray-800 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-amber-50 transition">
            View All Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}