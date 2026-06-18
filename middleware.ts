/**
 * Next.js Edge Middleware — runs before every matched request.
 *
 * Responsibilities:
 *   1. Rate-limit every /api/* endpoint (60 req/min per IP by default).
 *   2. Attach security headers to every response.
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── Rate limiting (Edge-compatible, no Node APIs) ───────────────────────────

interface RateLimitStore {
  timestamps: number[];
}

// Edge runtime uses a single isolate per deployment — module-level Map is safe.
const rateLimitStore = new Map<string, RateLimitStore>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX       = 60;     // requests per window per IP

function edgeRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now   = Date.now();
  const entry = rateLimitStore.get(ip) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((t) => t > now - RATE_LIMIT_WINDOW_MS);

  const resetAt = (entry.timestamps[0] ?? now) + RATE_LIMIT_WINDOW_MS;
  const allowed = entry.timestamps.length < RATE_LIMIT_MAX;

  if (allowed) entry.timestamps.push(now);
  rateLimitStore.set(ip, entry);

  return { allowed, remaining: Math.max(0, RATE_LIMIT_MAX - entry.timestamps.length), resetAt };
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  );
}

// ─── Security headers ─────────────────────────────────────────────────────────

function applySecurityHeaders(response: NextResponse): void {
  const h = response.headers;

  // Prevent clickjacking
  h.set('X-Frame-Options', 'DENY');

  // Prevent MIME-type sniffing
  h.set('X-Content-Type-Options', 'nosniff');

  // XSS filter (legacy browsers)
  h.set('X-XSS-Protection', '1; mode=block');

  // Limit referrer data sent to third parties
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable sensitive browser features not needed by the app
  h.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Content Security Policy
  // - script-src needs 'unsafe-inline' because Next.js injects inline bootstrap scripts
  // - style-src needs 'unsafe-inline' because we use inline style attributes
  // - frame-ancestors 'none' is the modern equivalent of X-Frame-Options: DENY
  h.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  );

  // HSTS — only meaningful in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
}

// ─── Matcher & handler ────────────────────────────────────────────────────────

export const config = {
  matcher: [
    // Apply rate limiting only to API routes
    '/api/:path*',
    // Apply security headers to all page routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api/');

  // ── Rate limiting (API routes only) ──────────────────────────────────────
  if (isApi) {
    const ip = getIp(request);
    const { allowed, remaining, resetAt } = edgeRateLimit(ip);

    if (!allowed) {
      const retryAfterSec = Math.ceil((resetAt - Date.now()) / 1000);
      return new NextResponse(
        JSON.stringify({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again in ${retryAfterSec}s.`,
          retryAfter: retryAfterSec,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
    applySecurityHeaders(response);
    return response;
  }

  // ── Security headers only (page routes) ──────────────────────────────────
  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}
