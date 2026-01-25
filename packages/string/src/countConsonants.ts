/**
 * Counts the number of consonants in a string (case-insensitive).
 *
 * @param str - The string to analyze.
 * @returns The total count of consonant letters (b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * countConsonants("Hello world"); // 7
 *
 * @example
 * // Case-insensitive counting
 * countConsonants("BCDFG"); // 5
 * countConsonants("bcdfg"); // 5
 *
 * @example
 * // Only consonants are counted
 * countConsonants("aeiou"); // 0
 * countConsonants("xyz"); // 3
 *
 * @example
 * // Non-letter characters are ignored
 * countConsonants("Hello, World! 123"); // 7
 * countConsonants(""); // 0
 *
 * @note Only English alphabet consonants are counted (vowels a, e, i, o, u are excluded).
 * @note Counting is case-insensitive.
 * @note Numbers, spaces, and special characters are ignored.
 * @note The letter 'y' is treated as a consonant.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function countConsonants(str: string): number {
  return (str.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
}
