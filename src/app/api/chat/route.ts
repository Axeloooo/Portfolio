import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/resume-context";

export const runtime = "nodejs";

const MODEL: string = process.env.ANTHROPIC_MODEL ?? "claude-opus-5-5";
const MAX_MESSAGES: number = 12;
const MAX_CHARS: number = 1000;
const RATE_LIMIT: number = 15; // requests per IP per minute

// Best-effort limiter: per-instance memory only, resets on cold start.
const hits: Map<string, number[]> = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now: number = Date.now();
  const recent: number[] = (hits.get(ip) ?? []).filter((t: number): boolean => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

type ChatMessage = { role?: unknown; content?: unknown };

function parseMessages(body: unknown): Anthropic.MessageParam[] | null {
  const raw: unknown = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return null;
  }
  const messages: Anthropic.MessageParam[] = [];
  for (const m of raw as ChatMessage[]) {
    if (
      (m?.role !== "user" && m?.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length === 0 ||
      m.content.length > MAX_CHARS
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content });
  }
  return messages[0].role === "user" && messages.at(-1)?.role === "user"
    ? messages
    : null;
}

export async function POST(req: Request): Promise<Response> {
  const apiKey: string | undefined = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured." }, { status: 503 });
  }

  const ip: string = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  const messages: Anthropic.MessageParam[] | null = parseMessages(
    await req.json().catch((): null => null)
  );
  if (!messages) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const client: Anthropic = new Anthropic({ apiKey });
  const stream: ReturnType<Anthropic["messages"]["stream"]> = client.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    output_config: { effort: "low" },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  const encoder: TextEncoder = new TextEncoder();
  const body: ReadableStream<Uint8Array> = new ReadableStream<Uint8Array>({
    async start(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
      try {
        stream.on("text", (delta: string): void => controller.enqueue(encoder.encode(delta)));
        await stream.finalMessage();
      } catch (err) {
        console.error("chat stream failed", err);
        controller.enqueue(encoder.encode("\n\nSorry, something went wrong."));
      } finally {
        controller.close();
      }
    },
    cancel(): void {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
