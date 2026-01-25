/**
 * Extracts structured data (JSON-LD) from HTML content.
 *
 * @param html - The HTML content to extract structured data from.
 * @returns Array of parsed JSON-LD objects.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<script type="application/ld+json">{"@type":"Article","name":"Test"}</script>';
 * const data = extractStructuredData(html);
 * // [{ '@type': 'Article', name: 'Test' }]
 *
 * @example
 * // Multiple JSON-LD blocks
 * const html = '<script type="application/ld+json">{"@type":"Person"}</script>';
 * const data = extractStructuredData(html);
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is structured data size
 */
export function extractStructuredData(html: string): unknown[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const structuredData: unknown[] = [];
  const jsonLdRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1].trim());
      structuredData.push(data);
    } catch {
      // Skip invalid JSON
    }
  }

  return structuredData;
}
