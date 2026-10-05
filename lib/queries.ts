import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// ── Public provider directory
export async function listProviders(filters: { q?: string; specialty?: string; city?: string }) {
  const q = filters.q?.trim();
  const where: Prisma.ProviderProfileWhereInput = {
    ...(filters.specialty ? { specialty: filters.specialty } : {}),
    ...(filters.city ? { location: { contains: filters.city, mode: "insensitive" } } : {}),
    ...(q
      ? {
          OR: [
            { specialty: { contains: q, mode: "insensitive" } },
            { bio: { contains: q, mode: "insensitive" } },
            { location: { contains: q, mode: "insensitive" } },
            { user: { name: { contains: q, mode: "insensitive" } } },
            { user: { services: { some: { name: { contains: q, mode: "insensitive" } } } } },
          ],
        }
      : {}),
  };
  return prisma.providerProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          _count: { select: { providerBids: { where: { completedAt: { not: null } } } } },
        },
      },
    },
    orderBy: [{ isVerified: "desc" }, { rating: "desc" }, { totalReviews: "desc" }],
    take: 60,
  });
}

export async function getPublicProvider(userId: string) {
  return prisma.user.findFirst({
    where: { id: userId, role: "provider" },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      providerProfile: true,
      services: { orderBy: { price: "asc" } },
      workPhotos: { orderBy: { createdAt: "desc" } },
      reviewsReceived: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { client: { select: { name: true, image: true } } },
      },
      _count: { select: { providerBids: { where: { completedAt: { not: null } } } } },
    },
  });
}

export async function getJobDetail(jobId: string) {
  return prisma.job.findUnique({
    where: { id: jobId },
    include: {
      client: { select: { id: true, name: true, image: true, createdAt: true } },
      _count: { select: { bids: true } },
    },
  });
}

// ── Client
export async function getClientProjects(userId: string) {
  return prisma.job.findMany({
    where: { clientId: userId },
    include: {
      bids: {
        include: {
          provider: {
            select: {
              id: true,
              name: true,
              image: true,
              providerProfile: { select: { specialty: true, rating: true, totalReviews: true, isVerified: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      reviews: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientPayments(userId: string) {
  return prisma.bid.findMany({
    where: { clientId: userId, status: "ACCEPTED" },
    include: { job: { select: { title: true } }, provider: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

// ── Provider
export async function getProviderBids(userId: string, status?: "PENDING" | "ACCEPTED" | "REJECTED") {
  return prisma.bid.findMany({
    where: { providerId: userId, ...(status ? { status } : {}) },
    include: {
      job: { select: { id: true, title: true, location: true, category: true, budget: true } },
      client: { select: { id: true, name: true, phone: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getProviderEarnings(userId: string) {
  const [profile, entries] = await Promise.all([
    prisma.providerProfile.findUnique({ where: { userId } }),
    prisma.earning.findMany({ where: { providerId: userId }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  const credits = entries.filter((e) => e.type === "credit");
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  return {
    profile,
    entries,
    total: credits.reduce((s, e) => s + e.amount, 0),
    month: credits.filter((e) => e.createdAt >= monthStart).reduce((s, e) => s + e.amount, 0),
    withdrawn: entries.filter((e) => e.type === "debit").reduce((s, e) => s + e.amount, 0),
  };
}

export async function getLeaderboard() {
  return prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          _count: { select: { providerBids: { where: { completedAt: { not: null } } } } },
        },
      },
    },
    orderBy: [{ rating: "desc" }, { totalReviews: "desc" }],
    take: 50,
  });
}
