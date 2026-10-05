"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getNotifications, markNotificationsRead } from "@/lib/actions/notification-action";
import { timeAgo } from "@/lib/format";

type Item = { id: string; title: string; body: string | null; href: string | null; readAt: Date | null; createdAt: Date };

export default function NotificationBell({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      getNotifications().then((r) => {
        if (!alive) return;
        setItems(r.items);
        setUnread(r.unread);
      });
    load();
    const t = setInterval(() => document.visibilityState === "visible" && load(), 30000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) {
      setUnread(0);
      markNotificationsRead();
    }
  };

  return (
    <div ref={ref} className="relative" data-no-tilt>
      <button
        onClick={toggle}
        aria-label="Notifications"
        className={
          compact
            ? "relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            : "relative flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
        }
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {!compact && <span className="hidden sm:inline">Notifications</span>}
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -8, rotateX: -20 }}
            style={{ transformPerspective: 800, transformOrigin: "top right" }}
            className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          >
            <p className="border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-900">Notifications</p>
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-400">You&apos;re all caught up</p>
              ) : (
                items.map((n) => {
                  const body = (
                    <>
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      {n.body && <p className="line-clamp-2 text-xs text-gray-500">{n.body}</p>}
                      <p className="mt-1 text-[11px] text-gray-400">{timeAgo(n.createdAt)}</p>
                    </>
                  );
                  return n.href ? (
                    <Link key={n.id} href={n.href} onClick={() => setOpen(false)} className={`block border-b border-gray-50 px-4 py-3 hover:bg-gray-50 ${n.readAt ? "" : "bg-yellow-50/60"}`}>
                      {body}
                    </Link>
                  ) : (
                    <div key={n.id} className="border-b border-gray-50 px-4 py-3">{body}</div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
