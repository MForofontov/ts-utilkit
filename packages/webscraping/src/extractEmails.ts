/**
 * Extracts email addresses from HTML content.
 *
 * @param html - The HTML content to extract emails from.
 * @returns Array of unique email addresses found.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<p>Contact: test@example.com</p>';
 * const emails = extractEmails(html);
 * // ['test@example.com']
 *
 * @example
 * // From mailto links
 * const html = '<a href="mailto:support@example.com">Email us</a>';
 * const emails = extractEmails(html);
 * // ['support@example.com']
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of emails
 */
export function extractEmails(html: string): string[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const emails = new Set<string>();

  // Extract from mailto: links
  const mailtoRegex = /href=["']mailto:([^"'?]+)/gi;
  let match: RegExpExecArray | null;

  while ((match = mailtoRegex.exec(html)) !== null) {
    emails.add(match[1].toLowerCase());
  }

  // Remove HTML tags to get plain text
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');

  // Extract emails from text content
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const textMatches = text.match(emailRegex);

  if (textMatches) {
    textMatches.forEach((email) => emails.add(email.toLowerCase()));
  }

  return Array.from(emails);
}
