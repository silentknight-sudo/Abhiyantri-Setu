"use client";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="bg-[#0F172A] text-white">
      
      {/* CTA PART */}
      <div className="max-w-5xl mx-auto px-4 py-14 text-center">
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Get Started?
        </h2>

        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-xl mx-auto">
          Join thousands of satisfied clients and professionals on Abhiyantri Setu
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            Register as Provider
          </button>

          <button  className="bg-gray-200 text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
            Contact Us
          </button>
        </div>
      </div>

      {/* FOOTER CONTENT */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          
          {/* LOGO + DESC */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">
                AS
              </div> */}
              <Image src="/logo_transparent.png" alt="" width={150} height={65}></Image>
              {/* <h3 className="font-semibold text-lg">Abhiyantri Setu</h3> */}
            </div>

            <p className="text-gray-400">
              Connecting construction professionals with clients in Greater Noida.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 space-x-2 text-gray-400">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li> <Link href="/services">Services</Link></li>
            </ul>
          </div>

          {/* FOR PROFESSIONALS */}
          <div>
            <h4 className="font-semibold mb-3">For Professionals</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Register</li>
              <li>Client Portal</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={14} />+919289553069
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> info@abhiyantrisetu.com
              </li>
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
              <li>Greater Noida, India</li>
            </ul>
          </div>

        </div>
      </div>

    </section>
  );
}