import { requireProvider } from "@/lib/session";
import { getLeaderboard } from "@/lib/queries";
import { initials } from "@/lib/format";
import ProviderHeader from "@/components/shared/ProviderHeader";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const user = await requireProvider();
  const rows = await getLeaderboard();
  const medal = ["🥇", "🥈", "🥉"];

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Leaderboard" subtitle="Top rated professionals" />
      <div className="mb-6 grid grid-cols-3 items-end gap-3" style={{ perspective: 900 }}>
        {[1, 0, 2].map((idx) => {
          const r = rows[idx];
          if (!r) return <div key={idx} />;
          const h = idx === 0 ? "h-40" : idx === 1 ? "h-32" : "h-28";
          return (
            <div key={r.id} className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 font-bold text-gray-900">{initials(r.user.name)}</div>
              <p className="truncate text-xs font-semibold text-gray-900">{r.user.name}</p>
              <div
                className={`tilt-3d mt-2 flex ${h} flex-col items-center justify-center rounded-t-2xl bg-gradient-to-b from-[#1f2937] to-[#111827] text-white shadow-xl`}
                style={{ transform: "rotateX(8deg)", transformOrigin: "bottom" }}
              >
                <span className="text-3xl">{medal[idx]}</span>
                <span className="text-sm font-bold">{r.rating?.toFixed(1) ?? "–"} ★</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" data-no-tilt>
        {rows.length === 0 && <p className="py-12 text-center text-sm text-gray-400">No providers yet.</p>}
        {rows.map((r, i) => (
          <div key={r.id} className={`flex items-center gap-3 border-b border-gray-50 px-4 py-3 last:border-0 ${r.userId === user.id ? "bg-yellow-50" : ""}`}>
            <span className="w-8 text-center text-sm font-bold text-gray-400">{medal[i] ?? i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {r.user.name} {r.userId === user.id && <span className="text-xs text-yellow-600">(You)</span>}
              </p>
              <p className="text-xs text-gray-400">{r.specialty} · {r.user._count.providerBids} jobs</p>
            </div>
            <span className="text-sm font-bold text-gray-900">{r.rating?.toFixed(1) ?? "–"} ★</span>
            <span className="w-16 text-right text-xs text-gray-400">{r.totalReviews} reviews</span>
          </div>
        ))}
      </div>
    </div>
  );
}
