// components/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Wrench, Package, Truck, UserCheck, Users, Shield, Building2 } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Home,      title: "Build or Renovate",   desc: "Find contractors, architects and engineers.",         href: "/services/build-renovate" },
  { icon: Wrench,    title: "Book a Home Service", desc: "Plumbing, electrical, painting, cleaning & more.",   href: "/services/home-services" },
  { icon: Package,   title: "Buy Materials",        desc: "Cement, steel, tiles, paints and more.",             href: "/services/buy-materials" },
  { icon: Truck,     title: "Rent Equipment",       desc: "JCB, scaffolding, mixers and more.",                 href: "/services/rent-equipment" },
  { icon: UserCheck, title: "Find a Professional", desc: "Architects, engineers, designers & consultants.",    href: "/services/find-professional" },
];

const stats = [
  { icon: Users,     value: "5,000+", label: "Service Providers" },
  { icon: Wrench,    value: "100+",   label: "Services" },
  { icon: Building2, value: "1,000+", label: "Projects Completed" },
  { icon: Package,   value: "50+",    label: "Material Suppliers" },
  { icon: Shield,    value: "100%",   label: "Verified Professionals" },
];

export default function ServicesSection() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-8 lg:py-10 bg-white space-y-4">

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              href={s.href}
              className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-amber-200 transition-all duration-200 h-full group"
            >
              <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition">
                <s.icon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm leading-snug">{s.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed flex-1">{s.desc}</p>
              <div className="w-8 h-8 rounded-full bg-amber-500 group-hover:bg-amber-600 transition flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border border-gray-200 rounded-2xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                   divide-y sm:divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-gray-200"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 px-5 py-5
              ${i % 2 === 0 ? "sm:border-r sm:border-gray-200 lg:border-r-0" : ""}
            `}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <s.icon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 leading-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}