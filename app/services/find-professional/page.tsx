"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft, Bell, CheckCircle2, UserCheck, ShieldCheck,
  HardHat, Ruler, Lightbulb, Layers, Users, Star,
  BadgeCheck, Clock, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const professionals = [
  { icon: HardHat,   label: "Civil Engineers" },
  { icon: Ruler,     label: "Architects" },
  { icon: Lightbulb, label: "MEP Engineers" },
  { icon: Layers,    label: "Interior Designers" },
  { icon: Users,     label: "Project Managers" },
  { icon: Star,      label: "Consultants" },
];

const stats = [
  { value: "500+",  label: "Verified Experts" },
  { value: "20+",   label: "Specializations" },
  { value: "4.8★",  label: "Avg. Rating" },
  { value: "100%",  label: "Background Checked" },
];

const highlights = [
  "Verified credentials & license checks",
  "Portfolio & past project reviews",
  "Direct chat before you hire",
  "Fixed-price & hourly engagement",
];

const profiles = [
  {
    initials: "RS",
    name: "Rahul Sharma",
    role: "Civil Engineer",
    exp: "8 yrs exp",
    rating: "4.9",
    tag: "Structural",
  },
  {
    initials: "PM",
    name: "Priya Mehta",
    role: "Interior Designer",
    exp: "6 yrs exp",
    rating: "4.8",
    tag: "Residential",
  },
  {
    initials: "AK",
    name: "Arjun Kumar",
    role: "Architect",
    exp: "10 yrs exp",
    rating: "5.0",
    tag: "Commercial",
  },
];

export default function FindProfessionalComingSoon() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) { setError(true); return; }
    setError(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40  w-[500px] h-[500px] bg-amber-100 rounded-full blur-[130px] opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-50  rounded-full blur-[130px] opacity-60" />
        <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] bg-yellow-50 rounded-full blur-[100px] opacity-40" />
      </div>

      {/* ── Nav ── */}
      <nav className="px-6 sm:px-10 lg:px-16 pt-8 flex items-center justify-between">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>
        <span className="text-xs text-gray-400 hidden sm:block">Abhiyantri Setu</span>
      </nav>

      {/* ── Main ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-3xl text-center">

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.45 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 mx-auto flex items-center justify-center mb-8 shadow-md"
          >
            <UserCheck className="w-11 h-11 sm:w-12 sm:h-12 text-amber-500" strokeWidth={1.5} />
            <span className="absolute inset-0 rounded-3xl border-2 border-amber-300 animate-ping opacity-25" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Launching Soon
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
          >
            Find a Verified Professional
            <span className="block text-amber-500 mt-1">
              Hire with Confidence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10"
          >
            Connect with verified architects, civil engineers, interior designers
            and project consultants browse portfolios, compare profiles and hire
            the right expert for your build.
          </motion.p>

          {/* Professional type pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {professionals.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.07 }}
                className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
              >
                <p.icon className="w-4 h-4 text-amber-500" />
                {p.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-10"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.65 + i * 0.08 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-center"
              >
                <p className="text-lg font-bold text-amber-500 leading-tight">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mock profile cards — unique to this page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              A Glimpse of What's Coming
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profiles.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.78 + i * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 text-left relative overflow-hidden group"
                >
                  {/* Blur overlay — preview feel */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] rounded-2xl z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-amber-600">{p.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.role}</p>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />{p.exp}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{p.rating}
                    </span>
                  </div>

                  {/* Tag + actions */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-full font-medium">
                      {p.tag}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10 text-left"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.93 + i * 0.08 }}
                className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{h}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.08 }}
            className="max-w-md mx-auto"
          >
            {!submitted ? (
              <>
                <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  Get notified when the professional directory goes live
                </p>
                <div
                  className={`flex items-center gap-2 border rounded-full px-4 py-1.5 bg-white shadow-sm transition
                  ${error ? "border-red-400" : "border-gray-200"}`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Enter your email address"
                    className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-400 bg-transparent min-w-0 py-1.5"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-amber-500 hover:bg-amber-600 active:scale-95 transition text-white text-sm font-semibold px-5 py-2 rounded-full flex-shrink-0"
                  >
                    Notify Me
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 mt-2">
                    Please enter a valid email address.
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  No spam. Only one email when we launch. Promise.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
                >
                  <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                </motion.div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  You&apos;re on the list! 🎉
                </p>
                <p className="text-xs text-gray-500">
                  We&apos;ll notify{" "}
                  <span className="font-medium text-amber-600">{email}</span>{" "}
                  the moment the professional directory goes live.
                </p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400"
      >
        <span>© 2025 Abhiyantri Setu. All rights reserved.</span>
        <Link href="/" className="hover:text-amber-500 transition">
          abhiyantrisetu.in
        </Link>
      </motion.footer>

    </main>
  );
}