/**
 * Strips HTML tags from a string, leaving only the text content.
 *
 * @param str - The string containing HTML to process.
 * @returns The string with all HTML tags removed.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * stripHtmlTags("<p>Hello <b>world</b></p>"); // "Hello world"
 *
 * @example
 * // Self-closing tags
 * stripHtmlTags("<img src='test.jpg' /><br />Hello"); // "Hello"
 *
 * @example
 * // Nested tags
 * stripHtmlTags("<div><span>Hello <strong>world</strong></span></div>"); // "Hello world"
 *
 * @note This uses regex-based tag removal and works for most common HTML.
 * @note For complex HTML parsing with proper DOM handling, consider using a dedicated HTML parser.
 * @note Does not decode HTML entities (e.g., &amp; remains as &amp;).
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function stripHtmlTags(str: string): string {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}
