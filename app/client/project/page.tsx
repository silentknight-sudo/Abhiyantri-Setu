import Link from "next/link";
import { requireClient } from "@/lib/session";
import { getClientProjects } from "@/lib/queries";
import { formatINR, timeAgo } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import MessageButton from "@/components/shared/MessageButton";
import { BidButtons, CompleteButton, JobStatusButtons, ReviewForm } from "./ProjectActions";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-blue-100 text-blue-700",
  PAUSED: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export default async function ProjectPage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const user = await requireClient();
  const { job: focus } = await searchParams;
  const projects = await getClientProjects(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-sm text-gray-500">Track jobs, compare quotations and hire professionals</p>
          </div>
          <Link href="/jobs/post" className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-500">
            + Post New Job
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">
            <p className="text-lg font-bold text-gray-900">No projects yet</p>
            <p className="mt-2 text-sm text-gray-400">Post your first job and start receiving quotations from verified professionals.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((job) => {
              const accepted = job.bids.find((b) => b.status === "ACCEPTED");
              const reviewed = job.reviews.length > 0;
              return (
                <Reveal key={job.id}>
                  <div
                    id={job.id}
                    data-no-tilt
                    className={`rounded-2xl border bg-white p-6 shadow-sm ${focus === job.id ? "border-yellow-400 ring-2 ring-yellow-200" : "border-gray-200"}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[job.status]}`}>{job.status}</span>
                          <span className="text-xs text-gray-400">{job.category} · {timeAgo(job.createdAt)}</span>
                        </div>
                        <Link href={`/jobs/${job.id}`} className="mt-2 block text-lg font-bold text-gray-900 hover:underline">
                          {job.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          Budget {job.budget ? formatINR(job.budget) : "open"} · 📍 {job.location}
                        </p>
                      </div>
                      <JobStatusButtons jobId={job.id} status={job.status} />
                    </div>

                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className="mb-3 text-sm font-semibold text-gray-700">
                        Quotations ({job.bids.length})
                      </p>
                      {job.bids.length === 0 ? (
                        <p className="text-sm text-gray-400">No quotations yet. Professionals in this category have been notified.</p>
                      ) : (
                        <div className="space-y-3">
                          {job.bids.map((bid) => (
                            <div key={bid.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <Link href={`/providers/${bid.provider.id}`} className="font-semibold text-gray-900 hover:underline">
                                  {bid.provider.name}
                                </Link>
                                <p className="text-xs text-gray-500">
                                  {bid.provider.providerProfile?.specialty} · ⭐ {bid.provider.providerProfile?.rating?.toFixed(1) ?? "New"} ({bid.provider.providerProfile?.totalReviews ?? 0})
                                </p>
                                {bid.message && <p className="mt-1 text-sm text-gray-600">{bid.message}</p>}
                                {bid.status === "ACCEPTED" && (
                                  <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${bid.progress}%` }} />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
                                <span className="text-lg font-bold text-gray-900">{formatINR(bid.amount)}</span>
                                {bid.status === "PENDING" && job.status !== "CANCELLED" && <BidButtons bidId={bid.id} />}
                                {bid.status === "REJECTED" && <span className="text-xs text-gray-400">Declined</span>}
                                {bid.status === "ACCEPTED" && (
                                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    Hired · {bid.progress}%
                                  </span>
                                )}
                                <MessageButton
                                  userId={bid.provider.id}
                                  jobId={job.id}
                                  viewerRole="client"
                                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                  Chat
                                </MessageButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {accepted && !accepted.completedAt && (
                        <div className="mt-4">
                          <CompleteButton bidId={accepted.id} />
                        </div>
                      )}
                      {accepted?.completedAt && !reviewed && <ReviewForm bidId={accepted.id} />}
                      {reviewed && <p className="mt-3 text-xs text-emerald-600">✓ You reviewed this job. Thank you!</p>}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
