/**
 * Converts a string to lowercase.
 *
 * @param str - The string to convert.
 * @returns The lowercase string.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * toLowerCase("HELLO"); // "hello"
 * toLowerCase("WORLD"); // "world"
 *
 * @example
 * // Mixed case input
 * toLowerCase("Hello World"); // "hello world"
 * toLowerCase("TypeScript"); // "typescript"
 *
 * @example
 * // Special characters and numbers
 * toLowerCase("HELLO123!"); // "hello123!"
 * toLowerCase("TEST@EXAMPLE.COM"); // "test@example.com"
 *
 * @example
 * // Edge cases
 * toLowerCase(""); // ""
 * toLowerCase("already lowercase"); // "already lowercase"
 *
 * @note This is a simple wrapper around the native String.prototype.toLowerCase() method.
 * @note Non-alphabetic characters (numbers, symbols, whitespace) remain unchanged.
 * @note The function preserves all characters including special characters.
 * @note Locale-aware lowercasing requires String.prototype.toLocaleLowerCase() instead.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}
