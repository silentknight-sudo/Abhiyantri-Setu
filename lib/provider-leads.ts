import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProviderLeads(
  userId: string
) {
  const profile =
    await prisma.providerProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!profile) {
    return [];
  }

  const existingBids =
    await prisma.bid.findMany({
      where: {
        providerId: userId,
      },
      select: {
        jobId: true,
      },
    });
console.log("PROFILE SPECIALTY:", profile.specialty);
console.log("EXISTING BIDS:", existingBids);
  const jobs = await prisma.job.findMany({
    where: {
      category: profile.specialty,
      status: "ACTIVE",

      id: {
        notIn: existingBids.map(
          (b) => b.jobId
        ),
      },
    },

    include: {
      client: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
console.log("JOBS FOUND:", jobs.length);
console.log("JOBS:", jobs);

  return jobs;
}