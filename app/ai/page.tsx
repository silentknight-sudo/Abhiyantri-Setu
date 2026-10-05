"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cube3D from "@/components/motion/Cube3D";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How much does it cost to build a 2BHK house in Greater Noida?",
  "Which professional do I need to fix wall cracks?",
  "Best tiles for a bathroom renovation?",
  "Steps to plan a kitchen remodel",
];

export default function AiPage() {
  const [messages, setMessages] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Turn[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Something went wrong.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A2332] via-[#1A2332] to-gray-50">
      <section data-no-reveal className="relative overflow-hidden px-4 pt-14 pb-10 text-center">
        <Cube3D size={56} className="float-3d absolute left-[12%] top-10 hidden md:block" />
        <Cube3D size={36} className="float-3d absolute right-[14%] top-24 hidden md:block [animation-delay:-2s]" />
        <motion.div
          initial={{ opacity: 0, rotateX: -40, y: 30 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
        >
          <span className="inline-block rounded-full bg-yellow-400/15 px-4 py-1 text-xs font-semibold text-yellow-300">✨ Setu AI</span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Your construction assistant</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-300 sm:text-base">
            Ask about costs, materials, planning or which professional you need.
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
          className="flex h-[65vh] min-h-[420px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
          data-no-tilt
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ y: -4, rotateX: 8, rotateY: -6 }}
                    style={{ transformPerspective: 700 }}
                    onClick={() => ask(s)}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-700 hover:border-yellow-400 hover:bg-yellow-50"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user" ? "rounded-br-sm bg-[#1A2332] text-white" : "rounded-bl-sm bg-gray-100 text-gray-800"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex gap-1.5 px-2">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-2 w-2 rounded-full bg-yellow-400"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                  />
                ))}
              </div>
            )}
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2 border-t border-gray-100 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Setu AI anything about your project..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-yellow-400 px-5 text-sm font-bold text-gray-900 transition hover:bg-yellow-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </motion.div>
        <p className="mt-3 text-center text-xs text-gray-400">AI answers are estimates. Always confirm with a professional.</p>
      </div>
    </div>
  );
}
