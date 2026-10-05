"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeJob, scheduleVisit, updateProgress } from "@/lib/actions/bid-action";

export default function JobControls({ bidId, progress, done }: { bidId: string; progress: number; done: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState(progress);
  const [when, setWhen] = useState("");
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});
  const [busy, setBusy] = useState(false);

  const run = async (fn: () => Promise<{ error?: string }>, ok: string) => {
    setBusy(true);
    setMsg({});
    const r = await fn();
    setBusy(false);
    if (r.error) setMsg({ err: r.error });
    else {
      setMsg({ ok });
      router.refresh();
    }
  };

  if (done) return <p className="text-xs font-semibold text-emerald-600">✓ Completed — payment added to your earnings</p>;

  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span className="font-bold text-gray-900">{value}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onPointerUp={() => run(() => updateProgress(bidId, value), "Progress saved")}
          onKeyUp={() => run(() => updateProgress(bidId, value), "Progress saved")}
          className="w-full accent-yellow-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700"
        />
        <button
          disabled={busy || !when}
          onClick={() => run(() => scheduleVisit(bidId, new Date(when).toISOString()), "Visit scheduled")}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Schedule visit
        </button>
        <button
          disabled={busy}
          onClick={() => confirm("Mark this job as completed?") && run(() => completeJob(bidId), "Job completed")}
          className="rounded-lg bg-[#111827] px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Mark completed
        </button>
      </div>
      {msg.err && <p className="text-xs text-red-600">{msg.err}</p>}
      {msg.ok && <p className="text-xs text-emerald-600">{msg.ok}</p>}
    </div>
  );
}
