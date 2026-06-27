import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abhiyantri Setu",
  description: "Connecting construction professionals with clients",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        {/* NavbarWrapper hides navbar on /provider/* routes */}
        <NavbarWrapper
          userName={session?.user?.name}
          userEmail={session?.user?.email}
          userImage={session?.user?.image}
          userRole={session?.user.role}
        />
        {/* Provider routes manage their own layout (no pt-16) */}
        {children}
      </body>
    </html>
  );
}