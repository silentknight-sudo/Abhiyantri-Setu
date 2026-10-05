"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notify } from "@/lib/notify";
import type { LeadStatus } from "@prisma/client";

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

// ── Provider: send a quotation on a job
export const placeBid = async (jobId: string, amount: number, message?: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  if (user.role !== "provider") return { error: "Only service providers can send quotations." };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter a valid amount." };

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== "ACTIVE") return { error: "This job is no longer accepting quotations." };
  if (job.clientId === user.id) return { error: "You cannot bid on your own job." };

  const existing = await prisma.bid.findFirst({ where: { jobId, providerId: user.id } });
  if (existing) return { error: "You have already sent a quotation for this job." };

  const bid = await prisma.bid.create({
    data: {
      jobId,
      providerId: user.id,
      clientId: job.clientId,
      amount,
      message: message?.trim() || null,
      leadStatus: "CONTACTED",
    },
  });

  await notify(job.clientId, `New quotation on "${job.title}"`, `${user.name} quoted ₹${amount.toLocaleString("en-IN")}`, `/client/project?job=${job.id}`);
  revalidatePath("/provider/leads");
  revalidatePath("/provider/quotations");
  revalidatePath("/provider/dashboard");
  return { success: true, bidId: bid.id };
};

// ── Client: accept or reject a quotation
export const respondToBid = async (bidId: string, accept: boolean) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };

  const bid = await prisma.bid.findUnique({ where: { id: bidId }, include: { job: true } });
  if (!bid || bid.job.clientId !== user.id) return { error: "Quotation not found." };
  if (bid.status !== "PENDING") return { error: "This quotation has already been answered." };

  if (accept) {
    await prisma.$transaction([
      prisma.bid.update({ where: { id: bidId }, data: { status: "ACCEPTED", leadStatus: "INTERESTED" } }),
      prisma.bid.updateMany({
        where: { jobId: bid.jobId, id: { not: bidId }, status: "PENDING" },
        data: { status: "REJECTED", leadStatus: "CLOSED" },
      }),
      prisma.job.update({ where: { id: bid.jobId }, data: { status: "PAUSED" } }),
    ]);
    await notify(bid.providerId, "Your quotation was accepted 🎉", bid.job.title, "/provider/jobs");
  } else {
    await prisma.bid.update({ where: { id: bidId }, data: { status: "REJECTED", leadStatus: "CLOSED" } });
    await notify(bid.providerId, "Quotation declined", bid.job.title, "/provider/quotations");
  }

  revalidatePath("/client/project");
  revalidatePath("/client/dashboard");
  return { success: true };
};

// ── Provider: update lead pipeline status
export const updateLeadStatus = async (bidId: string, status: LeadStatus) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const res = await prisma.bid.updateMany({ where: { id: bidId, providerId: user.id }, data: { leadStatus: status } });
  if (!res.count) return { error: "Lead not found." };
  revalidatePath("/provider/quotations");
  return { success: true };
};

// ── Provider: update progress on an active job
export const updateProgress = async (bidId: string, progress: number) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const value = Math.max(0, Math.min(100, Math.round(progress)));
  const res = await prisma.bid.updateMany({
    where: { id: bidId, providerId: user.id, status: "ACCEPTED" },
    data: { progress: value },
  });
  if (!res.count) return { error: "Job not found." };
  revalidatePath("/provider/jobs");
  revalidatePath("/provider/dashboard");
  return { success: true };
};

// ── Provider: schedule a visit for an active job
export const scheduleVisit = async (bidId: string, when: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const date = new Date(when);
  if (Number.isNaN(date.getTime())) return { error: "Pick a valid date and time." };

  const bid = await prisma.bid.findFirst({
    where: { id: bidId, providerId: user.id },
    include: { job: true, client: true },
  });
  if (!bid) return { error: "Job not found." };

  await prisma.$transaction([
    prisma.bid.update({ where: { id: bidId }, data: { scheduledAt: date } }),
    prisma.scheduledJob.create({
      data: { title: bid.job.title, clientName: bid.client.name, scheduledAt: date, providerId: user.id },
    }),
  ]);
  await notify(bid.clientId, "Site visit scheduled", `${user.name} will visit on ${date.toLocaleString("en-IN")}`, "/client/project");
  revalidatePath("/provider/calendar");
  revalidatePath("/provider/dashboard");
  return { success: true };
};

// ── Either side: mark job completed (credits provider earnings)
export const completeJob = async (bidId: string) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };

  const bid = await prisma.bid.findUnique({ where: { id: bidId }, include: { job: true } });
  if (!bid || (bid.providerId !== user.id && bid.clientId !== user.id)) return { error: "Job not found." };
  if (bid.status !== "ACCEPTED") return { error: "Only accepted jobs can be completed." };
  if (bid.completedAt) return { error: "This job is already completed." };

  await prisma.$transaction([
    prisma.bid.update({ where: { id: bidId }, data: { completedAt: new Date(), progress: 100, leadStatus: "CLOSED" } }),
    prisma.job.update({ where: { id: bid.jobId }, data: { status: "COMPLETED" } }),
    prisma.earning.create({
      data: { providerId: bid.providerId, amount: bid.amount, type: "credit", description: `Payment for "${bid.job.title}"` },
    }),
    prisma.providerProfile.updateMany({
      where: { userId: bid.providerId },
      data: { walletBalance: { increment: bid.amount } },
    }),
  ]);

  const other = user.id === bid.providerId ? bid.clientId : bid.providerId;
  await notify(other, "Job marked as completed", bid.job.title, user.id === bid.providerId ? "/client/project" : "/provider/earnings");
  revalidatePath("/provider/jobs");
  revalidatePath("/client/project");
  return { success: true };
};

// ── Provider: request a wallet withdrawal
export const requestWithdrawal = async (amount: number) => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const profile = await prisma.providerProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return { error: "Provider profile not found." };
  if (!profile.hasBankDetails) return { error: "Add your bank details before withdrawing." };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter a valid amount." };
  if (amount > profile.walletBalance) return { error: "Amount exceeds your wallet balance." };

  await prisma.$transaction([
    prisma.providerProfile.update({ where: { userId: user.id }, data: { walletBalance: { decrement: amount } } }),
    prisma.earning.create({ data: { providerId: user.id, amount, type: "debit", description: "Withdrawal to bank" } }),
  ]);
  revalidatePath("/provider/earnings");
  revalidatePath("/provider/transactions");
  revalidatePath("/provider/dashboard");
  return { success: true };
};

// ── Client: change job status (pause / resume / cancel)
export const setJobStatus = async (jobId: string, status: "ACTIVE" | "PAUSED" | "CANCELLED") => {
  const user = await currentUser();
  if (!user) return { error: "Please sign in." };
  const res = await prisma.job.updateMany({ where: { id: jobId, clientId: user.id }, data: { status } });
  if (!res.count) return { error: "Job not found." };
  revalidatePath("/client/project");
  revalidatePath("/client/dashboard");
  revalidatePath("/jobs");
  return { success: true };
};
