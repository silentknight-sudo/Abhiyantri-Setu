"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeJob, respondToBid, setJobStatus } from "@/lib/actions/bid-action";
import { addReview } from "@/lib/actions/review-action";

function useAction() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = async (fn: () => Promise<{ error?: string }>) => {
    setBusy(true);
    setError("");
    const res = await fn();
    setBusy(false);
    if (res?.error) setError(res.error);
    else router.refresh();
  };
  return { busy, error, run };
}

export function BidButtons({ bidId }: { bidId: string }) {
  const { busy, error, run } = useAction();
  return (
    <div>
      <div className="flex gap-2">
        <button
          disabled={busy}
          onClick={() => run(() => respondToBid(bidId, true))}
          className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-50"
        >
          Accept
        </button>
        <button
          disabled={busy}
          onClick={() => run(() => respondToBid(bidId, false))}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Decline
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function JobStatusButtons({ jobId, status }: { jobId: string; status: string }) {
  const { busy, error, run } = useAction();
  if (status === "COMPLETED" || status === "CANCELLED") return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "ACTIVE" && (
        <button disabled={busy} onClick={() => run(() => setJobStatus(jobId, "PAUSED"))} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          Pause
        </button>
      )}
      {status === "PAUSED" && (
        <button disabled={busy} onClick={() => run(() => setJobStatus(jobId, "ACTIVE"))} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          Reopen for quotes
        </button>
      )}
      <button
        disabled={busy}
        onClick={() => confirm("Cancel this job?") && run(() => setJobStatus(jobId, "CANCELLED"))}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Cancel job
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function CompleteButton({ bidId }: { bidId: string }) {
  const { busy, error, run } = useAction();
  return (
    <div>
      <button
        disabled={busy}
        onClick={() => confirm("Mark this job as completed?") && run(() => completeJob(bidId))}
        className="rounded-lg bg-[#1A2332] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#2C3E55] disabled:opacity-50"
      >
        Mark completed
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ReviewForm({ bidId }: { bidId: string }) {
  const { busy, error, run } = useAction();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(() => addReview(bidId, rating, comment));
      }}
      className="mt-3 space-y-2 rounded-xl bg-yellow-50 p-3"
    >
      <p className="text-xs font-semibold text-gray-700">Rate this professional</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            className={`text-2xl transition-transform hover:scale-125 ${n <= rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        placeholder="How was the work?"
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button disabled={busy} className="rounded-lg bg-yellow-400 px-4 py-1.5 text-xs font-bold text-gray-900 hover:bg-yellow-500">
        {busy ? "Saving..." : "Submit review"}
      </button>
    </form>
  );
}
