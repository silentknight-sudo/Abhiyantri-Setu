"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft, Bell, CheckCircle2, Truck, ShieldCheck,
  Hammer, Zap, Wind, Wrench, Container, Gauge
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const equipment = [
  { icon: Container, label: "JCB & Excavators" },
  { icon: Truck,     label: "Concrete Mixers" },
  { icon: Gauge,     label: "Compactors" },
  { icon: Wind,      label: "Cranes & Lifts" },
  { icon: Zap,       label: "Generators" },
  { icon: Hammer,    label: "Scaffolding" },
];

const highlights = [
  "Daily, weekly & monthly rental plans",
  "Operator included on request",
  "On-site delivery & pickup",
  "Fully maintained & insured equipment",
];

const stats = [
  { value: "200+",  label: "Equipment Listed" },
  { value: "30+",   label: "Equipment Types" },
  { value: "Same Day", label: "Delivery Available" },
  { value: "100%",  label: "Insured Fleet" },
];

const howItWorks = [
  { step: "01", title: "Browse Equipment",  desc: "Filter by type, capacity, and availability." },
  { step: "02", title: "Choose Rental Plan", desc: "Pick daily, weekly or monthly pricing." },
  { step: "03", title: "Book & Confirm",    desc: "Instant confirmation with digital receipt." },
  { step: "04", title: "Get it Delivered",  desc: "Equipment arrives at your site on time." },
];

export default function RentEquipmentComingSoon() {
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
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[130px] opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-50  rounded-full blur-[130px] opacity-60" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-yellow-50 rounded-full blur-[100px] opacity-40" />
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
            initial={{ opacity: 0, scale: 0.4, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.45 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 mx-auto flex items-center justify-center mb-8 shadow-md"
          >
            <Truck className="w-11 h-11 sm:w-12 sm:h-12 text-amber-500" strokeWidth={1.5} />
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
            Rent Construction Equipment
            <span className="block text-amber-500 mt-1">On Demand, No Ownership Cost</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10"
          >
            Access JCBs, concrete mixers, scaffolding and heavy machinery on
            demand delivered to your site, fully maintained, with flexible
            rental plans that fit any project size.
          </motion.p>

          {/* Equipment pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {equipment.map((e, i) => (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.07 }}
                className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
              >
                <e.icon className="w-4 h-4 text-amber-500" />
                {e.label}
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

          {/* How it works — unique to this page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              How It Will Work
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {howItWorks.map((h, i) => (
                <motion.div
                  key={h.step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.78 + i * 0.09 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left relative overflow-hidden"
                >
                  {/* Step number watermark */}
                  <span className="absolute -top-2 -right-1 text-5xl font-black text-gray-100 select-none leading-none">
                    {h.step}
                  </span>
                  <p className="text-xs font-bold text-amber-500 mb-1 relative z-10">{h.step}</p>
                  <p className="text-sm font-semibold text-gray-900 mb-1 relative z-10 leading-snug">{h.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed relative z-10">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10 text-left"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.9 + i * 0.08 }}
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
            transition={{ duration: 0.5, delay: 1.05 }}
            className="max-w-md mx-auto"
          >
            {!submitted ? (
              <>
                <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  Get notified when equipment rental goes live
                </p>
                <div className={`flex items-center gap-2 border rounded-full px-4 py-1.5 bg-white shadow-sm transition
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
                  <p className="text-xs text-red-500 mt-2">Please enter a valid email address.</p>
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
                <p className="text-sm font-semibold text-gray-900 mb-1">You&apos;re on the list! 🎉</p>
                <p className="text-xs text-gray-500">
                  We&apos;ll notify{" "}
                  <span className="font-medium text-amber-600">{email}</span>{" "}
                  the moment equipment rental goes live.
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
        <Link href="/" className="hover:text-amber-500 transition">abhiyantrisetu.in</Link>
      </motion.footer>

    </main>
  );
}