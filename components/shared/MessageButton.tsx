"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { startConversation } from "@/lib/actions/message-action";

export default function MessageButton({
  userId,
  jobId,
  viewerRole,
  className,
  children = "Message",
}: {
  userId: string;
  jobId?: string;
  viewerRole?: string | null;
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const go = async () => {
    if (!viewerRole) {
      router.push(`/auth?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setBusy(true);
    setError("");
    const res = await startConversation(userId, jobId);
    setBusy(false);
    if ("error" in res && res.error) {
      setError(res.error);
      return;
    }
    const base = viewerRole === "provider" ? "/provider/messages" : "/client/messages";
    router.push(`${base}?c=${res.conversationId}`);
  };

  return (
    <>
      <button onClick={go} disabled={busy} className={className}>
        {busy ? "Opening..." : children}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </>
  );
}
