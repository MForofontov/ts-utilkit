/**
 * Interface for meta tag data.
 */
export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

/**
 * Extracts meta tags from HTML content.
 *
 * @param html - The HTML content to extract meta tags from.
 * @returns Array of meta tag objects with name/property and content.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<meta name="description" content="Example site">';
 * const meta = extractMetaTags(html);
 * // [{ name: 'description', content: 'Example site' }]
 *
 * @example
 * // Open Graph tags
 * const html = '<meta property="og:title" content="My Page">';
 * const meta = extractMetaTags(html);
 * // [{ property: 'og:title', content: 'My Page' }]
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of meta tags
 */
export function extractMetaTags(html: string): MetaTag[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const metaTags: MetaTag[] = [];
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match: RegExpExecArray | null;

  while ((match = metaRegex.exec(html)) !== null) {
    const attributes = match[1];
    const nameMatch = /name=["']([^"']+)["']/i.exec(attributes);
    const propertyMatch = /property=["']([^"']+)["']/i.exec(attributes);
    const contentMatch = /content=["']([^"']+)["']/i.exec(attributes);

    if (contentMatch) {
      const metaTag: MetaTag = {
        content: contentMatch[1],
      };

      if (nameMatch) {
        metaTag.name = nameMatch[1];
      }
      if (propertyMatch) {
        metaTag.property = propertyMatch[1];
      }

      metaTags.push(metaTag);
    }
  }

  return metaTags;
}
