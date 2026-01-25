/**
 * Interface for extracted style data.
 */
export interface StyleData {
  href?: string;
  inline?: string;
  media?: string;
}

/**
 * Extracts CSS from style tags and link tags in HTML content.
 *
 * @param html - The HTML content to extract styles from.
 * @returns Array of style objects with href (external) or inline content.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<link rel="stylesheet" href="styles.css">';
 * const styles = extractStyles(html);
 * // [{ href: 'styles.css' }]
 *
 * @example
 * // Inline style
 * const html = '<style>body { color: red; }</style>';
 * const styles = extractStyles(html);
 * // [{ inline: 'body { color: red; }' }]
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of styles
 */
export function extractStyles(html: string): StyleData[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const styles: StyleData[] = [];

  // Extract link tags
  const linkRegex = /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi;
  let linkMatch: RegExpExecArray | null;

  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const attributes = linkMatch[1];
    const style: StyleData = {};

    const hrefMatch = /href=["']([^"']+)["']/i.exec(attributes);
    if (hrefMatch) {
      style.href = hrefMatch[1];
    }

    const mediaMatch = /media=["']([^"']+)["']/i.exec(attributes);
    if (mediaMatch) {
      style.media = mediaMatch[1];
    }

    if (style.href) {
      styles.push(style);
    }
  }

  // Extract style tags
  const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
  let styleMatch: RegExpExecArray | null;

  while ((styleMatch = styleRegex.exec(html)) !== null) {
    const attributes = styleMatch[1];
    const content = styleMatch[2].trim();
    const style: StyleData = {};

    const mediaMatch = /media=["']([^"']+)["']/i.exec(attributes);
    if (mediaMatch) {
      style.media = mediaMatch[1];
    }

    if (content) {
      style.inline = content;
    }

    styles.push(style);
  }

  return styles;
}
