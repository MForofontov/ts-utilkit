/**
 * Wraps all pattern matches with custom tags for highlighting or markup.
 *
 * @param text - The text to process.
 * @param pattern - The regular expression pattern (string or RegExp).
 * @param options - Highlighting options.
 * @param options.before - String to insert before each match (default: '<mark>').
 * @param options.after - String to insert after each match (default: '</mark>').
 * @param flags - Optional flags for string patterns (default: 'g').
 * @returns String with matches wrapped in the specified tags.
 *
 * @throws {Error} If pattern is invalid.
 *
 * @example
 * // HTML highlighting
 * highlightMatches("Hello World", /world/i);
 * // "Hello <mark>World</mark>"
 *
 * @example
 * // Custom tags
 * highlightMatches("Price: $99.99", /\$\d+\.\d+/g, {
 *   before: '<span class="price">',
 *   after: '</span>'
 * });
 * // "Price: <span class=\"price\">$99.99</span>"
 *
 * @example
 * // Multiple matches
 * highlightMatches("test TEST tEsT", /test/gi, { before: '**', after: '**' });
 * // "**test** **TEST** **tEsT**"
 *
 * @note Useful for search results highlighting, syntax highlighting, or text markup.
 *
 * @complexity Time: O(n*m), Space: O(n) where n is text length, m is pattern complexity
 */
export function highlightMatches(
  text: string,
  pattern: string | RegExp,
  options?: {
    before?: string;
    after?: string;
  },
  flags?: string,
): string {
  const before = options?.before ?? '<mark>';
  const after = options?.after ?? '</mark>';

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
  } catch {
    throw new Error(
      `Invalid regular expression pattern: ${pattern instanceof RegExp ? pattern.source : pattern}`,
    );
  }

  return text.replace(regex, (match) => `${before}${match}${after}`);
}
