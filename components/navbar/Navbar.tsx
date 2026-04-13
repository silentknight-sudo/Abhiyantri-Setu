"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "AI Tools", href: "/ai" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ];

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-md shadow">
              
            </div> */}
            <Image src="/logo.jpeg" alt="" width={55} height={25}></Image>

            <span className="font-bold text-lg text-gray-800">
              Abhiyantri Setu
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

    {/*  SOCIAL ICONS */}
     <div className="flex items-center gap-5 ml-2">
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

  {/* Buttons */}
  <Link href="/provider-signup">
    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-100 text-black transition shadow-sm hover:scale-105">
      Join as Provider
    </button>
  </Link>

  <Link href="/login">
    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-black transition shadow hover:scale-105">
      Sign In
     </button>
    </Link>
   </div>

          {/* Hamburger */}
          <button
            className="md:hidden z-100 relative"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={28} className="text-black" />
            ) : (
              <Menu size={28} className="text-black" />
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

    {/* Top */}
    <div className="flex justify-between items-center text-black mb-6">
      <span className="font-semibold text-lg">Menu</span>
      <X onClick={() => setOpen(false)} className="cursor-pointer" />
    </div>

    {/* Links */}
    <div className="space-y-4 flex-1">
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
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>

    {/* Social Icons */}
    <div className="flex justify-center gap-5 pt-4">
      <a
        href="https://www.instagram.com/abhiyantrisetu/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-pink-500 transition"
      >
        <FaInstagram size={22} />
      </a>

      <a
        href="https://wa.me/919289553069"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-green-500 transition"
      >
        <FaWhatsapp size={22} />
      </a>
    </div>

    {/* Buttons */}
    <div className="space-y-3 mt-4">
      <Link href="/provider-signup" onClick={() => setOpen(false)}>
        <button className="w-full border text-black border-gray-300 py-2 rounded-lg">
          Join as Provider
        </button>
      </Link>

      <Link href="/login" onClick={() => setOpen(false)}>
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg">
          Sign In
        </button>
      </Link>
    </div>

  </div>
</div>
    </>
  );
}