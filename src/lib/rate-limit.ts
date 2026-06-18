/**
 * In-memory sliding-window rate limiter.
 *
 * Suitable for single-process dev/staging. For multi-instance production,
 * swap the Map for a Redis store (e.g. @upstash/ratelimit).
 *
 * Algorithm: sliding window counter.
 *   - Keep a list of timestamps of requests per key.
 *   - On each call, drop timestamps older than `windowMs`.
 *   - If the remaining count >= limit → reject.
 */

interface WindowEntry {
  timestamps: number[];
}

// Module-level store — persists across requests in the same process.
const store = new Map<string, WindowEntry>();

// Prevent unbounded memory growth: prune keys that haven't been seen in 2× the window.
function pruneStaleKeys(windowMs: number): void {
  const cutoff = Date.now() - windowMs * 2;
  for (const [key, entry] of store.entries()) {
    const last = entry.timestamps.at(-1) ?? 0;
    if (last < cutoff) store.delete(key);
  }
}

let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 60_000; // Run cleanup at most once per minute

export interface RateLimitOptions {
  /** Max requests allowed within the window. Default: 60. */
  limit?: number;
  /** Window size in milliseconds. Default: 60 000 (1 minute). */
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** Epoch ms when the oldest timestamp expires (use for Retry-After). */
  resetAt: number;
}

/**
 * Check and record a request for `key` (typically the client IP).
 *
 * @example
 * const result = rateLimit(ip, { limit: 30, windowMs: 60_000 });
 * if (!result.success) return new Response('Too Many Requests', { status: 429 });
 */
export function rateLimit(
  key: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { limit = 60, windowMs = 60_000 } = options;
  const now = Date.now();

  // Periodic cleanup
  if (now - lastPrune > PRUNE_INTERVAL_MS) {
    pruneStaleKeys(windowMs);
    lastPrune = now;
  }

  const entry = store.get(key) ?? { timestamps: [] };

  // Drop requests outside the current window
  const windowStart = now - windowMs;
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  const resetAt = (entry.timestamps[0] ?? now) + windowMs;
  const allowed = entry.timestamps.length < limit;

  if (allowed) {
    entry.timestamps.push(now);
    store.set(key, entry);
  }

  return {
    success: allowed,
    remaining: Math.max(0, limit - entry.timestamps.length),
    resetAt,
  };
}

/**
 * Extract the real client IP from a Next.js request.
 * Respects Vercel's x-real-ip and standard x-forwarded-for headers.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  );
}
