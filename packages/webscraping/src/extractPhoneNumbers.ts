/**
 * Extracts phone numbers from HTML content.
 *
 * @param html - The HTML content to extract phone numbers from.
 * @returns Array of unique phone numbers found.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<p>Call us: (555) 123-4567</p>';
 * const phones = extractPhoneNumbers(html);
 * // ['(555) 123-4567']
 *
 * @example
 * // From tel: links
 * const html = '<a href="tel:+15551234567">Call</a>';
 * const phones = extractPhoneNumbers(html);
 * // ['+15551234567']
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of phone numbers
 */
export function extractPhoneNumbers(html: string): string[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const phones = new Set<string>();

  // Extract from tel: links
  const telRegex = /href=["']tel:([^"']+)/gi;
  let match: RegExpExecArray | null;

  while ((match = telRegex.exec(html)) !== null) {
    phones.add(match[1]);
  }

  // Remove HTML tags to get plain text
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');

  // Extract phone numbers from text (various formats)
  const phonePatterns = [
    /\+\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g, // International: +1-555-123-4567
    /\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4}/g, // US: (555) 123-4567
    /\d{3}[-.\s]\d{3}[-.\s]\d{4}/g, // US: 555-123-4567
    /\d{10}/g, // Plain: 5551234567
  ];

  phonePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((phone) => {
        // Filter out sequences that are clearly not phone numbers
        if (!/^\d{10}$/.test(phone) || phone.startsWith('000')) {
          phones.add(phone);
        } else if (/^\d{10}$/.test(phone) && !phone.startsWith('000')) {
          phones.add(phone);
        }
      });
    }
  });

  return Array.from(phones);
}
