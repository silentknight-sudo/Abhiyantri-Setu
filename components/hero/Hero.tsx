"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">

            {/* VIDEO BACKGROUND (recommended) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/60"></div>

            {/* CONTENT */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-5xl px-4"
            >
                <h1 className="text-3xl md:text-5xl font-semibold leading-[1.15] tracking-tight">
                    Connecting{" "}
                    <span className="text-yellow-400">
                        Construction Professionals
                    </span>{" "}
                    & Clients
                </h1>

                <p className="mt-4 text-md md:text-lg text-gray-200">
                    Hire trusted experts, track your project, and pay securely — all in one place
                </p>

                {/* SEARCH BAR */}
                <div className="mt-6 flex justify-center">
                    <div className="w-full md:w-162.5 bg-white rounded-full shadow-lg flex items-center px-4 py-2">
                        <input
                            className="w-full px-2 py-2 outline-none text-black text-sm"
                            placeholder="Search for services... e.g., 'modular kitchen', '2BHK renovation'"
                        />
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                    <button className="bg-[#1E293B] px-6 py-3 rounded-lg font-medium hover:scale-105 transition">
                        Post Your Project
                    </button>

                    <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition">
                        Browse Services
                    </button>
                </div>
            </motion.div>
        </section>
    );
}