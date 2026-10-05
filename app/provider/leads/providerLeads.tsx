"use client";

import NotificationBell from "@/components/shared/NotificationBell";
import MessageButton from "@/components/shared/MessageButton";

import { useState } from "react";
import Link from "next/link";

//  Type matching Prisma getProviderLeads return shape 
interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  budget: number | null;
  location: string | null;
  isUrgent?: boolean;
  createdAt: Date;
  client: {
    id: string;
    name: string | null;
    phone?: string | null;
  };
}

interface Props {
  userName: string;
  userEmail: string;
  userImage: string | null;
  leads: Job[];
  initialIsOnline: boolean;
}

//Helpers 
function getInitials(name: string | null | undefined) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function getFirstName(name: string | null | undefined) {
  if (!name) return "";
  return name.split(" ")[0];
}
function formatBudget(amount: number | null): string {
  if (!amount) return "Budget N/A";
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${amount.toLocaleString("en-IN")}`;
  return `₹${amount}`;
}
function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

// Avatar color based on name
const AVATAR_COLORS = [
  { bg: "#FEF3C7", text: "#92400E" },
  { bg: "#DBEAFE", text: "#1E40AF" },
  { bg: "#D1FAE5", text: "#065F46" },
  { bg: "#EDE9FE", text: "#4C1D95" },
  { bg: "#FCE7F3", text: "#9D174D" },
  { bg: "#FEE2E2", text: "#991B1B" },
];
function getAvatarColor(name: string | null) {
  if (!name) return AVATAR_COLORS[0];
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// Lead Card 
function LeadCard({ job }: { job: Job }) {
  const clientName = job.client.name ?? "Unknown";
  const initial = getInitials(clientName);
  const color = getAvatarColor(clientName);
  

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {initial}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-900">{clientName}</span>
              {job.isUrgent && (
                <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Urgent
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                New
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5" suppressHydrationWarning>{timeAgo(job.createdAt)}</p>
          </div>
        </div>
        <span className="text-base font-bold text-yellow-500 flex-shrink-0 ml-2">
          {formatBudget(job.budget)}
        </span>
      </div>

      {/* Work type + location */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          {job.title}
        </div>
        {job.location && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {job.location}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2.5">
        <a href={job.client.phone ? `tel:${job.client.phone}` : `/provider/leads/${job.id}`} title={job.client.phone ? job.client.phone : "Phone not shared — open details"} className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.42 2 2 0 0 1 3.12 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 23 17z"/>
          </svg>
          Call
        </a>
        <MessageButton userId={job.client.id} jobId={job.id} viewerRole="provider" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat
        </MessageButton>
        <Link
          href={`/provider/leads/${job.id}`}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl py-2.5 text-sm font-bold text-gray-900 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// Main Leads Page 
export default function ProviderLeads({
  userName, leads, initialIsOnline,
}: Props) {
  // const pathname = usePathname();
  // const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const firstName = getFirstName(userName);

  const statusOptions = ["All Status", "New", "Contacted", "Interested", "Closed"];

  // All leads from Prisma are "New" (not yet bid on), filter by search only
  const filteredLeads = (leads ?? []).filter((job) => {
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      (job.client.name ?? "").toLowerCase().includes(q) ||
      job.title.toLowerCase().includes(q) ||
      (job.location ?? "").toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All Status" || statusFilter === "New";
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-1 h-screen overflow-y-auto pb-20 lg:pb-0 min-w-0">

      {/* ── PAGE HEADER ── */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Namaste {firstName} 👋</h1>
            <p className="text-gray-400 text-sm mt-0.5">Naye customers aapka intezaar kar rahe hain</p>
          </div>
          {/* Desktop notifications */}
          <div className="hidden lg:block"><NotificationBell /></div>
        </div>

        {/* ── SEARCH + FILTER BAR ── */}
        <div className="flex gap-3 mb-5 lg:mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Naam ya service search karein..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-8 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* ── LEADS LIST ── */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
            <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            <p className="text-sm font-semibold text-gray-400">Koi leads nahi mili</p>
            <p className="text-xs text-gray-300 mt-1">
              {search ? "Try changing your search" : "Aapke area mein abhi koi naya kaam nahi hai"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 lg:space-y-4">
            {filteredLeads.map((job) => (
              <LeadCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}