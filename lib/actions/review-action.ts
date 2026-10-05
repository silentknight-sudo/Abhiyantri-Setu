"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notify } from "@/lib/notify";

export const addReview = async (bidId: string, rating: number, comment?: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return { error: "Please sign in." };
  const stars = Math.round(rating);
  if (stars < 1 || stars > 5) return { error: "Rating must be 1 to 5 stars." };

  const bid = await prisma.bid.findUnique({ where: { id: bidId }, include: { job: true } });
  if (!bid || bid.clientId !== user.id || !bid.completedAt) return { error: "You can only review completed jobs." };

  const existing = await prisma.review.findFirst({ where: { clientId: user.id, jobId: bid.jobId } });
  if (existing) return { error: "You have already reviewed this job." };

  await prisma.review.create({
    data: { rating: stars, comment: comment?.trim() || null, providerId: bid.providerId, clientId: user.id, jobId: bid.jobId },
  });

  const agg = await prisma.review.aggregate({ where: { providerId: bid.providerId }, _avg: { rating: true }, _count: true });
  await prisma.providerProfile.updateMany({
    where: { userId: bid.providerId },
    data: { rating: Math.round((agg._avg.rating ?? 0) * 10) / 10, totalReviews: agg._count },
  });

  await notify(bid.providerId, `New ${stars}★ review`, comment?.slice(0, 120), "/provider/reviews");
  revalidatePath("/client/project");
  return { success: true };
};
