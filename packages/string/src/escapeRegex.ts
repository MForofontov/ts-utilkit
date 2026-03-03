/**
 * Escapes special regex characters in a string for literal matching.
 * Useful when building regex patterns from user input or dynamic strings.
 *
 * @param str - The string to escape.
 * @returns String with all regex special characters escaped.
 *
 * @example
 * // Escape dots and other special characters
 * escapeRegex("hello.world"); // "hello\\.world"
 *
 * @example
 * // Escape regex metacharacters
 * escapeRegex("test (123) [abc]"); // "test \\(123\\) \\[abc\\]"
 *
 * @example
 * // Use in dynamic regex
 * const userInput = "price: $99.99";
 * const escaped = escapeRegex(userInput);
 * const regex = new RegExp(escaped);
 * regex.test("price: $99.99"); // true
 *
 * @note Escapes these characters: . * + ? ^ $ { } ( ) | [ ] \ /
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function escapeRegex(str: string): string {
  // Escape all regex special characters
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\//g, '\\/');
}
