"use client";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Found an excellent contractor for my home renovation. The entire process was smooth and transparent.",
    name: "Rajesh Kumar",
    role: "Homeowner",
  },
  {
    text: "Hired an interior designer through Abhiyantri Setu. Very professional service and great results!",
    name: "Priya Sharma",
    role: "Business Owner",
  },
  {
    text: "Best platform to find reliable construction professionals in Greater Noida. Highly recommended!",
    name: "Amit Verma",
    role: "Project Manager",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-tight">
          What Our Clients Say
        </h2>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm 
              hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] 
            hover:border-yellow-400 transition-all duration-300 ease-in-out"
            >
              
              {/* STARS */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{item.text}"
              </p>

              {/* USER */}
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}