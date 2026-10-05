import { requireProvider } from "@/lib/session";
import { getProviderEarnings } from "@/lib/queries";
import { formatDate, formatINR } from "@/lib/format";
import ProviderHeader from "@/components/shared/ProviderHeader";
import WithdrawForm from "./WithdrawForm";

export const dynamic = "force-dynamic";

export default async function EarningsPage() {
  const user = await requireProvider();
  const { profile, entries, total, month, withdrawn } = await getProviderEarnings(user.id);
  const balance = profile?.walletBalance ?? 0;

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Earnings" subtitle="Aapki kamai" />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { l: "Wallet balance", v: balance, c: "from-yellow-400 to-amber-500 text-gray-900" },
          { l: "This month", v: month, c: "from-white to-white text-gray-900" },
          { l: "Total earned", v: total, c: "from-white to-white text-gray-900" },
          { l: "Withdrawn", v: withdrawn, c: "from-white to-white text-gray-900" },
        ].map((s) => (
          <div key={s.l} className={`tilt-3d rounded-2xl border border-gray-100 bg-gradient-to-br ${s.c} p-4 shadow-sm`}>
            <p className="text-2xl font-bold">{formatINR(s.v)}</p>
            <p className="text-xs opacity-70">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-gray-900">Withdraw to bank</h2>
          <WithdrawForm balance={balance} hasBank={!!profile?.hasBankDetails} />
        </div>
        <div id="transactions" className="rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-2" data-no-tilt>
          <h2 className="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">Transactions</h2>
          {entries.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">No transactions yet. Complete a job to earn.</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="flex items-center justify-between border-b border-gray-50 px-5 py-3 text-sm last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{e.description ?? (e.type === "credit" ? "Payment" : "Withdrawal")}</p>
                  <p className="text-xs text-gray-400">{formatDate(e.createdAt)}</p>
                </div>
                <span className={`font-bold ${e.type === "credit" ? "text-emerald-600" : "text-gray-700"}`}>
                  {e.type === "credit" ? "+" : "−"}
                  {formatINR(e.amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
