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

// Logs status, error type and message only; never the key or the request.
function logApiError(err: unknown): void {
  if (err instanceof Anthropic.APIError) {
    const type: string | undefined = (
      err.error as { error?: { type?: string } } | undefined
    )?.error?.type;
    console.error(
      `chat: Anthropic API error status=${err.status} type=${type ?? "unknown"} model=${MODEL} message=${err.message}`
    );
  } else {
    console.error("chat: unexpected error", err instanceof Error ? err.message : err);
  }
}

function apiErrorResponse(err: unknown): Response {
  logApiError(err);
  let status: number = 502;
  let message: string = "Sorry, the chat is unavailable right now.";
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
    message = "The chat's API key was rejected. Check ANTHROPIC_API_KEY.";
  } else if (err instanceof Anthropic.RateLimitError) {
    status = 429;
    message = "The chat is busy. Please try again in a moment.";
  } else if (err instanceof Anthropic.NotFoundError) {
    message = `The chat model "${MODEL}" was not found for this API key.`;
  } else if (err instanceof Anthropic.BadRequestError) {
    message = "The chat request was rejected. Check the Anthropic account's billing and settings.";
  }
  return Response.json({ error: message }, { status });
}

// Env values pasted into dashboards often carry quotes or stray whitespace.
function readApiKey(): string | undefined {
  const raw: string | undefined = process.env.ANTHROPIC_API_KEY;
  if (!raw) return undefined;
  const key: string = raw.trim().replace(/^["'\u201C\u2018]+|["'\u201D\u2019]+$/g, "").trim();
  return key.length > 0 ? key : undefined;
}

export async function POST(req: Request): Promise<Response> {
  const apiKey: string | undefined = readApiKey();
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured." }, { status: 503 });
  }
  if (!/^[\x21-\x7E]+$/.test(apiKey)) {
    console.error("chat: ANTHROPIC_API_KEY contains characters that are not valid in an HTTP header");
    return Response.json(
      { error: "ANTHROPIC_API_KEY contains invalid characters. Re-paste the key without quotes or extra text." },
      { status: 503 }
    );
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
  const stream: ReturnType<Anthropic["messages"]["stream"]> =
    client.messages.stream({
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

  // Wait for the response headers so API failures (bad key, no credit,
  // unknown model, rate limit) return a real HTTP error instead of a 200.
  try {
    await new Promise<void>((resolve: () => void, reject: (e: unknown) => void): void => {
      stream.once("connect", resolve);
      stream.once("error", reject);
    });
  } catch (err: unknown) {
    return apiErrorResponse(err);
  }

  const encoder: TextEncoder = new TextEncoder();
  const body: ReadableStream<Uint8Array> = new ReadableStream<Uint8Array>({
    async start(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
      try {
        stream.on("text", (delta: string): void => controller.enqueue(encoder.encode(delta)));
        await stream.finalMessage();
      } catch (err: unknown) {
        logApiError(err);
        controller.enqueue(encoder.encode("\n\nSorry, the answer was cut off."));
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
