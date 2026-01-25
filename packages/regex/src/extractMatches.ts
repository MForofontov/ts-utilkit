/**
 * Extracts all matches of a pattern from a string.
 *
 * @param text - The text to search in.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns Array of matched strings, or empty array if no matches.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {TypeError} If pattern is not a string or RegExp.
 * @throws {TypeError} If flags is provided and not a string.
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // Extract numbers
 * extractMatches("Price: $99.99, Tax: $5.50", /\$\d+\.\d+/g);
 * // ["$99.99", "$5.50"]
 *
 * @example
 * // Extract words
 * extractMatches("Hello World! How are you?", /\w+/g);
 * // ["Hello", "World", "How", "are", "you"]
 *
 * @example
 * // Using string pattern
 * extractMatches("test123abc456def", "\\d+", "g");
 * // ["123", "456"]
 *
 * @note Automatically adds 'g' flag if not present to ensure all matches are found.
 *
 * @complexity Time: O(n*m), Space: O(k) where n is text length, m is pattern complexity, k is number of matches
 */
export function extractMatches(
  text: string,
  pattern: string | RegExp,
  flags?: string,
): string[] {
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
      // Ensure 'g' flag is present
      const effectiveFlags = flags || 'g';
      const hasGlobalFlag = effectiveFlags.includes('g');
      const finalFlags = hasGlobalFlag ? effectiveFlags : effectiveFlags + 'g';
      regex = new RegExp(pattern, finalFlags);
    } else {
      // Pattern is already a RegExp
      if (!pattern.global) {
        // Create a new RegExp with global flag
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

  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0]);
  }

  return matches;
}
