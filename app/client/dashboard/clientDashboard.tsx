"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";


// ── Types 
interface Props {
  userName: string;
  userEmail: string;
  userImage: string | null;
  jobs: any[];
  success: string | null;
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

// ── Helpers
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getFirstName(name: string): string {
  return name.split(" ")[0];
}

// ── Icons 
const PlusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const BookIcon = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none"
   stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const PaymentIcon = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const MessageIcon = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none"
   stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ProfileIconSvg = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const EmptyIcon = () => (
  <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Service icons 
const ArchitectIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const ContractorIconSvg = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 
    2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const InteriorIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const ElectricianIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const PlumberIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 
    6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const PainterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L3 14.67V21h6.33l10.06-10.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ── Sub-components 
const StatCard = ({ label, value, color }: StatCardProps) => (
  <div className={`bg-white border-l-4 ${color} rounded-xl p-5 shadow-sm`}>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const services = [
  { label: "Architect", icon: <ArchitectIcon />, color: "bg-blue-50 text-blue-500" },
  { label: "Contractor", icon: <ContractorIconSvg />, color: "bg-orange-50 text-orange-500" },
  { label: "Interior", icon: <InteriorIcon />, color: "bg-purple-50 text-purple-500" },
  { label: "Electrician", icon: <ElectricianIcon />, color: "bg-yellow-50 text-yellow-500" },
  { label: "Plumber", icon: <PlumberIcon />, color: "bg-teal-50 text-teal-500" },
  { label: "Painter", icon: <PainterIcon />, color: "bg-pink-50 text-pink-500" },
];

const quickLinks = [
  { label: "Book a Service", icon: <BookIcon /> , href:"/services" },
  { label: "My Projects", icon: <BriefcaseIcon />, href: "/client/project"  },
  { label: "Payments", icon: <PaymentIcon />, href: "/client/payments" },
  { label: "Messages", icon: <MessageIcon />, href: "/client/messages" },
  { label: "My Profile", icon: <ProfileIconSvg />, href: "/client/profile" },
];

// Main Dashboard
export default function ClientDashboardClient({ userName, userEmail, userImage,jobs, success }: Props) {

const [showMessage, setShowMessage] = useState(true);
const router = useRouter();

useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setShowMessage(false);
      router.replace("/client/dashboard"); 
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [success, router]);

const initials = getInitials(userName);
const firstName = getFirstName(userName);

  return (
    <div className="min-h-screen bg-gray-50">
     
      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Header */}
        {success === "job_created" && showMessage && (
  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
    Job posted successfully!
  </div>
    )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#1A2332] text-white flex items-center justify-center 
            font-bold text-lg shrink-0 overflow-hidden">
              {userImage ? (
                <Image src={userImage} alt={userName} width={48} height={48} className="object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Welcome back, {firstName}! 👋
              </h1>
              <p className="text-gray-500 text-sm">Manage your construction projects</p>
            </div>
          </div>
          <Link
            href="/jobs/post"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-5 py-3 
            rounded-xl hover:bg-yellow-500 transition-colors text-sm shadow-sm self-start sm:self-auto"
          >
            <PlusIcon />
            Post New Job
          </Link>
        </div>

        {/* Quick Links */}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center
               gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium text-gray-700"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Jobs" value={jobs.length} color="border-yellow-400" />
          <StatCard label="Active" value={jobs.filter(j => j.status === "ACTIVE").length} color="border-blue-400" />
          <StatCard label="Pending Bids" value={0} color="border-orange-400" />
          <StatCard label="Completed" value={0} color="border-green-400" />
        </div>

        {/* Find a Service */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">Find a Service</h2>
            <Link href="/services" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              View All <ArrowRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {services.map((s) => (
              <button key={s.label} className="flex flex-col items-center gap-2 group">
                <div className={`w-14 h-14 rounded-full ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  {s.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Active Projects */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Active Projects</h2>
              <span className="bg-gray-100 text-black text-xs font-bold px-2.5 py-1 rounded-full">{jobs.length}</span>
            </div>
            {jobs.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
    <EmptyIcon />
    <p className="text-gray-400 text-sm">No active projects yet</p>
    <Link
      href="/jobs/post"
      className="inline-flex items-center gap-2 bg-[#1A2332] text-white font-semibold px-5 py-2.5 rounded-xl"
    >
      <PlusIcon />
      Post Your First Job
    </Link>
   </div>
  ) : (
    <div className="space-y-3">
    {jobs.map((job) => (
      <div key={job.id} className="border p-4 rounded-lg">
        <h3 className="font-semibold text-black">{job.title}</h3>
        <p className="text-sm text-black">{job.category}</p>
        <p className="text-sm text-black font-medium">₹{job.budget}</p>
      </div>
    ))}
  </div>
   )}
          </div>

          {/* Right side */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Pending Bids</h2>
              <p className="text-gray-400 text-sm text-center py-4">No pending bids</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Completed</h2>
              <p className="text-gray-400 text-sm text-center py-4">No completed projects</p>
            </div>
            <div className="bg-[#1A2332] rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <ShieldIcon />
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Verified Contractors</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    All contractors on Abhiyantri Setu are KYC verified with credibility scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <section className="bg-[#1E293B] text-gray-300 pt-16 pb-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.jpeg" alt="" width={55} height={25} />
                <h3 className="text-white font-semibold text-lg">Abhiyantri Setu</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connecting construction professionals with clients in Greater Noida.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Home</li>
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Services</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Register</li>
                <li className="hover:text-white cursor-pointer">Client Portal</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-3 text-sm">
                <p>📞 +919289553069</p>
                <p>✉️ info@abhiyantrisetu.com</p>
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/abhiyantrisetu/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 hover:scale-110 transition">
                    <FaInstagram size={22} />
                  </a>
                  <a href="https://wa.me/919289553069" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 hover:scale-110 transition">
                    <FaWhatsapp size={22} />
                  </a>
                </div>
                <p className="text-gray-400">Greater Noida, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 my-10"></div>
          <div className="text-center text-sm text-gray-400">
            <p>© 2026 Abhiyantri Setu. All rights reserved.</p>
            <p className="mt-1">Launching first in Greater Noida</p>
          </div>
        </div>
        <button className="fixed bottom-6 right-6 bg-yellow-400 text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
          ✨ Ask Setu AI
        </button>
      </section>
    </div>
  );
}