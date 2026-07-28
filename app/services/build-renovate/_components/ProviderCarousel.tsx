"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Star, MapPin,
  BadgeCheck, MessageSquare, Phone, Heart,
  Briefcase, Clock
} from "lucide-react";
import Link from "next/link";

const providers = [
  {
    id: 1,
    name: "Sharma Constructions",
    owner: "Rajesh Sharma",
    initials: "RS",
    role: "General Contractor",
    location: "Sector 45, Greater Noida",
    rating: 4.9,
    reviews: 142,
    jobs: 180,
    experience: "12 yrs",
    price: "₹450/sqft",
    tags: ["Residential", "Commercial"],
    verified: true,
    insured: true,
    topPro: true,
    avatar: null,
    bgColor: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Priya Interiors",
    owner: "Priya Mehta",
    initials: "PM",
    role: "Interior Designer",
    location: "Sector 62, Noida",
    rating: 4.8,
    reviews: 98,
    jobs: 110,
    experience: "8 yrs",
    price: "₹300/sqft",
    tags: ["Interior", "Modular"],
    verified: true,
    insured: false,
    topPro: false,
    avatar: null,
    bgColor: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    name: "BuildRight Engineers",
    owner: "Arjun Kumar",
    initials: "AK",
    role: "Civil Engineer",
    location: "Knowledge Park, Greater Noida",
    rating: 4.9,
    reviews: 67,
    jobs: 85,
    experience: "15 yrs",
    price: "₹600/sqft",
    tags: ["Civil", "Structural"],
    verified: true,
    insured: true,
    topPro: true,
    avatar: null,
    bgColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: 4,
    name: "GreenBuild Co.",
    owner: "Sunita Rao",
    initials: "SR",
    role: "Architect",
    location: "Sector 18, Noida",
    rating: 4.7,
    reviews: 54,
    jobs: 62,
    experience: "10 yrs",
    price: "₹500/sqft",
    tags: ["Residential", "Eco-Build"],
    verified: true,
    insured: true,
    topPro: false,
    avatar: null,
    bgColor: "from-teal-400 to-teal-600",
  },
  {
    id: 5,
    name: "EliteFit Renovations",
    owner: "Vikram Singh",
    initials: "VS",
    role: "Renovation Expert",
    location: "Alpha 1, Greater Noida",
    rating: 4.8,
    reviews: 113,
    jobs: 140,
    experience: "9 yrs",
    price: "₹380/sqft",
    tags: ["Renovation", "Interior"],
    verified: true,
    insured: true,
    topPro: false,
    avatar: null,
    bgColor: "from-rose-400 to-rose-600",
  },
  {
    id: 6,
    name: "TechBuild Solutions",
    owner: "Amit Gupta",
    initials: "AG",
    role: "MEP Engineer",
    location: "Sector 135, Noida",
    rating: 4.9,
    reviews: 41,
    jobs: 55,
    experience: "11 yrs",
    price: "₹420/sqft",
    tags: ["MEP", "Commercial"],
    verified: true,
    insured: true,
    topPro: true,
    avatar: null,
    bgColor: "from-amber-400 to-orange-500",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ProviderCard({
  p,
  index,
}: {
  p: (typeof providers)[0];
  index: number;
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex-shrink-0 w-[300px] sm:w-[320px] bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300 group"
    >
      {/* Card header — avatar + top badges */}
      <div className="relative p-5 pb-4">

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((p) => !p)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 border border-gray-200 flex items-center justify-center transition"
        >
          <Heart
            className={`w-4 h-4 transition ${
              wishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* Avatar + info */}
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <span className="text-white font-bold text-lg">{p.initials}</span>
          </div>

          <div className="min-w-0 flex-1 pr-8">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm leading-snug truncate">
                {p.name}
              </h3>
              {p.topPro && (
                <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                  TOP PRO
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{p.role}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-400 truncate">{p.location}</p>
            </div>
          </div>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2 mt-4">
          <StarRating rating={p.rating} />
          <span className="text-xs font-bold text-gray-800">{p.rating}</span>
          <span className="text-xs text-gray-400">({p.reviews} reviews)</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
            <p className="text-xs font-bold text-gray-900">{p.jobs}+</p>
            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center justify-center gap-0.5">
              <Briefcase className="w-2.5 h-2.5" /> Jobs
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
            <p className="text-xs font-bold text-gray-900">{p.experience}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center justify-center gap-0.5">
              <Clock className="w-2.5 h-2.5" /> Exp
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl px-3 py-2.5 text-center">
            <p className="text-xs font-bold text-amber-600">{p.price}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Rate</p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {p.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          )}
          {p.insured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">
              <BadgeCheck className="w-3 h-3" /> Insured
            </span>
          )}
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-5" />

      {/* Actions */}
      <div className="p-4 flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 transition text-white text-sm font-semibold py-2.5 rounded-xl">
          Hire Now
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 flex items-center justify-center transition flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-gray-500" />
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 flex items-center justify-center transition flex-shrink-0">
          <Phone className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ProviderCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFilter, setActiveFilter]     = useState("All");

  const filters = ["All", "Residential", "Commercial", "Interior", "Civil", "MEP"];

  const filtered = activeFilter === "All"
    ? providers
    : providers.filter((p) => p.tags.includes(activeFilter));

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
    setTimeout(updateScroll, 350);
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-12 bg-[#FFFBF5]">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
            Trusted Professionals
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Top Rated Providers
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Verified contractors &amp; experts in {" "}
            <span className="text-amber-500 font-medium">Greater Noida</span>
          </p>
        </div>

        <Link
  href="/providers"
  className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition flex items-center gap-1 self-start sm:self-auto"
>
  View all providers
  <ChevronRight className="w-4 h-4" />
</Link>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap mb-6"
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition
              ${activeFilter === f
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-600"
              }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Carousel */}
      <div className="relative">

        {/* Left arrow */}
        <motion.button
          onClick={() => scroll("left")}
          animate={{ opacity: canScrollLeft ? 1 : 0.25 }}
          disabled={!canScrollLeft}
          className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-amber-50 hover:border-amber-300 transition disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </motion.button>

        {/* Track */}
        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProviderCard key={p.id} p={p} index={i} />
            ))}
          </AnimatePresence>

          {/* "See all" card at end */}
          <motion.a
            href="/providers"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[200px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-amber-400 hover:bg-amber-50 transition group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 group-hover:bg-amber-200 transition flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition text-center px-4">
              See all providers
            </p>
          </motion.a>
        </div>

        {/* Right arrow */}
        <motion.button
          onClick={() => scroll("right")}
          animate={{ opacity: canScrollRight ? 1 : 0.25 }}
          disabled={!canScrollRight}
          className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-amber-50 hover:border-amber-300 transition disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </motion.button>

      </div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-white border border-gray-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            Can&apos;t find the right professional?
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Post your project and let verified providers come to you with quotes.
          </p>
        </div>
        
          <Link
  href="/jobs/post"
  className="bg-amber-500 hover:bg-amber-600 active:scale-95 transition text-white text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap flex-shrink-0"
>
  Post a Project →
</Link>
      </motion.div>

    </section>
  );
}