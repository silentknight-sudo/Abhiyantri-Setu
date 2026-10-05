import { prisma } from "@/lib/prisma";

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
          phone: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
}