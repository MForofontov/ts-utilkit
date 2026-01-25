/**
 * Counts the number of times a pattern matches in a string.
 *
 * @param text - The text to search in.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns Number of matches found.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Count words
 * countMatches("Hello World! How are you?", /\w+/g);
 * // 5
 *
 * @example
 * // Count numbers
 * countMatches("Room 101, Floor 2, Building 3", /\d+/g);
 * // 3
 *
 * @example
 * // Count specific pattern
 * countMatches("test test TEST test", /test/gi);
 * // 4
 *
 * @note Returns 0 if no matches are found.
 *
 * @complexity Time: O(n*m), Space: O(1) where n is text length, m is pattern complexity
 */
export function countMatches(
  text: string,
  pattern: string | RegExp,
  flags?: string,
): number {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
    throw new TypeError(
      `pattern must be a string or RegExp, got ${typeof pattern}`,
    );
  }

  if (flags !== undefined && typeof flags !== 'string') {
    throw new TypeError(`flags must be a string, got ${typeof flags}`);
  }

  let regex: RegExp;

  try {
    if (typeof pattern === 'string') {
      const effectiveFlags = flags || 'g';
      const hasGlobalFlag = effectiveFlags.includes('g');
      const finalFlags = hasGlobalFlag ? effectiveFlags : effectiveFlags + 'g';
      regex = new RegExp(pattern, finalFlags);
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

  let count = 0;
  while (regex.exec(text) !== null) {
    count++;
  }

  return count;
}
