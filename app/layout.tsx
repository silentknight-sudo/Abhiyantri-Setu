import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhiyantri Setu",
  description: "Connecting construction professionals with clients",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  // session api
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        
        {/*  NAVBAR  */}
        <Navbar
          userName={session?.user?.name}
          userEmail={session?.user?.email}
          userImage={session?.user?.image}
        />

        {/* MAIN CONTENT (prevent navbar overlap) */}
        <main className="pt-16 flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}