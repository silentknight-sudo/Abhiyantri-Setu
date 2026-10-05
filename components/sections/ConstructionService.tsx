"use client";
import Link from "next/link";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Residential Building",
    count: "120+ Projects",
    image: "/residential.jpg",
  },
  {
    title: "Commercial Building",
    count: "85+ Projects",
    image: "/commercial.jpg",
  },
  {
    title: "Interior Projects",
    count: "150+ Projects",
    image: "/interior.jpg",
  },
  {
    title: "Renovation Projects",
    count: "95+ Projects",
    image: "/renovation.jpg",
  },
  {
    title: "Villa Construction",
    count: "60+ Projects",
    image: "/villa.jpg",
  },
  {
    title: "Industrial Projects",
    count: "40+ Projects",
    image: "/industrial.jpg",
  },
];

export default function ConstructionProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Construction Projects
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              End-to-end solutions for your dream project
            </p>
          </div>
          <Link href="/services/build-renovate" className="text-sm font-medium text-gray-700 hover:text-amber-500 transition flex items-center gap-1 whitespace-nowrap mt-1">
            View all projects
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <motion.button
            onClick={() => scroll("left")}
            animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            disabled={!canScrollLeft}
            className="absolute -left-5 sm:-left-7 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border
             border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition shadow-sm disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </motion.button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative shrink-0 w-50 sm:w-55 lg:w-60 h-55 sm:h-60 lg:h-65
                 rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                   sizes="(max-width: 640px) 200px,
                  (max-width: 1024px) 220px,
                   240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                    {p.title}
                  </p>
                  <p className="text-gray-300 text-xs mt-0.5">{p.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right arrow */}
          <motion.button
            onClick={() => scroll("right")}
            animate={{ opacity: canScrollRight ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            disabled={!canScrollRight}
            className="absolute -right-5 sm:-right-7 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border
             border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition shadow-sm disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}