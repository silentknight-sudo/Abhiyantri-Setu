"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { placeBid } from "@/lib/actions/bid-action";

export default function BidForm({ jobId, suggested }: { jobId: string; suggested?: number | null }) {
  const router = useRouter();
  const [amount, setAmount] = useState(suggested ? String(suggested) : "");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<{ busy?: boolean; error?: string; done?: boolean }>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ busy: true });
    const res = await placeBid(jobId, Number(amount), message);
    if (res.error) return setState({ error: res.error });
    setState({ done: true });
    router.refresh();
  };

  if (state.done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
        ✅ Quotation sent! The client has been notified. Track it under <a href="/provider/quotations" className="font-semibold underline">Quotations</a>.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-gray-900">Send your quotation</h3>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Your price (₹)</span>
        <input
          type="number"
          min={1}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Message to client</span>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Timeline, what's included, your experience..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
        />
      </label>
      {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>}
      <button
        disabled={state.busy}
        className="w-full rounded-xl bg-yellow-400 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-500 disabled:opacity-60"
      >
        {state.busy ? "Sending..." : "Send Quotation"}
      </button>
    </form>
  );
}
