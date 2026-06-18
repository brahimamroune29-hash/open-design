/**
 * /api/projects — CRUD API demonstrating all four security protocols:
 *
 *  1. Input Defense   — every request body/param is parsed & validated with Zod
 *                       before touching the database.
 *  2. DB Integrity    — all queries go through Prisma, which uses parameterized
 *                       prepared statements internally — SQL injection is impossible.
 *  3. Secret Mgmt     — database connection string comes from env (DATABASE_URL),
 *                       validated at startup by src/lib/env.ts.
 *  4. Rate Limiting   — enforced upstream in middleware.ts before this handler runs.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { sanitize, limits } from '@/lib/sanitize';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

// ─── Prisma singleton (avoid exhausting the connection pool in dev) ───────────
// (In production prefer a shared singleton from src/lib/prisma.ts)
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}
const prisma = global.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;

// ─── Zod schemas — the single source of truth for what inputs are valid ───────

const SearchQuerySchema = z.object({
  q:        z.string().max(limits.search.maxLength).optional(),
  category: z.string().max(100).optional(),
  page:     z.coerce.number().int().min(1).max(1000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

const CreateProductSchema = z.object({
  name:          z.string().min(1).max(limits.name.maxLength),
  nameAr:        z.string().min(1).max(limits.name.maxLength),
  description:   z.string().min(1).max(limits.textarea.maxLength),
  descriptionAr: z.string().min(1).max(limits.textarea.maxLength),
  price:         z.number().positive().max(1_000_000),
  category:      z.string().min(1).max(100),
  sizes:         z.string().max(500),
  colors:        z.string().max(500),
  images:        z.string().max(limits.url.maxLength),
  stock:         z.number().int().min(0).max(100_000).default(0),
  featured:      z.boolean().default(false),
});

// ─── Helper: build a standardised error response ─────────────────────────────

function apiError(message: string, status: number, detail?: unknown) {
  return NextResponse.json(
    { error: message, ...(detail ? { detail } : {}) },
    { status }
  );
}

// ─── GET /api/projects ────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Per-route stricter rate limit (read endpoints can afford more headroom)
  const ip = getClientIp(request);
  const rl = rateLimit(`GET:/api/projects:${ip}`, { limit: 120, windowMs: 60_000 });
  if (!rl.success) {
    const retryAfter = Math.ceil((rl.resetAt - Date.now()) / 1000);
    return apiError('Too Many Requests', 429, { retryAfter });
  }

  // Parse & validate query params — never trust raw request.nextUrl.searchParams
  const raw = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = SearchQuerySchema.safeParse(raw);
  if (!parsed.success) {
    return apiError('Invalid query parameters', 400, parsed.error.flatten());
  }

  const { q, category, page, pageSize } = parsed.data;

  // Sanitize the search term before using it in the query
  const safeQ = q ? sanitize(q, limits.search) : undefined;

  // Prisma generates a parameterized prepared statement — the `safeQ` string
  // is passed as a bound parameter, never interpolated into raw SQL.
  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        ...(safeQ && {
          OR: [
            { name:        { contains: safeQ } },
            { description: { contains: safeQ } },
          ],
        }),
        ...(category && { category: { equals: sanitize(category, { maxLength: 100 }) } }),
      },
      skip:    (page - 1) * pageSize,
      take:    pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id:          true,
        name:        true,
        nameAr:      true,
        description: true,
        price:       true,
        category:    true,
        images:      true,
        stock:       true,
        featured:    true,
        createdAt:   true,
        // Exclude internal fields like orderItems from the public response
      },
    }),
    prisma.product.count({
      where: {
        ...(safeQ && {
          OR: [
            { name:        { contains: safeQ } },
            { description: { contains: safeQ } },
          ],
        }),
        ...(category && { category: sanitize(category, { maxLength: 100 }) }),
      },
    }),
  ]);

  return NextResponse.json({
    data: items,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}

// ─── POST /api/projects ───────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Stricter rate limit for write operations
  const ip = getClientIp(request);
  const rl = rateLimit(`POST:/api/projects:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!rl.success) {
    const retryAfter = Math.ceil((rl.resetAt - Date.now()) / 1000);
    return apiError('Too Many Requests', 429, { retryAfter });
  }

  // Reject non-JSON content types early
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return apiError('Content-Type must be application/json', 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError('Invalid JSON body', 400);
  }

  // Validate structure and types with Zod
  const parsed = CreateProductSchema.safeParse(body);
  if (!parsed.success) {
    return apiError('Validation failed', 422, parsed.error.flatten());
  }

  // Sanitize every string field before persisting
  const data = parsed.data;
  const safeData = {
    ...data,
    name:          sanitize(data.name,          limits.name),
    nameAr:        sanitize(data.nameAr,         limits.name),
    description:   sanitize(data.description,    limits.textarea),
    descriptionAr: sanitize(data.descriptionAr,  limits.textarea),
    category:      sanitize(data.category,       { maxLength: 100 }),
    sizes:         sanitize(data.sizes,          { maxLength: 500 }),
    colors:        sanitize(data.colors,         { maxLength: 500 }),
    images:        sanitize(data.images,         limits.url),
  };

  // Prisma uses a parameterized INSERT — values are never spliced into SQL
  const product = await prisma.product.create({ data: safeData });

  return NextResponse.json({ data: product }, { status: 201 });
}
