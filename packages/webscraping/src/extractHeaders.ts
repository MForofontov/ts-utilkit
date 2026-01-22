/**
 * Interface for extracted header data.
 */
export interface HeaderData {
  level: number;
  text: string;
  id?: string;
}

/**
 * Extracts all heading tags (H1-H6) from HTML content.
 *
 * @param html - The HTML content to extract headers from.
 * @param includeAttributes - Whether to include id attributes (default: true).
 * @returns Array of header objects with level, text, and optional id.
 *
 * @throws {TypeError} If html is not a string.
 * @throws {TypeError} If includeAttributes is not a boolean.
 *
 * @example
 * const html = '<h1>Title</h1><h2 id="section">Section</h2>';
 * const headers = extractHeaders(html);
 * // [{ level: 1, text: 'Title' }, { level: 2, text: 'Section', id: 'section' }]
 *
 * @example
 * // Without attributes
 * const headers = extractHeaders(html, false);
 * // [{ level: 1, text: 'Title' }, { level: 2, text: 'Section' }]
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of headers
 */
export function extractHeaders(
  html: string,
  includeAttributes: boolean = true,
): HeaderData[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }
  if (typeof includeAttributes !== 'boolean') {
    throw new TypeError(
      `includeAttributes must be a boolean, got ${typeof includeAttributes}`,
    );
  }

  const headers: HeaderData[] = [];
  const headerRegex = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = headerRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const attributes = match[2];
    let text = match[3];

    // Remove nested tags and clean up text
    text = text.replace(/<[^>]+>/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
    text = text.replace(/\s+/g, ' ').trim();

    const header: HeaderData = { level, text };

    if (includeAttributes) {
      const idMatch = /id=["']([^"']+)["']/i.exec(attributes);
      if (idMatch) {
        header.id = idMatch[1];
      }
    }

    headers.push(header);
  }

  return headers;
}
