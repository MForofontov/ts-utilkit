/**
 * Converts a string to snake_case (lowercase with words separated by underscores).
 *
 * @param str - The string to convert.
 * @returns The snake-cased string with lowercase letters and underscores between words.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * toSnakeCase("Hello World"); // "hello_world"
 *
 * @example
 * // With punctuation and special characters
 * toSnakeCase("Hello World! How Are You?"); // "hello_world_how_are_you"
 *
 * @example
 * // CamelCase and PascalCase conversion
 * toSnakeCase("camelCaseString"); // "camelcasestring"
 * toSnakeCase("PascalCaseString"); // "pascalcasestring"
 *
 * @example
 * // Multiple spaces
 * toSnakeCase("hello   world   test"); // "hello_world_test"
 *
 * @example
 * // Edge cases
 * toSnakeCase("   hello   "); // "hello"
 * toSnakeCase("HELLO WORLD"); // "hello_world"
 * toSnakeCase(""); // ""
 *
 * @note All letters are converted to lowercase.
 * @note Spaces are replaced with underscores.
 * @note Multiple consecutive underscores are collapsed to a single underscore.
 * @note Non-word characters (except hyphens) are removed.
 * @note Leading and trailing underscores are removed.
 * @note Common use cases: database column names, variable names, file names.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function toSnakeCase(str: string): string {
  return str
    .trim() // Trim leading and trailing spaces
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^\w-]+/g, '') // Remove non-word chars
    .replace(/__+/g, '_') // Replace multiple underscores with a single one
    .replace(/^_+|_+$/g, ''); // Trim underscores from start and end
}
