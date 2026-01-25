/**
 * Repeats a string until it reaches or exceeds a specified length, then truncates to exact length.
 *
 * @param str - The string to repeat.
 * @param length - The desired length of the output string (must be non-negative).
 * @returns The repeated string truncated to exactly the desired length.
 *
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is negative.
 *
 * @example
 * // Basic usage
 * repeatUntilLength("abc", 10); // "abcabcabca"
 * repeatUntilLength("xyz", 7); // "xyzxyzx"
 *
 * @example
 * // Exact multiples
 * repeatUntilLength("ab", 6); // "ababab"
 * repeatUntilLength("12", 4); // "1212"
 *
 * @example
 * // Edge cases
 * repeatUntilLength("hello", 0); // ""
 * repeatUntilLength("", 10); // ""
 * repeatUntilLength("a", 5); // "aaaaa"
 *
 * @example
 * // Length less than string length
 * repeatUntilLength("hello", 3); // "hel"
 *
 * @example
 * // Real-world: padding or filling
 * const pattern = "*-";
 * const divider = repeatUntilLength(pattern, 20); // "*-*-*-*-*-*-*-*-*-*-"
 *
 * @note If the input string is empty, returns empty string regardless of length.
 * @note If length is less than string length, string is truncated.
 * @note The string is repeated as many times as needed, then truncated to exact length.
 * @note Useful for creating patterns, padding, or filling to specific lengths.
 *
 * @complexity Time: O(n) where n is the desired length, Space: O(n)
 */
export function repeatUntilLength(str: string, length: number): string {
  if (isNaN(length)) {
    throw new Error('Length must be a number');
  }
  if (length < 0) {
    throw new Error('Length must be non-negative');
  }
  if (str.length === 0) {
    return '';
  }
  return str.repeat(Math.ceil(length / str.length)).substring(0, length);
}
