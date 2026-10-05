import Link from "next/link";
import { requireProvider } from "@/lib/session";
import { getProviderBids } from "@/lib/queries";
import { formatINR, timeAgo } from "@/lib/format";
import ProviderHeader from "@/components/shared/ProviderHeader";
import LeadStatusSelect from "./LeadStatusSelect";

export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-gray-100 text-gray-500",
};

export default async function QuotationsPage() {
  const user = await requireProvider();
  const bids = await getProviderBids(user.id);
  const counts = {
    pending: bids.filter((b) => b.status === "PENDING").length,
    accepted: bids.filter((b) => b.status === "ACCEPTED").length,
    rejected: bids.filter((b) => b.status === "REJECTED").length,
  };

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Quotations" subtitle="Aapke bheje gaye quotes" />
      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { l: "Waiting", v: counts.pending, c: "border-amber-400" },
          { l: "Won", v: counts.accepted, c: "border-emerald-400" },
          { l: "Lost", v: counts.rejected, c: "border-gray-300" },
        ].map((s) => (
          <div key={s.l} className={`tilt-3d rounded-2xl border-l-4 ${s.c} bg-white p-4 shadow-sm`}>
            <p className="text-2xl font-bold text-gray-900">{s.v}</p>
            <p className="text-xs text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>
      {bids.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-400">No quotations sent yet</p>
          <Link href="/provider/leads" className="mt-4 inline-block rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900">
            Find leads
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm" data-no-tilt>
          {bids.map((b) => (
            <div key={b.id} className="flex flex-col gap-2 border-b border-gray-100 p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/provider/leads/${b.job.id}`} className="font-semibold text-gray-900 hover:underline">
                  {b.job.title}
                </Link>
                <p className="text-xs text-gray-400">
                  {b.client.name} · {b.job.category} · {timeAgo(b.createdAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-gray-900">{formatINR(b.amount)}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS[b.status]}`}>{b.status}</span>
                <LeadStatusSelect bidId={b.id} value={b.leadStatus} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
