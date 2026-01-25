/**
 * Converts a string to kebab-case (lowercase words separated by hyphens).
 *
 * @param str - The string to convert.
 * @returns The kebab-cased string with lowercase letters and hyphens between words.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * toKebabCase("Hello World"); // "hello-world"
 *
 * @example
 * // With punctuation and special characters
 * toKebabCase("Hello World! How Are You?"); // "hello-world-how-are-you"
 *
 * @example
 * // CamelCase and PascalCase conversion
 * toKebabCase("camelCaseString"); // "camelcasestring"
 * toKebabCase("PascalCaseString"); // "pascalcasestring"
 *
 * @example
 * // Multiple spaces and underscores
 * toKebabCase("hello___world   test"); // "hello-world-test"
 *
 * @example
 * // Edge cases
 * toKebabCase("   hello   "); // "hello"
 * toKebabCase("HELLO WORLD"); // "hello-world"
 * toKebabCase(""); // ""
 *
 * @note All letters are converted to lowercase.
 * @note Spaces and underscores are replaced with hyphens.
 * @note Multiple consecutive hyphens are collapsed to a single hyphen.
 * @note Non-alphanumeric characters (except hyphens) are removed.
 * @note Leading and trailing hyphens are removed.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function toKebabCase(str: string): string {
  return str
    .trim() // Trim leading and trailing spaces
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word chars
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end
}
