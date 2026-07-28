"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, ChevronDown, Home, Building2, Sofa,
  Wrench, Zap, PaintBucket, TreePine, Layers, Waves,
  DoorOpen, Hammer, Plus, ArrowRight, SlidersHorizontal,
  Star, Clock, Shield
} from "lucide-react";
import ProviderCarousel from "./_components/ProviderCarousel";

// ── Data ──────────────────────────────────────────────────────────────────────

const locations = [
  "Greater Noida", "Noida", "Delhi", "Gurgaon", "Faridabad", "Ghaziabad",
];

const categories = [
  { id: "all",         label: "All",            icon: Layers },
  { id: "residential", label: "Residential",    icon: Home },
  { id: "commercial",  label: "Commercial",     icon: Building2 },
  { id: "interior",   label: "Interior",       icon: Sofa },
  { id: "plumbing",   label: "Plumbing",       icon: Wrench },
  { id: "electrical", label: "Electrical",     icon: Zap },
  { id: "painting",   label: "Painting",       icon: PaintBucket },
  { id: "carpentry",  label: "Carpentry",      icon: DoorOpen },
  { id: "civil",      label: "Civil Work",     icon: Hammer },
  { id: "landscaping",label: "Landscaping",    icon: TreePine },
  { id: "waterproof", label: "Waterproofing",  icon: Waves },
  { id: "more",       label: "More",           icon: Plus },
];

const services = [
  {
    id: 1,
    title: "2BHK Full Renovation",
    category: "residential",
    image: "/services/2bhk-renovation.jpg",
    rating: 4.8,
    reviews: 89,
    priceRange: "₹2L – ₹8L",
    duration: "15–30 days",
    tag: "Most Booked",
    tagColor: "bg-amber-500",
  },
  {
    id: 2,
    title: "Kitchen Remodel",
    category: "interior",
    image: "/services/kitchen.jpg",
    rating: 4.9,
    reviews: 120,
    priceRange: "₹80K – ₹3L",
    duration: "7–14 days",
    tag: "Top Rated",
    tagColor: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Bathroom Fitting",
    category: "plumbing",
    image: "/services/bathroom.jpg",
    rating: 4.7,
    reviews: 56,
    priceRange: "₹40K – ₹1L",
    duration: "3–7 days",
    tag: null,
    tagColor: "",
  },
  {
    id: 4,
    title: "Commercial Office Build",
    category: "commercial",
    image: "/services/office.jpg",
    rating: 4.8,
    reviews: 34,
    priceRange: "₹5L – ₹25L",
    duration: "30–90 days",
    tag: "Premium",
    tagColor: "bg-slate-700",
  },
  {
    id: 5,
    title: "Full Home Painting",
    category: "painting",
    image: "/services/painting.jpg",
    rating: 4.6,
    reviews: 210,
    priceRange: "₹20K – ₹80K",
    duration: "3–5 days",
    tag: "Budget Friendly",
    tagColor: "bg-blue-500",
  },
  {
    id: 6,
    title: "Electrical Wiring & Fitting",
    category: "electrical",
    image: "/services/electrical.jpg",
    rating: 4.9,
    reviews: 78,
    priceRange: "₹15K – ₹60K",
    duration: "2–5 days",
    tag: null,
    tagColor: "",
  },
  {
    id: 7,
    title: "Modular Interior Design",
    category: "interior",
    image: "/services/interior.jpg",
    rating: 4.8,
    reviews: 95,
    priceRange: "₹1.5L – ₹6L",
    duration: "20–45 days",
    tag: "Trending",
    tagColor: "bg-purple-500",
  },
  {
    id: 8,
    title: "Foundation & Civil Work",
    category: "civil",
    image: "/services/civil.jpg",
    rating: 4.7,
    reviews: 43,
    priceRange: "₹3L – ₹15L",
    duration: "30–60 days",
    tag: null,
    tagColor: "",
  },
  {
    id: 9,
    title: "Carpentry & Woodwork",
    category: "carpentry",
    image: "/services/carpentry.jpg",
    rating: 4.5,
    reviews: 61,
    priceRange: "₹30K – ₹2L",
    duration: "5–15 days",
    tag: null,
    tagColor: "",
  },
  {
    id: 10,
    title: "Terrace Waterproofing",
    category: "waterproof",
    image: "/services/waterproofing.jpg",
    rating: 4.8,
    reviews: 38,
    priceRange: "₹25K – ₹90K",
    duration: "2–4 days",
    tag: "Monsoon Special",
    tagColor: "bg-cyan-600",
  },
  {
    id: 11,
    title: "Garden & Landscaping",
    category: "landscaping",
    image: "/services/landscaping.jpg",
    rating: 4.6,
    reviews: 27,
    priceRange: "₹20K – ₹1L",
    duration: "3–10 days",
    tag: null,
    tagColor: "",
  },
  {
    id: 12,
    title: "Villa Construction",
    category: "residential",
    image: "/services/villa.jpg",
    rating: 4.9,
    reviews: 19,
    priceRange: "₹40L – ₹2Cr",
    duration: "6–18 months",
    tag: "Premium",
    tagColor: "bg-slate-700",
  },
];

const trustBadges = [
  { icon: Shield, label: "Verified Contractors" },
  { icon: Star,   label: "Rated & Reviewed" },
  { icon: Clock,  label: "On-time Delivery" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

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

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-amber-100 to-orange-50 overflow-hidden">
        {/* Placeholder gradient — replace with Next/Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500" />

        {/* Tag */}
        {s.tag && (
          <span className={`absolute top-3 left-3 z-10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${s.tagColor}`}>
            {s.tag}
          </span>
        )}

        {/* Duration badge */}
        <span className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {s.duration}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-amber-600 transition-colors">
          {s.title}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={s.rating} />
          <span className="text-xs font-semibold text-gray-700">{s.rating}</span>
          <span className="text-xs text-gray-400">({s.reviews} reviews)</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-sm font-bold text-gray-900">{s.priceRange}</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition group-hover:scale-110">
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function BuildRenovatePage() {
  const [selectedLocation, setSelectedLocation] = useState("Greater Noida");
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [activeCategory, setActiveCategory]     = useState("all");
  const [searchQuery, setSearchQuery]           = useState("");
  const [showFilters, setShowFilters]           = useState(false);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat  = activeCategory === "all" || s.category === activeCategory;
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFBF5]">

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100 px-4 sm:px-8 lg:px-16 pt-10 pb-8">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-400 mb-4"
          >
            <a href="/" className="hover:text-amber-500 transition">Home</a>
            {" / "}
            <a href="/services" className="hover:text-amber-500 transition">Services</a>
            {" / "}
            <span className="text-gray-600">Build or Renovate</span>
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2"
          >
            Build, Renovate &amp;
            <span className="text-amber-500"> Transform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-base mb-8"
          >
            Trusted contractors, architects &amp; engineers verified and ready to hire.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            {/* Location selector */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDrop((p) => !p)}
                className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-gray-800 text-sm font-medium px-4 py-3 rounded-xl hover:bg-amber-100 transition whitespace-nowrap w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                {selectedLocation}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showLocationDrop ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showLocationDrop && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-52"
                  >
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setSelectedLocation(loc); setShowLocationDrop(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-amber-50 transition flex items-center gap-2
                          ${loc === selectedLocation ? "text-amber-600 font-semibold bg-amber-50" : "text-gray-700"}`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search input */}
            <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 gap-3 shadow-sm focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search — e.g. "2BHK renovation", "kitchen remodel"'
                className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-400 bg-transparent min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition
                ${showFilters ? "bg-amber-500 text-white border-amber-500" : "bg-white border-gray-200 text-gray-700 hover:border-amber-300"}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mt-5 flex-wrap"
          >
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <b.icon className="w-3.5 h-3.5 text-amber-500" />
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category tabs ── */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                    ${active
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  {active && cat.id !== "all" && (
                    <span className="bg-white/30 text-white text-[10px] font-bold px-1.5 rounded-full">
                      {services.filter((s) => s.category === cat.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Grid ── */}
      <section className="px-4 sm:px-8 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto">

          {/* Results header */}
          <motion.div
            layout
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {activeCategory === "all"
                  ? "All Services"
                  : categories.find((c) => c.id === activeCategory)?.label}
                {searchQuery && (
                  <span className="text-gray-400 font-normal text-base"> for "{searchQuery}"</span>
                )}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {filtered.length} service{filtered.length !== 1 ? "s" : ""} in {selectedLocation}
              </p>
            </div>

            {/* Sort */}
            <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 bg-white outline-none focus:border-amber-400 transition cursor-pointer">
              <option>Most Popular</option>
              <option>Top Rated</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((s, i) => (
                  <ServiceCard key={s.id} s={s} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-sm text-gray-400 mb-5">
                  Try a different search or browse all categories
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <ProviderCarousel/>

        </div>
      </section>

    </main>
  );
}