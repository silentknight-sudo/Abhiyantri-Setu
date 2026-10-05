import Link from "next/link";
import { requireClient } from "@/lib/session";
import { getClientPayments } from "@/lib/queries";
import { formatDate, formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const user = await requireClient();
  const hires = await getClientPayments(user.id);
  const paid = hires.filter((h) => h.completedAt);
  const due = hires.filter((h) => !h.completedAt);
  const total = (list: typeof hires) => list.reduce((s, h) => s + h.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500">Amounts agreed with professionals you hired</p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="tilt-3d rounded-2xl border-l-4 border-emerald-400 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-400">Completed jobs</p>
            <p className="text-2xl font-bold text-gray-900">{formatINR(total(paid))}</p>
          </div>
          <div className="tilt-3d rounded-2xl border-l-4 border-amber-400 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-400">In progress</p>
            <p className="text-2xl font-bold text-gray-900">{formatINR(total(due))}</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {hires.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400">
              No payments yet. Accept a quotation from <Link href="/client/project" className="font-semibold text-gray-700 underline">My Projects</Link> to hire a professional.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-3">Job</th>
                  <th className="px-5 py-3">Professional</th>
                  <th className="hidden px-5 py-3 sm:table-cell">Date</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hires.map((h) => (
                  <tr key={h.id}>
                    <td className="px-5 py-3 font-medium text-gray-900">{h.job.title}</td>
                    <td className="px-5 py-3 text-gray-600">{h.provider.name}</td>
                    <td className="hidden px-5 py-3 text-gray-500 sm:table-cell">{formatDate(h.completedAt ?? h.updatedAt)}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="font-semibold text-gray-900">{formatINR(h.amount)}</span>
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${h.completedAt ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {h.completedAt ? "Completed" : "In progress"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
