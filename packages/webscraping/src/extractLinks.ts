/**
 * Extracts all links (anchor tags) from HTML content.
 *
 * @param html - The HTML content to extract links from.
 * @param baseUrl - Optional base URL to resolve relative links.
 * @returns Array of extracted URLs.
 *
 * @example
 * const html = '<a href="/page">Link</a><a href="https://example.com">External</a>';
 * const links = extractLinks(html);
 * // ['/page', 'https://example.com']
 *
 * @example
 * // With base URL to resolve relative links
 * const links = extractLinks(html, 'https://example.com');
 * // ['https://example.com/page', 'https://example.com']
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of links
 */
export function extractLinks(html: string, baseUrl?: string): string[] {
  const links: string[] = [];
  const hrefRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = hrefRegex.exec(html)) !== null) {
    let link = match[1];

    // Resolve relative URLs if baseUrl is provided
    if (
      baseUrl &&
      !link.startsWith('http://') &&
      !link.startsWith('https://')
    ) {
      try {
        const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        link = link.startsWith('/') ? `${base}${link}` : `${base}/${link}`;
      } catch {
        // If URL construction fails, keep original link
      }
    }

    links.push(link);
  }

  return links;
}
