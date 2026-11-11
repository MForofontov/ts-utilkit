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
 * @note Best-effort string sanitizer — not a substitute for a full HTML sanitizer
 * library for untrusted user content in production.
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
  // Remove script and style tags entirely (paired)
  let sanitized = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove unclosed script/style opening tags and everything after them
  sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*$/gi, '');
  sanitized = sanitized.replace(/<style\b[^>]*>[\s\S]*$/gi, '');

  // Remove stray closing script/style tags
  sanitized = sanitized.replace(/<\/(?:script|style)\s*>/gi, '');

  // Remove all tags except allowed ones
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  sanitized = sanitized.replace(tagRegex, (match, tagName: string) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      // Remove dangerous attributes (quoted or unquoted event handlers)
      let cleanTag = match.replace(
        /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
        '',
      );
      cleanTag = cleanTag.replace(
        /\s+href\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|javascript:[^\s>]+)/gi,
        '',
      );
      return cleanTag;
    }
    return '';
  });

  return sanitized;
}
