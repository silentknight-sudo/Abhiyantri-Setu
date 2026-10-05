"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

interface CreateJobInput {
  title: string;
  description: string;
  category: string;
  budget: number | null;
  location: string;
}

export const createJob = async (data: CreateJobInput) => {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "You must be logged in to post a job." };
    }

    // Validate
    if (!data.title.trim()) return { error: "Title is required." };
    if (!data.category) return { error: "Category is required." };
    if (data.description.trim().length < 20) return { error: "Description too short." };

    // Create job in DB
    const job = await prisma.job.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category,
        budget: data.budget,
        location: data.location || "Greater Noida",
        status: "ACTIVE",
        clientId: session.user.id,
      },
    });

    return { success: true, jobId: job.id };
  } catch (error) {
    console.error("[CREATE JOB ERROR]", error);
    return { error: "Failed to post job. Please try again." };
  }
};

// ── Get all jobs (for /jobs listing page) 
export const getJobs = async (filters?: {
  category?: string;
  city?: string;
  search?: string;
}) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
        ...(filters?.category ? { category: filters.category } : {}),
        ...(filters?.city ? { location: { contains: filters.city } } : {}),
        ...(filters?.search
          ? {
              OR: [
                { title: { contains: filters.search, mode: "insensitive" } },
                { description: { contains: filters.search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        client: { select: { name: true, image: true } },
        _count: { select: { bids: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return { jobs };
  } catch (error) {
    console.error("[GET JOBS ERROR]", error);
    return { error: "Failed to fetch jobs." };
  }
};

// ── Get jobs of logged-in client (for dashboard)
export const getMyJobs = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { jobs: [] };
    }

    const jobs = await prisma.job.findMany({
      where: {
        clientId: session.user.id, // IMPORTANT
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs };
  } catch (error) {
    console.error("[GET MY JOBS ERROR]", error);
    return { error: "Failed to fetch your jobs." };
  }
};