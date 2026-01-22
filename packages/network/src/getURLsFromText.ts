/**
 * Extracts all URLs from a text string.
 * Finds URLs with http://, https://, and optionally other protocols.
 *
 * @param text - The text to search for URLs.
 * @param options - Optional configuration for URL extraction.
 * @returns Array of unique URLs found in the text.
 *
 * @throws {TypeError} If text is not a string.
 *
 * @example
 * // Basic extraction
 * getURLsFromText('Visit https://example.com and http://test.com');
 * // Returns: ['https://example.com', 'http://test.com']
 *
 * @example
 * // With duplicates
 * getURLsFromText('Check https://example.com twice: https://example.com');
 * // Returns: ['https://example.com']
 *
 * @example
 * // No URLs
 * getURLsFromText('No links here');
 * // Returns: []
 *
 * @note Returns unique URLs only (no duplicates).
 *
 * @complexity Time: O(n), Space: O(m) where m is number of URLs
 */
export interface URLExtractionOptions {
  /** Whether to include URLs without http/https (default: false) */
  includeWWW?: boolean;
  /** Whether to return unique URLs only (default: true) */
  unique?: boolean;
}

export function getURLsFromText(
  text: string,
  options: URLExtractionOptions = {},
): string[] {
  // Input validation
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }

  const { includeWWW = true, unique = true } = options;

  // Regex pattern for URLs - matches http://, https://, ftp://, and www. URLs
  // More restrictive to avoid capturing trailing punctuation
  const urlPattern = includeWWW
    ? /(?:(?:https?|ftp):\/\/|www\.)[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+[a-zA-Z0-9\-_~:/?#[\]@!$&*+=%]/gi
    : /(?:https?|ftp):\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+[a-zA-Z0-9\-_~:/?#[\]@!$&*+=%]/gi;

  const matches = text.match(urlPattern);

  if (!matches) {
    return [];
  }

  // Process URLs
  const urls = matches.map((url) => {
    // Remove trailing punctuation that's likely not part of the URL
    const cleanUrl = url.replace(/[,)\s]+$/, '');

    // Add protocol to www. URLs if needed
    if (cleanUrl.startsWith('www.') && !cleanUrl.startsWith('http')) {
      return `https://${cleanUrl}`;
    }
    return cleanUrl;
  });

  // Remove duplicates if requested
  if (unique) {
    return [...new Set(urls)];
  }

  return urls;
}
