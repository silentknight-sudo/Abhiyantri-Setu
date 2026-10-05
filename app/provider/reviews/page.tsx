import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import ProviderHeader from "@/components/shared/ProviderHeader";
import Reveal from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const user = await requireProvider();
  const [reviews, profile] = await Promise.all([
    prisma.review.findMany({
      where: { providerId: user.id },
      include: { client: { select: { name: true } }, job: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.providerProfile.findUnique({ where: { userId: user.id }, select: { rating: true, totalReviews: true } }),
  ]);
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => r.rating === n).length }));

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Reviews" subtitle="Customers kya keh rahe hain" />
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="tilt-3d rounded-2xl bg-[#111827] p-6 text-center text-white shadow-lg">
          <p className="text-5xl font-bold">{profile?.rating ? profile.rating.toFixed(1) : "–"}</p>
          <p className="mt-1 text-yellow-400">{"★".repeat(Math.round(profile?.rating ?? 0))}</p>
          <p className="mt-1 text-xs text-gray-400">{profile?.totalReviews ?? 0} reviews</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:col-span-2">
          {dist.map((d) => (
            <div key={d.n} className="mb-2 flex items-center gap-3 text-xs">
              <span className="w-6 text-gray-500">{d.n}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-yellow-400" style={{ width: reviews.length ? `${(d.c / reviews.length) * 100}%` : 0 }} />
              </div>
              <span className="w-6 text-right text-gray-500">{d.c}</span>
            </div>
          ))}
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-400 shadow-sm">
          No reviews yet. Clients can review you after a job is completed.
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <Reveal key={r.id}>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{r.client.name}</span>
                  <span className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                </div>
                {r.job && <p className="text-xs text-gray-400">{r.job.title}</p>}
                {r.comment && <p className="mt-2 text-sm text-gray-600">{r.comment}</p>}
                <p className="mt-2 text-xs text-gray-400">{formatDate(r.createdAt)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
