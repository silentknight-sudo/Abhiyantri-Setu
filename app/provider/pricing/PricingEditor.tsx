"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveServices } from "@/lib/actions/provider-action";

type Row = { name: string; price: number | string; unit: string };

export default function PricingEditor({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(initial.length ? initial : [{ name: "", price: "", unit: "per job" }]);
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});
  const [busy, setBusy] = useState(false);
  const update = (i: number, k: keyof Row, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const cls = "rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400";

  return (
    <div data-no-tilt className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input className={`${cls} col-span-12 sm:col-span-6`} placeholder="Service (e.g. Wall painting)" value={r.name} onChange={(e) => update(i, "name", e.target.value)} />
            <input className={`${cls} col-span-5 sm:col-span-2`} type="number" min={1} placeholder="₹" value={r.price} onChange={(e) => update(i, "price", e.target.value)} />
            <select className={`${cls} col-span-5 sm:col-span-3`} value={r.unit} onChange={(e) => update(i, "unit", e.target.value)}>
              {["per job", "per sq ft", "per hour", "per day", "per visit", "per point"].map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <button onClick={() => setRows(rows.filter((_, j) => j !== i))} className="col-span-2 sm:col-span-1 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500" aria-label="Remove">
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => setRows([...rows, { name: "", price: "", unit: "per job" }])} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          + Add service
        </button>
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setMsg({});
            const r = await saveServices(rows.map((x) => ({ name: x.name, price: Number(x.price), unit: x.unit })));
            setBusy(false);
            if (r.error) setMsg({ err: r.error });
            else {
              setMsg({ ok: "Pricing saved" });
              router.refresh();
            }
          }}
          className="rounded-xl bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-900 hover:bg-yellow-500 disabled:opacity-60"
        >
          Save pricing
        </button>
        {msg.err && <span className="text-xs text-red-600">{msg.err}</span>}
        {msg.ok && <span className="text-xs text-emerald-600">✓ {msg.ok}</span>}
      </div>
    </div>
  );
}
