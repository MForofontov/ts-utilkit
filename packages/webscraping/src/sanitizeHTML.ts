/**
 * Sanitizes HTML by removing potentially dangerous tags and attributes.
 *
 * @param html - The HTML content to sanitize.
 * @param allowedTags - Array of allowed HTML tags (default: safe tags).
 * @returns Sanitized HTML string.
 *
 * @example
 * const html = '<p>Safe</p><script>alert("XSS")</script>';
 * const safe = sanitizeHTML(html);
 * // '<p>Safe</p>'
 *
 * @example
 * // Custom allowed tags
 * const safe = sanitizeHTML('<div><b>Bold</b></div>', ['b']);
 * // '<b>Bold</b>'
 *
 * @complexity Time: O(n) where n is html length, Space: O(n)
 */
export function sanitizeHTML(
  html: string,
  allowedTags: string[] = [
    'p',
    'br',
    'strong',
    'em',
    'u',
    'b',
    'i',
    'span',
    'div',
  ],
): string {

  // Remove script and style tags entirely
  let sanitized = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove all tags except allowed ones
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  sanitized = sanitized.replace(tagRegex, (match, tagName: string) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      // Remove dangerous attributes from allowed tags
      let cleanTag = match.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
      cleanTag = cleanTag.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');
      return cleanTag;
    }
    return '';
  });

  return sanitized;
}
