// components/CtaCards.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CtaCards() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Card 1 — Ask Setu AI */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-amber-100 rounded-2xl px-6 sm:px-8 py-8 flex items-center justify-between gap-6 min-h-[220px]"
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2">
              Need Help Choosing<br className="hidden sm:block" /> the Right Service?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
              Let Setu AI guide you to the right professionals.
            </p>
            <button className="bg-slate-800 hover:bg-slate-900 transition text-white text-sm font-semibold rounded-lg px-5 py-2.5">
              Ask Setu AI
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block relative w-28 h-28 lg:w-32 lg:h-32 flex-shrink-0"
          >
            <Image
              src="/robot.png"
              alt="Setu AI assistant"
              fill
              sizes="128 px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Card 2 — Join as Service Provider */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-amber-100 rounded-2xl px-6 sm:px-8 py-8 flex items-center justify-between gap-6 min-h-[220px]"
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2">
              Grow Your Business with Abhiyantri Setu
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Join thousands of service providers and grow your business.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
              {["More Leads", "Direct Client Access", "More Visibility", "Business Growth"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-gray-800">
                  <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <Link href='/auth' className="bg-amber-500 hover:bg-amber-600 transition text-gray-900 text-sm font-semibold rounded-lg px-5 py-2.5">
              Join as Service Provider
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:block relative w-28 h-32 lg:w-32 lg:h-36 flex-shrink-0"
          >
            <Image
              src="/men.png"
              alt="Service provider"
              fill
              sizes="128px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}