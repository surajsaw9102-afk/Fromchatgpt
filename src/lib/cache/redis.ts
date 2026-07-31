import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

export const redis =
  globalForRedis.redis ??
  (process.env.REDIS_URL ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 2 }) : undefined);

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export async function cached<T>(key: string, ttlSeconds: number, loader: () => Promise<T>): Promise<T> {
  if (!redis) return loader();
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit) as T;
  const value = await loader();
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  return value;
}
