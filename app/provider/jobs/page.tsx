import Link from "next/link";
import { requireProvider } from "@/lib/session";
import { getProviderBids } from "@/lib/queries";
import { formatINR } from "@/lib/format";
import ProviderHeader from "@/components/shared/ProviderHeader";
import MessageButton from "@/components/shared/MessageButton";
import Reveal from "@/components/motion/Reveal";
import JobControls from "./JobControls";

export const dynamic = "force-dynamic";

export default async function ProviderJobsPage() {
  const user = await requireProvider();
  const jobs = await getProviderBids(user.id, "ACCEPTED");
  const active = jobs.filter((j) => !j.completedAt);
  const done = jobs.filter((j) => j.completedAt);

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="My Jobs" subtitle="Kaam jo aapko mila hai" />
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-400">No jobs yet</p>
          <p className="mt-1 text-xs text-gray-300">When a client accepts your quotation, the job appears here.</p>
          <Link href="/provider/leads" className="mt-4 inline-block rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900">
            Browse leads
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {[{ title: `Active (${active.length})`, list: active }, { title: `Completed (${done.length})`, list: done }].map(
            (group) =>
              group.list.length > 0 && (
                <div key={group.title}>
                  <h2 className="mb-3 text-sm font-bold text-gray-700">{group.title}</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {group.list.map((b) => (
                      <Reveal key={b.id}>
                        <div data-no-tilt className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link href={`/provider/leads/${b.job.id}`} className="font-bold text-gray-900 hover:underline">
                                {b.job.title}
                              </Link>
                              <p className="text-xs text-gray-400">
                                {b.client.name} · 📍 {b.job.location}
                              </p>
                            </div>
                            <span className="flex-shrink-0 font-bold text-yellow-600">{formatINR(b.amount)}</span>
                          </div>
                          <JobControls bidId={b.id} progress={b.progress} done={!!b.completedAt} />
                          <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                            {b.client.phone && (
                              <a href={`tel:${b.client.phone}`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                📞 Call
                              </a>
                            )}
                            <MessageButton userId={b.client.id} jobId={b.job.id} viewerRole="provider" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                              💬 Chat
                            </MessageButton>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
