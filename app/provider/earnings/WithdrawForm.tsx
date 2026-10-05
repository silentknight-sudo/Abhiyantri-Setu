"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { requestWithdrawal } from "@/lib/actions/bid-action";

export default function WithdrawForm({ balance, hasBank }: { balance: number; hasBank: boolean }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});
  const [busy, setBusy] = useState(false);

  if (!hasBank) {
    return (
      <p className="text-sm text-gray-500">
        Add your bank details in <Link href="/provider/profile#bank" className="font-semibold text-yellow-600 underline">Profile</Link> to withdraw.
      </p>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setMsg({});
        const r = await requestWithdrawal(Number(amount));
        setBusy(false);
        if (r.error) setMsg({ err: r.error });
        else {
          setMsg({ ok: "Withdrawal requested. It will reach your bank in 2–3 working days." });
          setAmount("");
          router.refresh();
        }
      }}
      className="space-y-2"
    >
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={balance}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400"
        />
        <button disabled={busy || balance <= 0} className="rounded-xl bg-yellow-400 px-4 text-sm font-bold text-gray-900 hover:bg-yellow-500 disabled:opacity-50">
          Withdraw
        </button>
      </div>
      {msg.err && <p className="text-xs text-red-600">{msg.err}</p>}
      {msg.ok && <p className="text-xs text-emerald-600">{msg.ok}</p>}
    </form>
  );
}
