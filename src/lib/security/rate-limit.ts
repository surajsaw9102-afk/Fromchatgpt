import { redis } from "@/lib/cache/redis";
import { AppError } from "@/lib/http/errors";

export async function assertRateLimit(key: string, limit: number, windowSeconds: number): Promise<void> {
  if (!redis) return;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSeconds);
  if (count > limit) throw new AppError("Too many requests", 429, "RATE_LIMITED");
}
