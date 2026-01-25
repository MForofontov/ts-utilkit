/**
 * Extracts HTML comments from HTML content.
 *
 * @param html - The HTML content to extract comments from.
 * @returns Array of comment strings (without <!-- and --> markers).
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<!-- This is a comment --><p>Content</p>';
 * const comments = extractComments(html);
 * // [' This is a comment ']
 *
 * @example
 * // Multiple comments
 * const html = '<!-- Comment 1 --><!-- Comment 2 -->';
 * const comments = extractComments(html);
 * // [' Comment 1 ', ' Comment 2 ']
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of comments
 */
export function extractComments(html: string): string[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const comments: string[] = [];
  const commentRegex = /<!--([\s\S]*?)-->/g;
  let match: RegExpExecArray | null;

  while ((match = commentRegex.exec(html)) !== null) {
    comments.push(match[1]);
  }

  return comments;
}
