"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

interface Props {
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
  userRole?: string
}

export default function NavbarWrapper({ userName, userEmail, userImage, userRole }: Props) {
  const pathname = usePathname();

  // Hide global navbar on all /provider/* routes
  // Provider pages use their own sidebar navigation
  if (pathname.startsWith("/provider")) {
    return null;
  }

  // All other pages get the normal navbar with pt-16 spacer
  return (
    <>
      <Navbar userName={userName} userEmail={userEmail} userImage={userImage} userRole={userRole} />
      {/* Spacer to prevent content going under fixed navbar */}
      <div className="h-16" />
    </>
  );
}