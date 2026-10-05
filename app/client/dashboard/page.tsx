import ClientDashboardClient from "./clientDashboard";
import { requireClient } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getCompletedJobs, getDashboardStats, getPendingBids } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;
  const user = await requireClient();

  const [jobs, stats, pendingBids, completed] = await Promise.all([
    prisma.job.findMany({
      where: { clientId: user.id, status: { in: ["ACTIVE", "PAUSED"] } },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, title: true, category: true, budget: true, status: true },
    }),
    getDashboardStats(user.id),
    getPendingBids(user.id),
    getCompletedJobs(user.id),
  ]);

  return (
    <ClientDashboardClient
      userName={user.name ?? "User"}
      userEmail={user.email ?? ""}
      userImage={user.image ?? null}
      jobs={jobs}
      success={params?.success ?? null}
      stats={stats}
      pendingBids={pendingBids.map((b) => ({ id: b.id, amount: b.amount, providerName: b.providerName, jobTitle: b.jobTitle }))}
      completed={completed.map((j) => ({ id: j.id, title: j.title, category: j.category }))}
    />
  );
}
