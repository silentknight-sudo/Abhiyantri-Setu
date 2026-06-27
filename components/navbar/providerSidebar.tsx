"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-action";

//  Types 
interface Props {
  userName: string;
  userEmail: string;
  userImage: string | null;
  initialIsOnline?: boolean;
}

// Helpers 
function getInitials(name: string | null | undefined) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

//  Nav Item 
function NavItem({
  icon, label, sub, href, active, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
        active ? "bg-yellow-400 shadow-sm" : "hover:bg-white/10"
      }`}
    >
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${
          active ? "text-gray-900" : "text-gray-400 group-hover:text-gray-200"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-none mb-0.5 ${active ? "text-gray-900" : "text-gray-300 group-hover:text-white"}`}>
          {label}
        </p>
        <p className={`text-xs leading-none ${active ? "text-gray-700" : "text-gray-600"}`}>
          {sub}
        </p>
      </div>
    </Link>
  );
}

// Nav items config 
const NAV_ITEMS = [
  {
    href: "/provider/dashboard",
    label: "Dashboard",
    sub: "Mukhya Page",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: "/provider/leads",
    label: "Leads",
    sub: "Aaj ke Leads",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: "/provider/jobs",
    label: "Jobs",
    sub: "Mere Kaam",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    href: "/provider/quotations",
    label: "Quotations",
    sub: "Quotation",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    href: "/provider/earnings",
    label: "Earnings",
    sub: "Kamai",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    href: "/provider/profile",
    label: "Profile",
    sub: "Meri Profile",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    href: "/provider/reviews",
    label: "Reviews",
    sub: "Customer Reviews",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    href: "/provider/support",
    label: "Support",
    sub: "Madad",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

const BOTTOM_NAV_ITEMS = [
  { href: "/provider/dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { href: "/provider/leads",     label: "Leads",     icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
  { href: "/provider/jobs",      label: "Jobs",      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { href: "/provider/quotations", label: "Quotations", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { href: "/provider/earnings",  label: "Earnings",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
];

// Sidebar Inner Content
function SidebarInner({
  userName, userEmail, userImage, initials,
  isOnline, onToggleOnline, pathname, onSignOut, onNavClick,
}: {
  userName: string;
  userEmail: string;
  userImage: string | null;
  initials: string;
  isOnline: boolean;
  onToggleOnline: () => void;
  pathname: string;
  onSignOut: () => void;
  onNavClick?: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#111827]">

      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Abhiyantri</p>
            <p className="text-gray-500 text-xs mt-0.5">Partner Portal</p>
          </div>
        </div>
      </div>

      {/* Provider Info */}
      <div className="px-4 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold text-xs flex-shrink-0 overflow-hidden ring-2 ring-yellow-400/30">
            {userImage ? (
              <Image src={userImage} alt={userName} width={36} height={36} className="object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold  leading-none mb-0.5">{userName}</p>
            <p className="text-gray-500 text-xs truncate">{userEmail}</p>
          </div>
        </div>

        {/* Online toggle */}
        <div className="bg-slate-800  rounded-2xl px-3 py-3 flex items-center justify-between">
          <div>
            <p className={`text-sm font-semibold ${isOnline ? "text-green-400" : "text-slate-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {isOnline ? "Kaam le rahe hain" : "Unavailable"}
            </p>
          </div>
          <button
            onClick={onToggleOnline}
            className={`relative w-14 h-7 rounded-full transition-all cursor-pointer duration-300 ${isOnline ? "bg-green-500" : "bg-slate-600"}`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${isOnline ? "left-8" : "left-1"}`}
            />
          </button>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-white/10 flex-shrink-0">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-gray-500 hover:bg-white/10 hover:text-gray-300 transition-all"
        >
          <span className="w-8 h-8 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}

//  Main Export
export default function ProviderSidebar({ userName, userEmail, userImage, initialIsOnline = true }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(initialIsOnline);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const initials = getInitials(userName);

  // Close drawer on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [drawerOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* ── DESKTOP SIDEBAR — fixed, full height ── */}
      <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col h-screen sticky top-0">
        <SidebarInner
          userName={userName ?? ""}
          userEmail={userEmail ?? ""}
          userImage={userImage}
          initials={initials}
          isOnline={isOnline}
          onToggleOnline={() => setIsOnline((p) => !p)}
          pathname={pathname}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* ── MOBILE TOP HEADER ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-sm">Abhiyantri</span>
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
            3
          </span>
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div ref={drawerRef} className="absolute left-0 top-0 h-full w-[260px] shadow-2xl">
            <SidebarInner
              userName={userName ?? ""}
              userEmail={userEmail ?? ""}
              userImage={userImage}
              initials={initials}
              isOnline={isOnline}
              onToggleOnline={() => setIsOnline((p) => !p)}
              pathname={pathname}
              onSignOut={handleSignOut}
              onNavClick={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex items-center justify-around px-2 py-2">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl min-w-0 flex-1 transition-colors relative ${
                isActive ? "text-yellow-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className={isActive ? "text-yellow-600" : "text-gray-400"}>{item.icon}</span>
              <span className={`text-xs font-medium truncate ${isActive ? "text-yellow-600 font-bold" : "text-gray-400"}`}>
                {item.label}
              </span>
              {isActive && <span className="w-1 h-1 rounded-full bg-yellow-400 absolute bottom-1" />}
            </Link>
          );
        })}
      </nav>
    </>
  );
}