/**
 * Input sanitization utilities.
 * Strip HTML/script tags and enforce length limits before any value
 * is rendered, stored, or sent to an API.
 */

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/** Escape HTML special characters to neutralize XSS in rendered output. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`=/]/g, (ch) => HTML_ENTITIES[ch] ?? ch);
}

/** Remove every HTML/script tag from a string entirely. */
function stripTags(value: string): string {
  // Remove script blocks first (content + tag)
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '');
}

/** Remove dangerous URI schemes used in attribute injection (javascript:, data:, vbscript:). */
function stripDangerousProtocols(value: string): string {
  return value.replace(/^\s*(javascript|data|vbscript):/gi, '');
}

export interface SanitizeOptions {
  /** Maximum allowed character length. Default: 500. */
  maxLength?: number;
  /** Allow only alphanumeric + basic punctuation (safe for IDs/slugs). Default: false. */
  alphanumericOnly?: boolean;
}

/**
 * Main sanitizer. Use on every user-supplied string before storage or rendering.
 *
 * Steps applied in order:
 *   1. Trim whitespace
 *   2. Enforce maxLength
 *   3. Strip HTML/script/style tags
 *   4. Remove dangerous URI protocols
 *   5. Escape remaining HTML entities
 */
export function sanitize(raw: unknown, options: SanitizeOptions = {}): string {
  if (typeof raw !== 'string') return '';

  const { maxLength = 500, alphanumericOnly = false } = options;

  let value = raw.trim().slice(0, maxLength);
  value = stripTags(value);
  value = stripDangerousProtocols(value);
  value = escapeHtml(value);

  if (alphanumericOnly) {
    // Keep letters, digits, hyphens, underscores, spaces
    value = value.replace(/[^a-zA-Z0-9؀-ۿ\s\-_]/g, '');
  }

  return value;
}

/** Field-specific presets so every form uses consistent limits. */
export const limits = {
  name:     { maxLength: 100 },
  email:    { maxLength: 254 },   // RFC 5321 max
  password: { maxLength: 128 },
  search:   { maxLength: 200 },
  textarea: { maxLength: 2000 },
  url:      { maxLength: 2048 },
} as const;
