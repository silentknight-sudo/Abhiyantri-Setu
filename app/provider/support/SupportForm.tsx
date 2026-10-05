"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions/contact-action";

export default function SupportForm({ name, email }: { name: string; email: string }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<{ busy?: boolean; ok?: boolean; err?: string }>({});
  if (state.ok) return <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">✓ Ticket sent. Our team will reply to {email} within 24 hours.</p>;
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setState({ busy: true });
        const r = await submitContact({ name, email, subject: `[Provider support] ${subject}`, message });
        setState(r.error ? { err: r.error } : { ok: true });
      }}
      className="space-y-3"
    >
      <input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Subject" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-yellow-400" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="Describe your issue..." className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-yellow-400" />
      {state.err && <p className="text-xs text-red-600">{state.err}</p>}
      <button disabled={state.busy} className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-yellow-500 disabled:opacity-60">
        {state.busy ? "Sending..." : "Send ticket"}
      </button>
    </form>
  );
}
