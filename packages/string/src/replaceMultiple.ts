/**
 * Replaces multiple different substrings in a string using a mapping object (case-sensitive).
 *
 * @param str - The string to perform replacements in.
 * @param replacements - An object mapping search strings (keys) to replacement strings (values).
 * @returns A new string with all specified substrings replaced with their corresponding values.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If replacements is not an object.
 *
 * @example
 * // Basic usage
 * replaceMultiple("hello world", { "hello": "hi", "world": "everyone" });
 * // Returns: "hi everyone"
 *
 * @example
 * // Multiple replacements
 * replaceMultiple("foo bar baz", { "foo": "qux", "bar": "quux" });
 * // Returns: "qux quux baz"
 *
 * @example
 * // With special characters
 * replaceMultiple("a.b.c", { ".": "-", "a": "x" });
 * // Returns: "x-b-c"
 *
 * @example
 * // Empty replacements object
 * replaceMultiple("hello world", {}); // "hello world"
 *
 * @example
 * // Real-world: template variable replacement
 * const template = "Hello {name}, you have {count} messages";
 * const result = replaceMultiple(template, {
 *   "{name}": "Alice",
 *   "{count}": "5"
 * });
 * // Result: "Hello Alice, you have 5 messages"
 *
 * @note Replaces all occurrences of each search string globally.
 * @note Replacement is case-sensitive.
 * @note Special regex characters in search strings are automatically escaped.
 * @note Replacements are processed simultaneously to avoid cascading replacements.
 *
 * @complexity Time: O(n*m), Space: O(n) where n is str length, m is number of replacements
 */
export function replaceMultiple(
  str: string,
  replacements: { [key: string]: string },
): string {
  const replacementKeys = Object.keys(replacements);

  if (replacementKeys.length === 0) {
    return str;
  }

  const escapedKeys = replacementKeys.map(
    (key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), // Escape special regex characters
  );

  const regex = new RegExp(escapedKeys.join('|'), 'g');

  return str.replace(regex, (match) => replacements[match]);
}
