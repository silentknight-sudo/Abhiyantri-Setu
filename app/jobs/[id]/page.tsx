import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobDetail } from "@/lib/queries";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatDate, formatINR, timeAgo } from "@/lib/format";
import BidForm from "@/components/shared/BidForm";
import MessageButton from "@/components/shared/MessageButton";
import Reveal from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [job, session] = await Promise.all([getJobDetail(id), getSession().catch(() => null)]);
  if (!job) notFound();
  const viewer = session?.user;
  const isOwner = viewer?.id === job.clientId;
  const isProvider = viewer?.role === "provider";
  const myBid = isProvider
    ? await prisma.bid.findFirst({ where: { jobId: job.id, providerId: viewer!.id } })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href={isProvider ? "/provider/leads" : "/jobs"} className="text-sm text-gray-500 hover:text-gray-900">
          ← Back
        </Link>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">{job.category}</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">{job.status}</span>
                <span className="text-xs text-gray-400">Posted {timeAgo(job.createdAt)}</span>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-600">{job.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-400">Budget</p>
                  <p className="font-semibold text-gray-900">{job.budget ? formatINR(job.budget) : "Open to quotes"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-semibold text-gray-900">{job.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Quotations</p>
                  <p className="font-semibold text-gray-900">{job._count.bids}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal type="right" className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-400">Posted by</p>
              <p className="font-bold text-gray-900">{job.client.name}</p>
              <p className="text-xs text-gray-400">Member since {formatDate(job.client.createdAt)}</p>
              {isProvider && (
                <div className="mt-3">
                  <MessageButton
                    userId={job.client.id}
                    jobId={job.id}
                    viewerRole="provider"
                    className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    💬 Chat with client
                  </MessageButton>
                </div>
              )}
            </div>

            {isOwner ? (
              <Link href="/client/project" className="block rounded-2xl bg-[#1A2332] p-5 text-center text-sm font-semibold text-white">
                Manage this job & view quotations →
              </Link>
            ) : isProvider ? (
              myBid ? (
                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-800">
                  You quoted <b>{formatINR(myBid.amount)}</b> — status: <b>{myBid.status}</b>.
                </div>
              ) : job.status === "ACTIVE" ? (
                <BidForm jobId={job.id} suggested={job.budget} />
              ) : (
                <div className="rounded-2xl bg-gray-100 p-5 text-sm text-gray-500">This job is no longer accepting quotations.</div>
              )
            ) : viewer ? (
              <div className="rounded-2xl bg-gray-100 p-5 text-sm text-gray-600">
                Only service providers can quote on jobs.{" "}
                <Link href="/jobs/post" className="font-semibold underline">Post your own job</Link>
              </div>
            ) : (
              <Link href={`/auth?callbackUrl=/jobs/${job.id}`} className="block rounded-2xl bg-yellow-400 p-5 text-center text-sm font-bold text-gray-900">
                Sign in as a provider to send a quotation
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
