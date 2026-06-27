"use client";

import Link from "next/link";
import type {
  ProviderStats,
  RecentLead,
  ActiveJob,
  UpcomingJob,
  ProfileCompletion,
} from "@/lib/provider-dashboard";

// Types 
interface Props {
  userName: string;
  userEmail: string;
  userImage: string | null;
  stats: ProviderStats;
  recentLeads: RecentLead[];
  activeJobs: ActiveJob[];
  upcomingJobs: UpcomingJob[];
  profileCompletion: ProfileCompletion;
  walletBalance: number;
  initialIsOnline: boolean;
  specialty: string;
}

// Helpers
function getFirstName(name: string) {
  if (!name) return "";
  return name.split(" ")[0];
}
function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

const INITIALS_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

//Status Badge 
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: "bg-blue-100 text-blue-700 border border-blue-200",
    Contacted: "bg-amber-100 text-amber-700 border border-amber-200",
    Interested: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Closed: "bg-gray-100 text-gray-500 border border-gray-200",
    Confirmed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border border-amber-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// Stat Card 
function StatCard({ icon, value, label, change, bg, iconColor }: {
  icon: React.ReactNode; value: string; label: string; change: string; bg: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center ${bg}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        {change && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">↑ {change}</span>
        )}
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </div>
  );
}

//Main Dashboard
export default function ProviderDashboard({
  userName,
  stats, recentLeads, activeJobs, upcomingJobs,
  profileCompletion, walletBalance, specialty,
}: Props) {
  const firstName = getFirstName(userName);

  const profileItems = [
    { label: "Basic Information", done: profileCompletion.hasBasicInfo },
    { label: "Services & Pricing", done: profileCompletion.hasServicesPricing },
    { label: "Work Photos", done: profileCompletion.hasWorkPhotos },
    { label: "ID Verification", done: profileCompletion.hasIdVerification },
    { label: "Bank Details", done: profileCompletion.hasBankDetails },
  ];

  return (
    <div className="p-4 lg:p-6">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-center justify-between mb-5 lg:mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Namaste {firstName} 👋</h1>
          <p className="text-gray-400 text-sm mt-0.5">Aaj ka overview dekhein</p>
        </div>
        <button className="relative flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="hidden sm:inline">Notifications</span>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
        </button>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mb-5 lg:mb-6">
        <StatCard
          icon={<svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          value={stats.newLeads.toString()} label="New Leads" change="20%" bg="bg-blue-50" iconColor="text-blue-600"
        />
        <StatCard
          icon={<svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
          value={stats.followUps.toString()} label="Follow Ups" change="10%" bg="bg-amber-50" iconColor="text-amber-600"
        />
        <StatCard
          icon={<svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
          value={stats.activeJobs.toString()} label="Jobs Active" change="15%" bg="bg-emerald-50" iconColor="text-emerald-600"
        />
        <StatCard
          icon={<svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
          value={formatCurrency(stats.todayEarnings)} label="Today's Earnings" change="15%" bg="bg-orange-50" iconColor="text-orange-600"
        />
        <div className="col-span-2 lg:col-span-1">
          <StatCard
            icon={<svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
            value={formatCurrency(stats.monthEarnings)} label="This Month" change="18%" bg="bg-violet-50" iconColor="text-violet-600"
          />
        </div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-5">

        {/* ── LEFT PANEL ── */}
        <div className="space-y-4 lg:space-y-5 min-w-0">

          {/* Recent Leads */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 lg:px-5 pt-4 lg:pt-5 pb-3 lg:pb-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Recent Leads</h2>
              <Link href="/provider/leads" className="text-xs text-yellow-600 font-bold hover:underline">View All →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentLeads.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-400">No leads yet. Complete your profile to start getting leads.</p>
                </div>
              ) : (
                recentLeads.map((lead, i) => (
                  <div key={lead.id} className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${INITIALS_COLORS[i % INITIALS_COLORS.length]}`}>
                      {lead.clientInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{lead.clientName}</p>
                      <p className="text-xs text-gray-400 truncate">{lead.workType}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="truncate max-w-[120px]">{lead.location}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block mx-1">{lead.timeAgo}</span>
                    <StatusBadge status={lead.leadStatus} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 lg:px-5 pt-4 lg:pt-5 pb-3 lg:pb-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Chal Rahe Kaam</h2>
              <Link href="/provider/jobs" className="text-xs text-yellow-600 font-bold hover:underline">View All →</Link>
            </div>
            <div className="p-3 lg:p-4 space-y-3">
              {activeJobs.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-gray-400">No active jobs. Bid on new leads to get started.</p>
                </div>
              ) : (
                activeJobs.map((job) => (
                  <div key={job.id} className="border border-gray-100 rounded-xl p-3 lg:p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900">{job.clientName}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{job.workTitle} • {job.location}</p>
                      </div>
                      <button className="bg-[#111827] text-white text-xs font-bold px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0 ml-3">
                        Manage
                      </button>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                      <div
                        className={`h-1.5 rounded-full ${job.progress >= 70 ? "bg-emerald-500" : job.progress >= 40 ? "bg-blue-500" : "bg-yellow-500"}`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">{job.progress}% complete</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Trophy Banner */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 lg:p-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 lg:gap-4 min-w-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  <path d="M7 4H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"/><path d="M17 4h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/>
                  <path d="M7 4a5 5 0 0 0 10 0"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">Top 20% of {specialty} Professionals! 🏆</p>
                <p className="text-xs text-gray-500 mt-0.5">Click to view leaderboard</p>
              </div>
            </div>
            <Link href="/provider/leaderboard" className="text-sm text-yellow-600 font-bold hover:underline flex-shrink-0">View →</Link>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-4">

          {/* Profile Completion */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">My Profile</h3>
              <span className="text-sm font-bold text-yellow-600">{profileCompletion.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion.percentage}%` }}
              />
            </div>
            <div className="space-y-2.5 mb-4">
              {profileItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  {item.done
                    ? <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg className="w-4 h-4 text-gray-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>}
                  <span className={`text-xs font-medium ${item.done ? "text-gray-700" : "text-gray-400"}`}>{item.label}</span>
                </div>
              ))}
            </div>
            <Link href="/provider/profile">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm py-2.5 rounded-xl transition-colors">
                Complete Profile
              </button>
            </Link>
          </div>

          {/* Upcoming Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Upcoming Jobs</h3>
              <Link href="/provider/calendar" className="text-xs text-yellow-600 font-bold hover:underline">View Calendar</Link>
            </div>
            {upcomingJobs.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-3">No upcoming jobs scheduled</p>
            ) : (
              <div className="space-y-3">
                {upcomingJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-3">
                    <div className="text-center w-10 flex-shrink-0 bg-gray-50 rounded-lg py-1.5">
                      <p className="text-base font-bold text-gray-900 leading-none">{job.day}</p>
                      <p className="text-xs text-gray-400 uppercase font-medium">{job.month}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-400 truncate">{job.clientName} • {job.time}</p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wallet */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Wallet Balance</h3>
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-gray-900">₹{walletBalance.toLocaleString("en-IN")}</p>
              <button className="text-sm text-yellow-700 border-2 border-yellow-400 rounded-lg px-3 py-1.5 font-bold hover:bg-yellow-50 transition-colors">
                Withdraw
              </button>
            </div>
            <Link href="/provider/transactions" className="text-xs text-yellow-600 hover:underline font-semibold">View Transactions →</Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "💰", label: "Update Pricing", href: "/provider/pricing" },
                { icon: "📷", label: "Add Photos", href: "/provider/photos" },
                { icon: "🔗", label: "Share Profile", href: "/provider/profile" },
                { icon: "❓", label: "Help & Support", href: "/provider/support" },
              ].map((a) => (
                <Link key={a.label} href={a.href}
                  className="flex flex-col items-center gap-1.5 p-3 border border-gray-100 rounded-xl hover:bg-yellow-50 hover:border-yellow-200 transition-all group text-center">
                  <span className="text-lg">{a.icon}</span>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 leading-tight">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}