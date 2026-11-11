/**
 * Counts the number of non-overlapping occurrences of a substring in a string (case-sensitive).
 *
 * @param str - The string to search in.
 * @param substring - The substring to count occurrences of.
 * @returns The number of times the substring appears in the string.
 *
 * @example
 * // Basic usage
 * countSubstring("hello world, hello universe", "hello"); // 2
 * countSubstring("abababa", "aba"); // 2 (non-overlapping)
 *
 * @example
 * // Case-sensitive counting
 * countSubstring("Hello hello HELLO", "hello"); // 1
 * countSubstring("Test test TEST", "test"); // 1
 *
 * @example
 * // Special characters
 * countSubstring("a.b.c.d", "."); // 3
 * countSubstring("$price$value$", "$"); // 3
 *
 * @example
 * // Single character substrings
 * countSubstring("mississippi", "s"); // 4
 * countSubstring("aaaaaa", "aa"); // 3 (non-overlapping)
 *
 * @example
 * // Edge cases
 * countSubstring("hello", ""); // 0 (empty substring returns 0)
 * countSubstring("", "test"); // 0
 * countSubstring("hello", "world"); // 0
 *
 * @note Counting is case-sensitive.
 * @note Counts non-overlapping occurrences only.
 * @note Searches literally, including regex metacharacters and UTF-16 code units.
 * @note Returns 0 if substring is empty or not found.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
import { escapeRegex } from './escapeRegex';

export function countSubstring(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  // Dense long inputs are faster with V8's native global matcher. The literal
  // loop avoids regex construction and match allocation on short strings.
  if (str.length > 256) {
    return (str.match(new RegExp(escapeRegex(substring), 'g')) || []).length;
  }
  let count = 0;
  let position = str.indexOf(substring);
  while (position !== -1) {
    count++;
    position = str.indexOf(substring, position + substring.length);
  }
  return count;
}
