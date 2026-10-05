"use server";

import { prisma } from "@/lib/prisma";

export const submitContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const message = data.message?.trim();

  if (!name || !email || !message) return { error: "Please fill in your name, email and message." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (message.length > 5000) return { error: "Message is too long." };

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: data.phone?.trim() || null,
        subject: data.subject?.trim() || null,
        message,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("[CONTACT ERROR]", error);
    return { error: "Could not send your message. Please try again." };
  }
};

// "Notify me" sign-ups on the coming-soon service pages
export const joinWaitlist = async (email: string, service: string) => {
  const clean = email?.trim().toLowerCase();
  if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { error: "Please enter a valid email address." };
  try {
    await prisma.contactMessage.create({
      data: { name: "Waitlist", email: clean, subject: `Waitlist: ${service}`, message: `Notify me when ${service} launches.` },
    });
    return { success: true };
  } catch (error) {
    console.error("[WAITLIST ERROR]", error);
    return { error: "Could not save your email. Please try again." };
  }
};
