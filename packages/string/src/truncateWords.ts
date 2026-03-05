/**
 * Truncates a string to a specified number of words, appending a suffix if the
 * string was truncated. Useful for creating text previews, summaries, and
 * multi-line ellipsis effects where whole words should be preserved.
 *
 * @param str - The string to truncate.
 * @param count - The maximum number of words to keep (must be >= 1).
 * @param suffix - The string to append when truncated (default: `'...'`).
 * @returns The original string if it has fewer or equal words than `count`,
 *   otherwise the first `count` words joined by a single space with `suffix`
 *   appended.
 *
 * @throws {Error} If count is less than 1.
 *
 * @example
 * // Truncate a sentence to 3 words
 * truncateWords('The quick brown fox jumps', 3);
 * // 'The quick brown...'
 *
 * @example
 * // No truncation if word count is within limit
 * truncateWords('Hello world', 5);
 * // 'Hello world'
 *
 * @example
 * // Custom suffix
 * truncateWords('The quick brown fox', 2, ' [read more]');
 * // 'The quick [read more]'
 *
 * @note Unlike truncateString (which cuts at a character count), truncateWords
 *   always preserves whole words and never splits a word mid-character.
 * @note Multiple consecutive whitespace characters between words are collapsed
 *   to a single space in the output.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function truncateWords(
  str: string,
  count: number,
  suffix: string = '...',
): string {
  if (count < 1) {
    throw new Error(`count must be at least 1, got ${count}`);
  }

  const words = str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length <= count) {
    return str.trim();
  }

  return words.slice(0, count).join(' ') + suffix;
}
