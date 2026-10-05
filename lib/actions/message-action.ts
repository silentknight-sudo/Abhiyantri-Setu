"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notify } from "@/lib/notify";

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: Date;
}

export interface ChatConversation {
  id: string;
  participantName: string;
  participantImage: string | null;
  participantRole: "client" | "provider";
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  messages: ChatMessage[];
}

// List all conversations of the signed-in user, newest first
export const getConversations = async (): Promise<{ userId: string | null; conversations: ChatConversation[] }> => {
  const user = await currentUser();
  if (!user) return { userId: null, conversations: [] };

  const rows = await prisma.conversation.findMany({
    where: { OR: [{ clientId: user.id }, { providerId: user.id }] },
    include: {
      client: { select: { id: true, name: true, image: true } },
      provider: { select: { id: true, name: true, image: true } },
      messages: { orderBy: { createdAt: "asc" }, take: 200 },
    },
    orderBy: { updatedAt: "desc" },
  });

  return {
    userId: user.id,
    conversations: rows.map((c) => {
      const isClient = c.clientId === user.id;
      const other = isClient ? c.provider : c.client;
      const last = c.messages[c.messages.length - 1];
      return {
        id: c.id,
        participantName: other.name,
        participantImage: other.image,
        participantRole: isClient ? "provider" : "client",
        lastMessage: last?.text ?? "Start the conversation",
        lastMessageAt: last?.createdAt ?? c.createdAt,
        unreadCount: c.messages.filter((m) => m.senderId !== user.id && !m.readAt).length,
        messages: c.messages.map((m) => ({ id: m.id, text: m.text, senderId: m.senderId, createdAt: m.createdAt })),
      };
    }),
  };
};

// Open (or create) a conversation with another user. Returns its id.
export const startConversation = async (otherUserId: string, jobId?: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  if (otherUserId === user.id) return { error: "You cannot message yourself." };

  const other = await prisma.user.findUnique({ where: { id: otherUserId } });
  if (!other) return { error: "User not found." };

  // The provider side is whichever participant is a provider
  const userIsProvider = user.role === "provider" && other.role !== "provider";
  const clientId = userIsProvider ? other.id : user.id;
  const providerId = userIsProvider ? user.id : other.id;

  const convo = await prisma.conversation.upsert({
    where: { clientId_providerId: { clientId, providerId } },
    update: jobId ? { jobId } : {},
    create: { clientId, providerId, jobId: jobId ?? null },
  });
  return { success: true, conversationId: convo.id };
};

export const sendMessage = async (conversationId: string, text: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const body = text.trim();
  if (!body) return { error: "Message is empty." };
  if (body.length > 4000) return { error: "Message is too long." };

  const convo = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!convo || (convo.clientId !== user.id && convo.providerId !== user.id)) return { error: "Conversation not found." };

  const [message] = await prisma.$transaction([
    prisma.message.create({ data: { conversationId, senderId: user.id, text: body } }),
    prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } }),
  ]);

  const recipient = convo.clientId === user.id ? convo.providerId : convo.clientId;
  const recipientUser = await prisma.user.findUnique({ where: { id: recipient }, select: { role: true } });
  await notify(
    recipient,
    `New message from ${user.name}`,
    body.slice(0, 120),
    recipientUser?.role === "provider" ? `/provider/messages?c=${conversationId}` : `/client/messages?c=${conversationId}`
  );

  return {
    success: true,
    message: { id: message.id, text: message.text, senderId: message.senderId, createdAt: message.createdAt } as ChatMessage,
  };
};

export const markConversationRead = async (conversationId: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  await prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: user.id },
      readAt: null,
      conversation: { OR: [{ clientId: user.id }, { providerId: user.id }] },
    },
    data: { readAt: new Date() },
  });
  return { success: true };
};
