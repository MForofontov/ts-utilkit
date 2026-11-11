/** Safe HTML attributes preserved on allowed tags. */
const SAFE_ATTRIBUTES = new Set([
  'class',
  'id',
  'title',
  'lang',
  'dir',
  'role',
]);

/** Attributes always stripped from allowed tags. */
const BLOCKED_ATTRIBUTES = new Set([
  'style',
  'formaction',
  'srcdoc',
  'src',
  'href',
  'xlink:href',
]);

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCharCode(parseInt(dec, 10)),
    )
    .replace(
      /&(amp|lt|gt|quot|apos);/gi,
      (entity) =>
        ({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&apos;': "'",
        })[entity.toLowerCase()] ?? entity,
    );
}

function isSafeUrl(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return !(
    normalized.startsWith('javascript:') ||
    normalized.startsWith('data:') ||
    normalized.startsWith('vbscript:')
  );
}

function cleanAllowedTag(match: string, tagName: string): string {
  if (/^<\//.test(match)) {
    return `</${tagName}>`;
  }

  const decoded = decodeHtmlEntities(match);
  const attrs: string[] = [];
  const attrRegex = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  let attrMatch: RegExpExecArray | null;

  while ((attrMatch = attrRegex.exec(decoded)) !== null) {
    const name = attrMatch[1].toLowerCase();
    const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';

    if (name.startsWith('on') || BLOCKED_ATTRIBUTES.has(name)) {
      continue;
    }

    if ((name === 'href' || name === 'src') && !isSafeUrl(value)) {
      continue;
    }

    if (SAFE_ATTRIBUTES.has(name) || name.startsWith('aria-')) {
      const escapedValue = value.replace(/"/g, '&quot;');
      attrs.push(`${attrMatch[1]}="${escapedValue}"`);
    }
  }

  if (attrs.length === 0) {
    return `<${tagName}>`;
  }

  return `<${tagName} ${attrs.join(' ')}>`;
}

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
  let sanitized = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*$/gi, '');
  sanitized = sanitized.replace(/<style\b[^>]*>[\s\S]*$/gi, '');
  sanitized = sanitized.replace(/<\/(?:script|style)\s*>/gi, '');

  const allowed = new Set(allowedTags.map((tag) => tag.toLowerCase()));
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

  sanitized = sanitized.replace(tagRegex, (match, tagName: string) => {
    if (allowed.has(tagName.toLowerCase())) {
      return cleanAllowedTag(match, tagName.toLowerCase());
    }
    return '';
  });

  return sanitized;
}
