/**
 * Converts a string to uppercase.
 *
 * @param str - The string to convert.
 * @returns The uppercase string.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * toUpperCase("hello"); // "HELLO"
 * toUpperCase("world"); // "WORLD"
 *
 * @example
 * // Mixed case input
 * toUpperCase("Hello World"); // "HELLO WORLD"
 * toUpperCase("TypeScript"); // "TYPESCRIPT"
 *
 * @example
 * // Special characters and numbers
 * toUpperCase("hello123!"); // "HELLO123!"
 * toUpperCase("test@example.com"); // "TEST@EXAMPLE.COM"
 *
 * @example
 * // Edge cases
 * toUpperCase(""); // ""
 * toUpperCase("ALREADY UPPERCASE"); // "ALREADY UPPERCASE"
 *
 * @note This is a simple wrapper around the native String.prototype.toUpperCase() method.
 * @note Non-alphabetic characters (numbers, symbols, whitespace) remain unchanged.
 * @note The function preserves all characters including special characters.
 * @note Locale-aware uppercasing requires String.prototype.toLocaleUpperCase() instead.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}
