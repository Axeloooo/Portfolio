import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT: number = 15; // requests per IP per minute
// Caps total chat requests per day so a bot can't run up the Anthropic bill.
const DAILY_LIMIT: number = Number(process.env.CHAT_DAILY_LIMIT) || 500;
const QUESTIONS_KEY: string = "chat:questions";
const RETENTION_MS: number = 90 * 24 * 60 * 60 * 1000;

// Upstash added through the Vercel Marketplace sets one of these pairs.
function connect(): Redis | null {
  const url: string | undefined = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token: string | undefined = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const redis: Redis | null = connect();

const perIp: Ratelimit | null = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(RATE_LIMIT, "1 m"), prefix: "chat:ip" })
  : null;
const daily: Ratelimit | null = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(DAILY_LIMIT, "1 d"), prefix: "chat:day" })
  : null;

// Fallback without Upstash: per-instance memory only, resets on cold start.
const hits: Map<string, number[]> = new Map<string, number[]>();

function memoryLimited(ip: string): boolean {
  const now: number = Date.now();
  const recent: number[] = (hits.get(ip) ?? []).filter((t: number): boolean => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export type LimitResult = "ok" | "ip" | "daily";

export async function checkLimits(ip: string): Promise<LimitResult> {
  if (!perIp || !daily) return memoryLimited(ip) ? "ip" : "ok";
  try {
    // Check the IP first so blocked requests don't use up the daily budget.
    if (!(await perIp.limit(ip)).success) return "ip";
    return (await daily.limit("all")).success ? "ok" : "daily";
  } catch (err: unknown) {
    console.error("chat: rate limit check failed", err instanceof Error ? err.message : err);
    return memoryLimited(ip) ? "ip" : "ok";
  }
}

// Stores the question text and time only, never the IP, and drops entries
// older than 90 days on each write.
export async function logQuestion(question: string): Promise<void> {
  if (!redis) return;
  const now: number = Date.now();
  try {
    await redis
      .pipeline()
      .zadd(QUESTIONS_KEY, {
        score: now,
        member: JSON.stringify({ id: crypto.randomUUID(), at: new Date(now).toISOString(), question }),
      })
      .zremrangebyscore(QUESTIONS_KEY, 0, now - RETENTION_MS)
      .exec();
  } catch (err: unknown) {
    console.error("chat: could not log question", err instanceof Error ? err.message : err);
  }
}
