/**
 * Environment variable validation — runs at server startup.
 *
 * If a required variable is missing the process exits immediately with a
 * descriptive message instead of surfacing cryptic runtime errors in production.
 *
 * Usage: import '@/lib/env' at the top of any server entry point (API routes,
 * server components) to trigger the check once per cold start.
 */

import { z } from 'zod';

const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (v) => v.startsWith('file:') || v.startsWith('postgresql://') || v.startsWith('mysql://'),
      'DATABASE_URL must be a valid database connection string'
    ),

  // Auth — next-auth requires NEXTAUTH_SECRET in production
  NEXTAUTH_SECRET: z
    .string()
    .min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),

  NEXTAUTH_URL: z
    .string()
    .url('NEXTAUTH_URL must be a valid URL')
    .optional(),

  // Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

let _env: ServerEnv | null = null;

export function getEnv(): ServerEnv {
  if (_env) return _env;

  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  ✗  ${i.path.join('.')}: ${i.message}`)
      .join('\n');

    // Crash early with a human-readable message — never swallow config errors
    throw new Error(
      `\n\n[env] Missing or invalid environment variables:\n${missing}\n\n` +
      `Copy .env.example to .env.local and fill in the required values.\n`
    );
  }

  _env = result.data;
  return _env;
}

// Eagerly validate as soon as this module is imported on the server side.
// In Edge runtime (middleware) this import is skipped — use sparingly there.
if (typeof window === 'undefined') {
  try {
    getEnv();
  } catch (err) {
    console.error((err as Error).message);
    // In production, kill the process; in dev, warn and continue so the
    // developer sees the error in the terminal without a crash loop.
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
}
