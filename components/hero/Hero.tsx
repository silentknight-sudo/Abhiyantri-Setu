
"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const popularTags = ["Interior Design", "Plumbing", "Electrical", "Construction", "Paint"];

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 sm:px-10 lg:px-16 py-10 lg:py-16 gap-8 lg:gap-16 bg-white">
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-gray-900">
          Build, Renovate, Repair &amp; Maintain
          <span className="block text-amber-500 mt-2">All in One Trusted Platform</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base text-gray-500 leading-relaxed"
        >
          Find verified professionals, compare quotations, and get your work
          completed with confidence.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-8 flex items-center border border-gray-300 rounded-full px-5 py-2 bg-white w-full"
        >
          <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search services, contractors, materials, equipment..."
            className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-400 bg-transparent min-w-0"
          />
          <button className="bg-amber-500 hover:bg-amber-600 transition rounded-full p-2.5 ml-3 flex-shrink-0">
            <Search className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-5 flex items-center gap-2 flex-wrap"
        >
          <span className="text-sm text-gray-500">Popular:</span>
          {popularTags.map((tag, i) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 + i * 0.07 }}
              className="text-sm border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50 transition text-gray-700"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — building image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden relative"
      >
        <Image
          src="/hero-house.jpg"
          alt="Modern building at sunset"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}