"use client";

import { Target, Eye, Shield, Award, Users } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-gray-100">

      {/* 🔥 HERO SECTION */}
      <section className="bg-[#1E293B] text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Abhiyantri Setu
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Bridging the gap between construction professionals and clients in Greater Noida
        </p>
      </section>

      {/* 🔥 OUR STORY */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Our Story
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Abhiyantri Setu was born from a simple observation: finding reliable construction professionals in Greater Noida was challenging for clients, while skilled professionals struggled to reach potential customers effectively.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            We recognized that both sides needed a trusted platform—a bridge (Setu) that could connect them transparently, efficiently, and securely. Thus, Abhiyantri Setu was created as a digital marketplace where quality meets trust.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Today, we're proud to serve as Greater Noida's premier platform for construction services, helping clients find verified professionals and enabling service providers to grow their businesses.
          </p>
        </div>
      </section>

       

{/* 🔥 MISSION & VISION */}
<section className="py-20 bg-gray-200">
  <div className="max-w-6xl mx-auto px-4">

    <div className="grid md:grid-cols-2 gap-8">

      {/* MISSION */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm 
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">

        {/* ICON */}
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 mb-5">
          <Target className="text-yellow-500" size={22} />
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Our Mission
        </h3>

        {/* TEXT */}
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          To revolutionize the construction services industry by creating a
          transparent, efficient, and trustworthy platform that empowers both
          clients and professionals. We aim to simplify project management,
          ensure quality service delivery, and facilitate seamless communication
          throughout the construction journey.
        </p>
      </div>

      {/* VISION */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm 
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">

        {/* ICON */}
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 mb-5">
          <Eye className="text-yellow-500" size={22} />
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Our Vision
        </h3>

        {/* TEXT */}
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          To become India's most trusted construction services marketplace,
          where every project finds the perfect professional, and every
          professional builds a thriving career. We envision a future where
          construction services are accessible, reliable, and stress-free for everyone.
        </p>
      </div>

      </div>
    </div>
  </section>

      {/* 🔥 CORE VALUES */}
      <section className="py-16 ">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl border text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-100">
                <Shield className="text-yellow-500" />
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">
                Trust & Transparency
              </h3>
              <p className="text-gray-600 text-sm">
                We ensure complete transparency in all transactions and maintain the highest standards of trust.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl border text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-100">
                <Award className="text-yellow-500" />
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">
                Quality First
              </h3>
              <p className="text-gray-600 text-sm">
                Every professional on our platform is verified to ensure top-quality service delivery.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl border text-center hover:shadow-lg hover:-translate-y-1 transition">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-100">
                <Users className="text-yellow-500" />
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600 text-sm">
                Building a strong community of professionals and clients who grow together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 PROBLEM SECTION */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            The Problem We Solve
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Clients */}
            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
              <h3 className="text-yellow-500 font-semibold mb-4">
                For Clients
              </h3>

              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Difficulty finding trustworthy professionals</li>
                <li>• Lack of transparency in pricing</li>
                <li>• Poor project tracking and communication</li>
                <li>• Payment security concerns</li>
                <li>• No centralized platform for all needs</li>
              </ul>
            </div>

            {/* Professionals */}
            <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
              <h3 className="text-yellow-500 font-semibold mb-4">
                For Professionals
              </h3>

              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Limited client reach and visibility</li>
                <li>• Difficulty in lead management</li>
                <li>• No organized system for tracking projects</li>
                <li>• Payment delays and disputes</li>
                <li>• Lack of professional credibility platform</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 TEAM */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Founding Team
          </h2>

          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <p className="text-gray-600 leading-relaxed">
              Abhiyantri Setu is founded by a team of construction industry experts and technology enthusiasts who share a common vision: to transform how construction services are delivered in India. With deep understanding of both the construction sector and digital platforms, our team is committed to creating lasting value for all stakeholders.
            </p>
          </div>

        </div>
      </section>
      

      {/* 🔥 FOOTER SECTION */}
<section className="bg-[#1E293B] text-gray-300 pt-16 pb-10 relative">

<div className="max-w-7xl mx-auto px-4">

  {/* GRID */}
  <div className="grid md:grid-cols-4 gap-10">

    {/* LOGO */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        {/* <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-md">
          AS
        </div> */}
        <Image src="/logo.jpeg" alt="" width={55} height={25}></Image>
        <h3 className="text-white font-semibold text-lg">
          Abhiyantri Setu
        </h3>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed">
        Connecting construction professionals with clients in Greater Noida.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h4 className="text-white font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white cursor-pointer">Home</li>
        <li className="hover:text-white cursor-pointer">About Us</li>
        <li className="hover:text-white cursor-pointer">Services</li>
      </ul>
    </div>

    {/* PROFESSIONALS */}
    <div>
      <h4 className="text-white font-semibold mb-4">For Professionals</h4>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white cursor-pointer">Register</li>
        <li className="hover:text-white cursor-pointer">Client Portal</li>
        <li className="hover:text-white cursor-pointer">Contact Us</li>
      </ul>
    </div>

    {/* CONTACT */}
    <div>
      <h4 className="text-white font-semibold mb-4">Connect With Us</h4>

      <div className="space-y-3 text-sm">
        <p>📞 +919289553069</p>
        <p>✉️ info@abhiyantrisetu.com</p>

        <div className="flex items-center  gap-4 ">
                          <a
                            href="https://www.instagram.com/abhiyantrisetu/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-500 hover:scale-110 transition"
                          >
                            <FaInstagram size={22} />
                          </a>
                      
                          <a
                            href="https://wa.me/919289553069"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-green-500 hover:scale-110 transition"
                          >
                            <FaWhatsapp size={22} />
                          </a>
                        </div>

        <p className="text-gray-400">Greater Noida, India</p>
      </div>
    </div>

  </div>

  {/* DIVIDER */}
  <div className="border-t border-gray-700 my-10"></div>

  {/* BOTTOM */}
  <div className="text-center text-sm text-gray-400">
    <p>© 2026 Abhiyantri Setu. All rights reserved.</p>
    <p className="mt-1">Launching first in Greater Noida</p>
  </div>

</div>

{/* FLOATING BUTTON */}
<button className="fixed bottom-6 right-6 bg-yellow-400 text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
  ✨ Ask Setu AI
</button>

</section>

    </div>
  );
}