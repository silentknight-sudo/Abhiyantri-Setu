import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are Setu AI, the assistant for Abhiyantri Setu — an Indian platform (based in Greater Noida) that connects clients with verified construction professionals: contractors, architects, civil engineers, interior designers, electricians, plumbers, painters and masons.

Help users with: estimating construction/renovation costs in Indian Rupees (give ranges and say they are rough), choosing materials, planning project steps, understanding which professional they need, and using the platform (post a job at /jobs/post, browse professionals at /providers, contact support at /contact).
Keep answers practical, concise and friendly. Use short bullet lists where helpful. Never invent specific named providers or guarantee prices. For structural safety questions, recommend consulting a licensed civil engineer.`;

type ChatTurn = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Setu AI is not configured yet. Add ANTHROPIC_API_KEY in your Vercel environment variables." },
      { status: 503 }
    );
  }

  let history: ChatTurn[];
  try {
    const body = await req.json();
    history = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: ChatTurn) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-20)
      .map((m: ChatTurn) => ({ role: m.role, content: m.content.slice(0, 4000) }));
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!history.length || history[0].role !== "user") {
    return NextResponse.json({ error: "Please type a question." }, { status: 400 });
  }

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: history as Anthropic.Beta.BetaMessageParam[],
    } as Anthropic.Beta.MessageCreateParamsNonStreaming);

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ reply: "Sorry, I can't help with that. Try asking about your construction project." });
    }
    const reply = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || "Sorry, I couldn't come up with an answer. Please rephrase." });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Setu AI is busy right now. Please try again in a minute." }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[AI AUTH ERROR]", error.message);
      return NextResponse.json({ error: "Setu AI is misconfigured (invalid API key)." }, { status: 500 });
    }
    console.error("[AI ERROR]", error);
    return NextResponse.json({ error: "Setu AI ran into a problem. Please try again." }, { status: 500 });
  }
}
