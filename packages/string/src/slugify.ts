/**
 * Converts a string into a URL-friendly slug (lowercase with hyphens).
 *
 * @param str - The string to convert into a slug.
 * @returns The slugified string suitable for URLs.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * slugify("Hello World!"); // "hello-world"
 * slugify("This is a test"); // "this-is-a-test"
 *
 * @example
 * // With special characters and punctuation
 * slugify("Hello, World! How are you?"); // "hello-world-how-are-you"
 * slugify("C++ Programming"); // "c-programming"
 *
 * @example
 * // With whitespace and underscores
 * slugify("  This___is   a    test.  "); // "this-is-a-test"
 * slugify("multi   space   text"); // "multi-space-text"
 *
 * @example
 * // Edge cases
 * slugify("123-456"); // "123-456"
 * slugify("!!!"); // ""
 * slugify(""); // ""
 *
 * @example
 * // Real-world blog post titles
 * slugify("10 Tips for Better Code"); // "10-tips-for-better-code"
 * slugify("What's New in 2025?"); // "whats-new-in-2025"
 *
 * @note All letters are converted to lowercase.
 * @note Special characters and punctuation are removed (except hyphens and alphanumerics).
 * @note Spaces, underscores, and multiple hyphens are replaced with single hyphens.
 * @note Leading and trailing hyphens are removed.
 * @note Useful for creating SEO-friendly URLs from titles or names.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
