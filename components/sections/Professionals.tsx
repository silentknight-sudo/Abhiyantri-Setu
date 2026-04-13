"use client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Professionals() {
  return (
    <section className="py-20 bg-gray-200">
      
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          
          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Verified Professionals Ready to Help
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-500 mt-4 mb-6 leading-relaxed max-w-xl">
            Our platform connects you with thoroughly vetted construction
            professionals across Greater Noida. Every provider goes through
            our rigorous verification process.
          </p>

          {/* LIST */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              "Contractors",
              "Interior Designers",
              "Plumbers",
              "Architects",
              "Electricians",
              "Civil Engineers",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 group transition cursor-pointer"
              >
                <CheckCircle
                  className="text-yellow-500 transition-transform duration-300 group-hover:scale-110"
                  size={18}
                />
                <span className="text-gray-700 text-sm md:text-base transition group-hover:text-black">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button className="bg-[#1E293B] text-white px-6 py-3 rounded-lg 
          hover:scale-105 hover:shadow-lg transition-all duration-300">
            Browse All Services
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full overflow-hidden rounded-xl group">
          <Image
            src="/professionals.jpg"
            alt="professionals"
            width={600}
            height={400}
            className="object-cover w-full h-auto 
            transition-transform duration-500 group-hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
}