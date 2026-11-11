/**
 * Serializes call arguments into a stable cache key, distinguishing values
 * that `JSON.stringify` would collapse. User strings in the reserved namespace
 * are escaped, so no user object or string can impersonate a special value.
 */
export function defaultCacheKey(args: unknown[]): string {
  return JSON.stringify(args, (_key, value) => {
    if (typeof value === 'number' && Number.isNaN(value)) {
      return '\u0000NaN';
    }
    if (value === undefined) {
      return '\u0000undefined';
    }
    if (value === Infinity) return '\u0000Infinity';
    if (value === -Infinity) return '\u0000-Infinity';
    if (Object.is(value, -0)) return '\u0000-0';
    if (typeof value === 'string' && value.startsWith('\u0000')) {
      return `\u0000string:${value}`;
    }
    return value;
  });
}
