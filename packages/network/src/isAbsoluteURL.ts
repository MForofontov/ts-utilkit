/**
 * Determines whether a URL string is absolute (has a scheme/protocol).
 * An absolute URL can be parsed without a base URL and contains a scheme
 * such as "https:", "http:", "ftp:", "mailto:", etc.
 *
 * @param url - The URL string to test.
 * @returns `true` if the URL is absolute (has a scheme), `false` otherwise.
 *
 * @example
 * // Absolute URLs
 * isAbsoluteURL('https://example.com/path');  // true
 * isAbsoluteURL('http://localhost:3000');      // true
 * isAbsoluteURL('ftp://files.example.com');   // true
 * isAbsoluteURL('mailto:user@example.com');   // true
 *
 * @example
 * // Relative URLs
 * isAbsoluteURL('/path/to/page');   // false
 * isAbsoluteURL('./relative');       // false
 * isAbsoluteURL('?query=1');         // false
 * isAbsoluteURL('#fragment');        // false
 * isAbsoluteURL('//example.com');   // false (protocol-relative, needs base)
 *
 * @note Uses the built-in URL constructor. A URL that can be parsed without
 * a base is considered absolute. Protocol-relative URLs (`//example.com`)
 * are treated as relative because they require a base to resolve the scheme.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function isAbsoluteURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
