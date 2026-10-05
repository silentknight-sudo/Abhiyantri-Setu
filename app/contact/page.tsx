"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { submitContact } from "@/lib/actions/contact-action";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

// Icons 
const PhoneIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.92-8.02A2 2 0 0 1 4 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 17z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

//  Types 
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Sub-components 
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const InfoCard = ({ icon, title, value }: InfoCardProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
    <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm text-center">{value}</p>
  </div>
);

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type = "text", placeholder, value, onChange }: InputFieldProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
    />
  </div>
);

interface HoursRowProps {
  day: string;
  time: string;
  closed?: boolean;
}

const HoursRow = ({ day, time, closed = false }: HoursRowProps) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 text-sm">
    <span className="text-gray-500">{day}</span>
    <span className={`font-semibold ${closed ? "text-gray-400" : "text-gray-900"}`}>{time}</span>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const [status, setStatus] = useState<{ type: "idle" | "sending" | "sent" | "error"; msg?: string }>({ type: "idle" });

  const handleSubmit = async () => {
    setStatus({ type: "sending" });
    const res = await submitContact(form);
    if (res.error) {
      setStatus({ type: "error", msg: res.error });
      return;
    }
    setStatus({ type: "sent", msg: "Thanks! We've received your message and will get back to you soon." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ── */}
      <section className="bg-[#1A2332] text-center px-6 py-16 sm:py-20 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto">
          Have questions? We&apos;re here to help you find the right construction professionals
        </p>
      </section>

      {/* ── Info Cards ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <InfoCard icon={<PhoneIcon />} title="Phone" value="+91 98765 43210" />
          <InfoCard icon={<EmailIcon />} title="Email" value="contact@abhiyantrisetu.com" />
          <InfoCard icon={<LocationIcon />} title="Location" value="Greater Noida, Uttar Pradesh, India" />
        </div>
      </div>

      {/* ── Main Section ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Contact Form ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-7">
              Send Us a Message
            </h2>

            <div className="flex flex-col gap-5">
              <InputField
                label="Your Name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange("name")}
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange("email")}
              />
              <InputField
                label="Phone Number"
                type="tel"
                placeholder="+919289553069"
                value={form.phone}
                onChange={handleChange("phone")}
              />
              <InputField
                label="Subject"
                placeholder="What is this regarding?"
                value={form.subject}
                onChange={handleChange("subject")}
              />

              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">Message</label>
                <textarea
                  placeholder="Tell us more about your needs..."
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all resize-y"
                />
              </div>

              {status.msg && (
                <p className={`text-sm rounded-xl px-4 py-3 ${status.type === "error" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>
                  {status.msg}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={status.type === "sending"}
                className="w-full bg-[#1A2332] text-white font-semibold py-4 rounded-xl hover:bg-[#2C3E55] transition-colors duration-200 mt-1 disabled:opacity-60"
              >
                {status.type === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-6">

            {/* WhatsApp Card */}
            <div className="bg-yellow-400 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-3">
                <ChatIcon />
                <h3 className="text-lg font-bold text-gray-900">Chat on WhatsApp</h3>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed mb-5">
                Get instant responses to your queries. Our team is available on WhatsApp for quick assistance.
              </p>
              <a
                href="https://wa.me/919289553069"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#1A2332] text-white font-semibold py-4 rounded-xl hover:bg-[#2C3E55] transition-colors duration-200 text-sm"
              >
                <ChatIcon />
                Start WhatsApp Chat
              </a>
            </div>

            {/* Office Hours */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Office Hours</h3>
              <HoursRow day="Monday – Friday:" time="9:00 AM – 6:00 PM" />
              <HoursRow day="Saturday:" time="10:00 AM – 4:00 PM" />
              <HoursRow day="Sunday:" time="Closed" closed />
            </div>

            {/* Service Area */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Service Area</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Currently serving Greater Noida and surrounding areas. Expanding to more cities soon!
              </p>
              <div className="bg-slate-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Launch City:</p>
                <p className="font-semibold text-gray-900">Greater Noida, Uttar Pradesh</p>
              </div>
            </div>

          </div>
        </div>
      </div>
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
          <Link href="/ai" className="fixed bottom-6 right-6 z-40 bg-yellow-400 text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
            ✨ Ask Setu AI
          </Link>
          
          </section>

    </div>
  );
}