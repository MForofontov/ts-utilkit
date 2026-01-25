/**
 * Extracts all image sources from HTML content.
 *
 * @param html - The HTML content to extract images from.
 * @param baseUrl - Optional base URL to resolve relative image paths.
 * @returns Array of extracted image URLs.
 *
 * @throws {TypeError} If html is not a string.
 * @throws {TypeError} If baseUrl is provided but not a string.
 *
 * @example
 * const html = '<img src="/logo.png"><img src="https://cdn.com/image.jpg">';
 * const images = extractImages(html);
 * // ['/logo.png', 'https://cdn.com/image.jpg']
 *
 * @example
 * // With base URL
 * const images = extractImages(html, 'https://example.com');
 * // ['https://example.com/logo.png', 'https://cdn.com/image.jpg']
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of images
 */
export function extractImages(html: string, baseUrl?: string): string[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }
  if (baseUrl !== undefined && typeof baseUrl !== 'string') {
    throw new TypeError(`baseUrl must be a string, got ${typeof baseUrl}`);
  }

  const images: string[] = [];
  const srcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = srcRegex.exec(html)) !== null) {
    let src = match[1];

    // Resolve relative URLs if baseUrl is provided
    if (
      baseUrl &&
      !src.startsWith('http://') &&
      !src.startsWith('https://') &&
      !src.startsWith('data:')
    ) {
      try {
        const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        src = src.startsWith('/') ? `${base}${src}` : `${base}/${src}`;
      } catch {
        // If URL construction fails, keep original src
      }
    }

    images.push(src);
  }

  return images;
}
