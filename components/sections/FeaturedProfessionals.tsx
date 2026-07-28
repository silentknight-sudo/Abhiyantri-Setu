"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight, BadgeCheck, MessageCircle, User } from "lucide-react";

const professionals = [
  {
    name: "Sharma Construction Co.",
    category: "Home Construction",
    verified: "gold",
    rating: 4.8,
    reviews: 126,
    exp: "10+ yrs exp.",
    projects: "50+ projects",
  },
  {
    name: "ABC Interiors",
    category: "Interior Design",
    verified: "gold",
    rating: 4.7,
    reviews: 98,
    exp: "8+ yrs exp.",
    projects: "100+ projects",
  },
  {
    name: "Om Electrical Services",
    category: "Electrical Services",
    verified: "silver",
    rating: 4.9,
    reviews: 112,
    exp: "6+ yrs exp.",
    projects: "80+ projects",
  },
  {
    name: "Bansal Waterproofing",
    category: "Waterproofing & Repair",
    verified: "gold",
    rating: 4.6,
    reviews: 142,
    exp: "12+ yrs exp.",
    projects: "320+ projects",
  },
];

export default function FeaturedProfessionals() {
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
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Featured Professionals</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Compare verified professionals before hiring
          </p>
        </div>
        <button className="text-xs sm:text-sm text-amber-500 font-medium flex items-center gap-0.5 whitespace-nowrap hover:text-amber-600 transition">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Professional cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {professionals.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="border border-gray-200 rounded-xl p-3 flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1.5">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-[11.5px] font-semibold text-gray-900 leading-tight">{p.name}</p>
            <p className="text-[10px] text-teal-600 mt-0.5">{p.category}</p>

            <span
              className={`text-[9px] rounded-md px-1.5 py-0.5 mt-1.5 inline-flex items-center gap-0.5 ${
                p.verified === "gold"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <BadgeCheck className="w-2.5 h-2.5" />
              {p.verified === "gold" ? "Gold Verified" : "Silver Verified"}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-gray-900 mt-1.5">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              {p.rating} ({p.reviews})
            </div>

            <div className="flex justify-between w-full text-[9px] text-gray-400 mt-1">
              <span>{p.exp}</span>
              <span>{p.projects}</span>
            </div>

            <button className="bg-amber-500 hover:bg-amber-600 transition text-white text-[10.5px] font-semibold rounded-lg py-1.5 w-full mt-2">
              View Profile
            </button>
            <button className="border border-gray-200 text-teal-600 text-[10px] rounded-lg py-1 w-full mt-1.5 flex items-center justify-center gap-1 hover:bg-gray-50 transition">
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}