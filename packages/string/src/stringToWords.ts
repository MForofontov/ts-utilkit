/**
 * Converts a string to an array of words by splitting on whitespace.
 *
 * @param str - The string to split into words.
 * @returns An array of words (non-empty strings separated by whitespace).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * stringToWords("Hello world!"); // ["Hello", "world!"]
 *
 * @example
 * // Multiple spaces are normalized
 * stringToWords("Hello   world    test"); // ["Hello", "world", "test"]
 *
 * @example
 * // Leading/trailing whitespace is removed
 * stringToWords("   Hello world   "); // ["Hello", "world"]
 *
 * @example
 * // Empty or whitespace-only strings
 * stringToWords(""); // []
 * stringToWords("    "); // []
 *
 * @note Splits on any whitespace characters (spaces, tabs, newlines).
 * @note Punctuation remains attached to words.
 * @note Empty strings are filtered out from the result.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function stringToWords(str: string): string[] {
  return str
    .trim() // Trim leading and trailing spaces
    .split(/\s+/) // Split by one or more whitespace characters
    .filter((word) => word.length > 0); // Filter out empty strings
}
