"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Found a reliable contractor for my home construction. The platform made everything so easy and transparent.",
    name: "Rohit Sharma",
    role: "Home Construction",
    avatar: "/avatars/rohit.jpg",
    
  },
  {
    quote: "Booked plumbing and electrical services within minutes. Very professional and trusted platform.",
    name: "Anjali Mehta",
    role: "Home Services",
    avatar: "/avatars/anjali.jpg",
  },
  {
    quote: "Great place to buy construction materials at best prices. Saved both time and money.",
    name: "Vikram Singh",
    role: "Building Developer",
    avatar: "/avatars/vikram.jpg",
  },
];

export default function Testimonials() {
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
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-10"
      >
        What Our Customers Say
      </motion.h2>

      <div className="relative">
        {/* Left arrow */}
        <motion.button
          onClick={() => scroll("left")}
          animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          disabled={!canScrollLeft}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center hover:bg-gray-50 transition disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </motion.button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="snap-start shrink-0 w-70 sm:w-[320px] lg:w-[31%] border border-gray-200 rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-700 leading-relaxed mb-5 flex-1">
                &quot;{t.quote}&quot;
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                  {/* <Image src={t.avatar} alt={t.name} fill className="object-cover" /> */}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
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
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center hover:bg-gray-50 transition disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </motion.button>
      </div>
    </section>
  );
}