"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/lib/actions/bid-action";
import type { LeadStatus } from "@prisma/client";

const OPTIONS: LeadStatus[] = ["NEW", "CONTACTED", "INTERESTED", "CLOSED"];

export default function LeadStatusSelect({ bidId, value }: { bidId: string; value: LeadStatus }) {
  const [status, setStatus] = useState(value);
  return (
    <select
      value={status}
      onChange={async (e) => {
        const next = e.target.value as LeadStatus;
        const prev = status;
        setStatus(next);
        const r = await updateLeadStatus(bidId, next);
        if (r.error) setStatus(prev);
      }}
      className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700"
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o}>
          {o.charAt(0) + o.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
