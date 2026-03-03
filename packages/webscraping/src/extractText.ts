/**
 * Extracts text content from HTML, removing all tags.
 *
 * @param html - The HTML content to extract text from.
 * @param preserveWhitespace - Whether to preserve whitespace (default: false).
 * @returns Extracted text content.
 *
 * @example
 * const html = '<div>Hello <span>World</span>!</div>';
 * const text = extractText(html);
 * // 'Hello World!'
 *
 * @example
 * // Preserving whitespace
 * const text = extractText('<p>Line 1</p>\n<p>Line 2</p>', true);
 * // 'Line 1\nLine 2'
 *
 * @complexity Time: O(n) where n is html length, Space: O(n)
 */
export function extractText(
  html: string,
  preserveWhitespace: boolean = false,
): string {

  // Remove script and style tags with their content
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  if (!preserveWhitespace) {
    // Collapse multiple spaces into one
    text = text.replace(/\s+/g, ' ');
    // Trim leading and trailing whitespace
    text = text.trim();
  }

  return text;
}
