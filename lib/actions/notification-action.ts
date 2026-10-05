"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getNotifications = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { items: [], unread: 0 };
  const items = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return { items, unread: items.filter((n) => !n.readAt).length };
};

export const markNotificationsRead = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { error: "Please sign in." };
  await prisma.notification.updateMany({ where: { userId: session.user.id, readAt: null }, data: { readAt: new Date() } });
  return { success: true };
};
