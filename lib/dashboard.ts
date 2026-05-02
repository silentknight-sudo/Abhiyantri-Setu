
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  pendingBids: number;
  completedJobs: number;
}

export interface ActiveJob {
  id: string;
  title: string;
  category: string;
  status: string;
  bidsCount: number;
  createdAt: Date;
  budget: number | null;
}

export interface PendingBid {
  id: string;
  amount: number;
  status: string;
  providerName: string;
  providerImage: string | null;
  jobTitle: string;
  createdAt: Date;
}

// ── Get dashboard stats for a client 
export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalJobs, activeJobs, completedJobs, pendingBids] = await Promise.all([
    // Total jobs posted
    prisma.job.count({
      where: { clientId: userId },
    }),

    // Active jobs
    prisma.job.count({
      where: { clientId: userId, status: "ACTIVE" },
    }),

    // Completed jobs
    prisma.job.count({
      where: { clientId: userId, status: "COMPLETED" },
    }),

    // Pending bids across all their jobs
    prisma.bid.count({
      where: {
        job: { clientId: userId },
        status: "PENDING",
      },
    }),
  ]);

  return { totalJobs, activeJobs, pendingBids, completedJobs };
}

// ── Get active jobs for a client
export async function getActiveJobs(userId: string): Promise<ActiveJob[]> {
  const jobs = await prisma.job.findMany({
    where: { clientId: userId, status: "ACTIVE" },
    include: {
      _count: { select: { bids: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    category: job.category,
    status: job.status,
    bidsCount: job._count.bids,
    createdAt: job.createdAt,
    budget: job.budget,
  }));
}

// ── Get pending bids on client's jobs
export async function getPendingBids(userId: string): Promise<PendingBid[]> {
  const bids = await prisma.bid.findMany({
    where: {
      job: { clientId: userId },
      status: "PENDING",
    },
    include: {
      provider: { select: { name: true, image: true } },
      job: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return bids.map((bid) => ({
    id: bid.id,
    amount: bid.amount,
    status: bid.status,
    providerName: bid.provider.name,
    providerImage: bid.provider.image,
    jobTitle: bid.job.title,
    createdAt: bid.createdAt,
  }));
}

// ── Get completed jobs 
export async function getCompletedJobs(userId: string): Promise<ActiveJob[]> {
  const jobs = await prisma.job.findMany({
    where: { clientId: userId, status: "COMPLETED" },
    include: {
      _count: { select: { bids: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    category: job.category,
    status: job.status,
    bidsCount: job._count.bids,
    createdAt: job.createdAt,
    budget: job.budget,
  }));
}