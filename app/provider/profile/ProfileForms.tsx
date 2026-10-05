"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveBankDetails, saveIdVerification, updateProviderProfile } from "@/lib/actions/provider-action";
import { SPECIALTIES } from "@/lib/format";

const input =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100";

function useSave() {
  const router = useRouter();
  const [state, setState] = useState<{ busy?: boolean; ok?: string; err?: string }>({});
  const save = async (fn: () => Promise<{ error?: string }>, ok = "Saved") => {
    setState({ busy: true });
    const r = await fn();
    if (r.error) setState({ err: r.error });
    else {
      setState({ ok });
      router.refresh();
    }
  };
  const Status = () => (
    <>
      {state.err && <p className="text-xs text-red-600">{state.err}</p>}
      {state.ok && <p className="text-xs text-emerald-600">✓ {state.ok}</p>}
    </>
  );
  return { state, save, Status };
}

function Card({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} data-no-tilt className="scroll-mt-20 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

export function BasicInfoForm(props: {
  name: string;
  phone: string;
  specialty: string;
  experience: number;
  bio: string;
  location: string;
}) {
  const [f, setF] = useState(props);
  const { state, save, Status } = useSave();
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: k === "experience" ? Number(e.target.value) : e.target.value });

  return (
    <Card title="Basic information">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save(() => updateProviderProfile(f), "Profile updated");
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <label className="text-xs font-medium text-gray-600">Full name<input className={input} value={f.name} onChange={set("name")} required /></label>
        <label className="text-xs font-medium text-gray-600">Phone<input className={input} value={f.phone} onChange={set("phone")} placeholder="+91" /></label>
        <label className="text-xs font-medium text-gray-600">
          Specialty
          <select className={input} value={f.specialty} onChange={set("specialty")}>
            {[...new Set([f.specialty, ...SPECIALTIES])].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium text-gray-600">Experience (years)<input type="number" min={0} className={input} value={f.experience} onChange={set("experience")} /></label>
        <label className="text-xs font-medium text-gray-600 sm:col-span-2">Location<input className={input} value={f.location} onChange={set("location")} /></label>
        <label className="text-xs font-medium text-gray-600 sm:col-span-2">
          About you
          <textarea rows={4} className={input} value={f.bio} onChange={set("bio")} placeholder="Your experience, types of projects, what makes you great..." />
        </label>
        <div className="flex items-center gap-3 sm:col-span-2">
          <button disabled={state.busy} className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-yellow-500 disabled:opacity-60">
            Save
          </button>
          <Status />
        </div>
      </form>
    </Card>
  );
}

export function IdForm({ idType, idNumber, verified }: { idType: string; idNumber: string; verified: boolean }) {
  const [type, setType] = useState(idType || "Aadhaar");
  const [num, setNum] = useState("");
  const { state, save, Status } = useSave();
  return (
    <Card id="id" title="ID verification">
      {verified && (
        <p className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          ✓ {idType} ending •••• {idNumber.slice(-4)} submitted
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save(() => saveIdVerification(type, num), "ID submitted");
          setNum("");
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <select className={`${input} sm:w-40`} value={type} onChange={(e) => setType(e.target.value)}>
          {["Aadhaar", "PAN", "Driving Licence", "Voter ID"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <input className={input} value={num} onChange={(e) => setNum(e.target.value)} placeholder="ID number" required />
        <button disabled={state.busy} className="rounded-xl bg-[#111827] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          Submit
        </button>
      </form>
      <div className="mt-2"><Status /></div>
    </Card>
  );
}

export function BankForm({ accountName, last4, ifsc, upiId, saved }: { accountName: string; last4: string; ifsc: string; upiId: string; saved: boolean }) {
  const [f, setF] = useState({ accountName, accountNumber: "", ifsc, upiId });
  const { state, save, Status } = useSave();
  return (
    <Card id="bank" title="Bank details (for withdrawals)">
      {saved && <p className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">✓ Account ending •••• {last4} saved</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save(() => saveBankDetails(f), "Bank details saved");
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <input className={input} placeholder="Account holder name" value={f.accountName} onChange={(e) => setF({ ...f, accountName: e.target.value })} required />
        <input className={input} placeholder="Account number" inputMode="numeric" value={f.accountNumber} onChange={(e) => setF({ ...f, accountNumber: e.target.value })} required />
        <input className={input} placeholder="IFSC code" value={f.ifsc} onChange={(e) => setF({ ...f, ifsc: e.target.value })} required />
        <input className={input} placeholder="UPI ID (optional)" value={f.upiId} onChange={(e) => setF({ ...f, upiId: e.target.value })} />
        <div className="flex items-center gap-3 sm:col-span-2">
          <button disabled={state.busy} className="rounded-xl bg-[#111827] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">Save bank details</button>
          <Status />
        </div>
      </form>
    </Card>
  );
}

export function ShareProfile({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const full = `${window.location.origin}${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Abhiyantri Setu profile", url: full });
        return;
      } catch {
        /* fall back to copy */
      }
    }
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-wrap gap-2">
      <a href={url} target="_blank" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
        View public profile
      </a>
      <button onClick={share} className="rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-gray-900 hover:bg-yellow-500">
        {copied ? "Link copied!" : "🔗 Share profile"}
      </button>
    </div>
  );
}
