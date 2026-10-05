import { prisma } from "@/lib/prisma";

export async function notify(userId: string, title: string, body?: string, href?: string) {
  try {
    await prisma.notification.create({ data: { userId, title, body, href } });
  } catch (error) {
    console.error("[NOTIFY ERROR]", error);
  }
}
