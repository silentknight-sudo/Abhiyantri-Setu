"use client";
import NotificationBell from "@/components/shared/NotificationBell";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { signOut } from "@/lib/actions/auth-action";

const DashboardMenuIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const SignOutIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ProfileIconSvg = () => (
  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

 interface NavbarProps {
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
  userRole?: string;
}

function ProfileDropdown({
  userName,
  userEmail,
  userImage,
  userRole
  // initials,
}: {
  userName: string;
  userEmail: string;
  userImage: string | null;
  userRole: string;
  // initials: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const baseRoute =
  userRole?.toLowerCase() === "provider"
    ? "/provider"
    : "/client";
    
  const ref = useRef<HTMLDivElement>(null);
  

   const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>
        {/* Avatar Button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-[#1A2332] text-white flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-yellow-400 transition-all overflow-hidden"
        >
          {userImage ? (
            <Image src={userImage} alt={userName} width={40} height={40} className="object-cover" />
          ) : (
            initials
          )}
        </button>
  
        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-900 text-sm">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              <span className="inline-block mt-1 text-xs font-medium text-yellow-600 bg-blue-50 px-2 py-0.5 rounded-full">
             {userRole?.toLowerCase() === "provider"
              ? "Provider"
              : "Client"}
            </span>
            </div>
  
            {/* Menu items */}
            <div className="py-1">
              <Link
                href={`${baseRoute}/dashboard`}
                onClick={() => setOpen(false)}
                className="flex  items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-400 transition-colors"
              >
                <DashboardMenuIcon />
                Dashboard
              </Link>
              <Link
                href={`${baseRoute}/profile`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-400 transition-colors"
              >
                <ProfileIconSvg />
                Profile
              </Link>
              <Link
                href={`${baseRoute}/messages`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-400 transition-colors"
              >
                <MessageIcon />
                Messages
              </Link>
            </div>
  
            {/* Sign out */}
            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-yellow-400 transition-colors w-full text-left"
              >
                <SignOutIcon />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
}


export default function Navbar({ userName, userEmail, userImage, userRole }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const baseRoute =
  userRole === "PROVIDER"
    ? "/provider"
    : "/client";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "AI Tools", href: "/ai" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 flex items-center justify-between h-20  mt-1.5 ">

          {/* Logo */}
          <Link href="/" className="flex items-center h-full gap-2 -ml-3  ">
            <Image src="/logo header.png" alt="" width={150} height={40}  />
            <span className="font-bold text-lg text-gray-800">
              {/* Abhiyantri Setu */}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-sm"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Social Icons */}
            <div className="flex items-center gap-5 ml-2">
              <a
                href="https://www.instagram.com/abhiyantrisetu/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black gap-5 hover:text-pink-500 hover:scale-110 transition"
              >
                <FaInstagram size={23} />
              </a>

              <a
                href="https://wa.me/919289553069"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black gap-5 hover:text-green-500 hover:scale-110 transition"
              >
                <FaWhatsapp size={23} />
              </a>
            </div>
          {/* AUTH LOGIC profiledropdown */}
            {userName ? (
              <>
              <NotificationBell compact />
              <ProfileDropdown
                userName={userName}
                userEmail={userEmail!}
                userImage={userImage ?? null}
                userRole={userRole ?? "CLIENT"}
              />
              </>
            ) : (
              <>
                <Link href="/provider-signup">
                  <button className="px-4 text-black py-2 border rounded-lg">
                    Join as Provider
                  </button>
                </Link>

                <Link href="/auth">
                  <button className="px-4 py-2 bg-black text-white rounded-lg">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden z-100 relative"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={28} className="text-black cursor-pointer" />
            ) : (
              <Menu size={28} className="text-black cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">

  {/* Header */}
  <div className="flex justify-between items-center text-black mb-6">
    <span className="font-semibold text-lg">Menu</span>
    <X onClick={() => setOpen(false)} className="cursor-pointer" />
  </div>

  {/*  USER SECTION (N) */}
  {userName && (
    <div className="mb-6 border-b pb-4">
      <p className="font-semibold text-gray-900 text-sm">{userName}</p>
      <p className="text-xs text-gray-500">{userEmail}</p>
      <span className="text-xs text-yellow-600 font-medium">
     {userRole === "PROVIDER"
    ? "Provider"
    : "Client"}
</span>
    </div>
  )}

  {/* NAV LINKS */}
  <div className="space-y-3">
    {navLinks.map((link) => {
      const isActive =
        pathname === link.href ||
        (link.href !== "/" && pathname.startsWith(link.href));

      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`block px-3 py-2 rounded-md transition ${
            isActive
              ? "bg-yellow-400 text-black"
              : "text-gray-700 hover:bg-yellow-600"
          }`}
        >
          {link.name}
        </Link>
      );
    })}
  </div>

  {/* ✅ DASHBOARD dropdown */}
  {userName && (
    <div className="mt-6 border-t pt-4 space-y-3">

      <Link href={`${baseRoute}/dashboard`} onClick={() => setOpen(false)}
        className="flex items-center gap-3 text-sm text-gray-700">
        <DashboardMenuIcon />
        Dashboard
      </Link>

      <Link href={`${baseRoute}/profile`} onClick={() => setOpen(false)}
        className="flex items-center gap-3 text-sm text-gray-700">
        <ProfileIconSvg />
        Profile
      </Link>

      <Link href={`${baseRoute}/messages`} onClick={() => setOpen(false)}
        className="flex items-center gap-3 text-sm text-gray-700">
        <MessageIcon />
        Messages
      </Link>

      <button
        onClick={async () => {
          await signOut();
          window.location.href = "/";
        }}
        className="flex items-center gap-3 text-sm text-red-600"
      >
        <SignOutIcon />
        Sign out
      </button>
    </div>
  )}

  {/* ✅ BUTTONS (ONLY WHEN LOGGED OUT) */}
  {!userName && (
    <div className="space-y-3 mt-6">
      <Link href="/provider-signup" onClick={() => setOpen(false)}>
        <button className="w-full cursor-pointer text-black border border-gray-300 py-2 rounded-lg">
          Join as Provider
        </button>
      </Link>

      <Link href="/auth" onClick={() => setOpen(false)}>
        <button className="w-full cursor-pointer bg-gray-900 text-white py-2 rounded-lg">
          Sign In
        </button>
      </Link>
    </div>
  )}
</div>
</div>
    </>
  );
}