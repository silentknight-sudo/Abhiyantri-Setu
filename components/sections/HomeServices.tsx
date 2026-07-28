"use client";

import { motion } from "framer-motion";
import {
  Zap, Wrench, Snowflake, Home, SprayCan, Bug, ShieldCheck, ChevronRight,
} from "lucide-react";

const services = [
  { icon: Zap,         title: "Electrical Services", services: "60+ Services", pros: "350+ Pros" },
  { icon: Wrench,       title: "Plumbing Services",   services: "50+ Services", pros: "300+ Pros" },
  { icon: Snowflake,    title: "AC & HVAC Services",  services: "40+ Services", pros: "280+ Pros" },
  { icon: Home,         title: "Home Maintenance",    services: "45+ Services", pros: "250+ Pros" },
  { icon: SprayCan,     title: "Cleaning Services",   services: "35+ Services", pros: "250+ Pros" },
  { icon: Bug,          title: "Pest Control",        services: "25+ Services", pros: "200+ Pros" },
  { icon: ShieldCheck,  title: "Safety & Security",   services: "30+ Services", pros: "220+ Pros" },
  { icon: Wrench,       title: "Appliance Repair",    services: "40+ Services", pros: "270+ Pros" },
];

export default function HomeServices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 rounded-2xl p-5 sm:p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Home Services</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Everyday services for your home & building
          </p>
        </div>
        <button className="text-xs sm:text-sm text-amber-500 font-medium flex items-center gap-0.5 whitespace-nowrap hover:text-amber-600 transition">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className="border border-gray-200 rounded-xl p-2.5 flex gap-2.5 cursor-pointer hover:border-amber-300 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-gray-900 leading-snug">{s.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                {s.services}<br />{s.pros}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}