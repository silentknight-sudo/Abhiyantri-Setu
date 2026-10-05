import Link from "next/link";
import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import ProviderHeader from "@/components/shared/ProviderHeader";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const user = await requireProvider();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const visits = await prisma.scheduledJob.findMany({
    where: { providerId: user.id, scheduledAt: { gte: since } },
    orderBy: { scheduledAt: "asc" },
    take: 100,
  });

  const groups = new Map<string, typeof visits>();
  for (const v of visits) {
    const key = v.scheduledAt.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata" });
    groups.set(key, [...(groups.get(key) ?? []), v]);
  }

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Calendar" subtitle="Aane wale site visits" />
      {visits.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-400">No upcoming visits</p>
          <p className="mt-1 text-xs text-gray-300">Schedule a visit from any active job.</p>
          <Link href="/provider/jobs" className="mt-4 inline-block rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900">
            Go to Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {[...groups.entries()].map(([day, list]) => (
            <div key={day}>
              <h2 className="mb-2 text-sm font-bold text-gray-700">{day}</h2>
              <div className="space-y-2">
                {list.map((v) => (
                  <div key={v.id} className="tilt-3d flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="rounded-xl bg-yellow-100 px-3 py-2 text-center text-sm font-bold text-yellow-800">
                      {v.scheduledAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900">{v.title}</p>
                      <p className="text-xs text-gray-400">{v.clientName}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{v.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
