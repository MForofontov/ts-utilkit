import { _parseURL } from './_parseURL';

/**
 * Checks if two URLs have the same origin (protocol + host + port).
 * Useful for CORS and security checks.
 *
 * @param url1 - The first URL to compare.
 * @param url2 - The second URL to compare.
 * @returns True if both URLs have the same origin, false otherwise.
 *
 * @throws {Error} If either URL is invalid.
 *
 * @example
 * // Same origin
 * isSameOrigin('https://example.com/page1', 'https://example.com/page2');
 * // Returns: true
 *
 * @example
 * // Different paths, same origin
 * isSameOrigin('https://example.com:443/a', 'https://example.com/b');
 * // Returns: true
 *
 * @example
 * // Different protocol
 * isSameOrigin('http://example.com', 'https://example.com');
 * // Returns: false
 *
 * @example
 * // Different subdomain
 * isSameOrigin('https://api.example.com', 'https://www.example.com');
 * // Returns: false
 *
 * @note Origin includes protocol, hostname, and port.
 *
 * @complexity Time: O(1), Space: O(1)
 */

export function isSameOrigin(url1: string, url2: string): boolean {
  // _parseURL validates type and throws TypeError/Error for each URL.
  // For isSameOrigin we provide a combined error message on failure.

  try {
    const urlObj1 = _parseURL(url1);
    const urlObj2 = _parseURL(url2);
    return urlObj1.origin === urlObj2.origin;
  } catch {
    throw new Error(`Invalid URL(s): ${url1}, ${url2}`);
  }
}
