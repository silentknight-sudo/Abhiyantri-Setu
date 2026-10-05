import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import MotionEffects from "@/components/motion/MotionEffects";
import ScrollProgress from "@/components/motion/ScrollProgress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abhiyantri Setu",
  description: "Connecting construction professionals with clients",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Never let a session lookup failure take the whole site down
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch((error) => {
      console.error("[LAYOUT SESSION ERROR]", error);
      return null;
    });

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        <ScrollProgress />
        <MotionEffects />
        {/* NavbarWrapper hides navbar on /provider/* routes */}
        <NavbarWrapper
          userName={session?.user?.name}
          userEmail={session?.user?.email}
          userImage={session?.user?.image}
          userRole={session?.user?.role}
        />
        {/* Provider routes manage their own layout (no pt-16) */}
        {children}
      </body>
    </html>
  );
}