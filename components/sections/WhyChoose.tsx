"use client";

import { motion } from "framer-motion";
import { Shield, Calculator, Clock, FileText } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      desc: "All service providers are thoroughly vetted and verified before joining our platform.",
    },
    {
      icon: Calculator,
      title: "AI Cost Estimator",
      desc: "Get instant cost estimates for your project with our AI-powered price calculator.",
    },
    {
      icon: Clock,
      title: "Project Tracking",
      desc: "Monitor your project progress in real-time with our tracking system.",
    },
    {
      icon: FileText,
      title: "Digital Contracts",
      desc: "Secure digital contracts and BOQ documents for all your projects.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl text-black font-semibold text-center mb-12"
        >
          Why Choose Abhiyantri Setu
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white rounded-xl p-6 text-center border shadow-sm 
                hover:shadow-xl hover:border-yellow-400 transition-colors duration-300 ease-in-out group cursor-pointer"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center 
                  rounded-full bg-yellow-100 transition 
                  group-hover:bg-yellow-200"
                >
                  <Icon
                    className="text-yellow-500"
                    size={26}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="font-semibold text-black text-lg mb-2 transition group-hover:text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed transition group-hover:text-gray-700">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}