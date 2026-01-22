/**
 * Replaces all occurrences of a pattern (polyfill-style implementation).
 *
 * @param text - The text to perform replacements on.
 * @param pattern - The pattern to match (string or RegExp).
 * @param replacement - The replacement string or function.
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns String with all matches replaced.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If replacement is not a string or function.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Simple replacement
 * replaceAll("Hello World, Hello Universe", "Hello", "Hi");
 * // "Hi World, Hi Universe"
 *
 * @example
 * // Regex pattern
 * replaceAll("Test 123, Test 456", /Test \d+/g, "Result");
 * // "Result, Result"
 *
 * @example
 * // Function replacement
 * replaceAll("a1b2c3", /\d/g, (match) => String(Number(match) * 2));
 * // "a2b4c6"
 *
 * @note This provides a consistent replaceAll implementation across environments.
 *
 * @complexity Time: O(n*m), Space: O(n) where n is text length, m is pattern complexity
 */
export function replaceAll(
  text: string,
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string),
  flags?: string,
): string {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
  }

  if (typeof replacement !== 'string' && typeof replacement !== 'function') {
    throw new TypeError(
      `replacement must be a string or function, got ${typeof replacement}`,
    );
  }

  if (flags !== undefined && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  let regex: RegExp;

  try {
    if (typeof pattern === 'string') {
      // For string patterns, escape special characters and add global flag
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
      const effectiveFlags = flags || 'g';
      const hasGlobalFlag = effectiveFlags.includes('g');
      const finalFlags = hasGlobalFlag ? effectiveFlags : effectiveFlags + 'g';
      regex = new RegExp(escaped, finalFlags);
    } else {
      if (!pattern.global) {
        const currentFlags = pattern.flags;
        regex = new RegExp(pattern.source, currentFlags + 'g');
      } else {
        regex = pattern;
      }
    }
  } catch (e) {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  return text.replace(regex, replacement as any);
}
