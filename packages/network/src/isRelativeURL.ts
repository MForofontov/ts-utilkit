/**
 * Determines whether a URL string is relative (has no scheme/protocol).
 * A relative URL requires a base URL to be resolved and includes paths
 * starting with "/", "./", "../", or bare relative paths, as well as
 * query strings and fragment references.
 *
 * @param url - The URL string to test.
 * @returns `true` if the URL is a valid relative reference, `false` otherwise.
 *
 * @throws {TypeError} If url is not a string.
 *
 * @example
 * // Relative paths
 * isRelativeURL('/path/to/page');    // true
 * isRelativeURL('./relative/path');  // true
 * isRelativeURL('../parent/page');   // true
 * isRelativeURL('page.html');        // true
 *
 * @example
 * // Query strings, fragments, and protocol-relative URLs
 * isRelativeURL('?query=value');     // true
 * isRelativeURL('#section');         // true
 * isRelativeURL('//example.com');   // true (protocol-relative)
 *
 * @example
 * // Absolute URLs return false
 * isRelativeURL('https://example.com');  // false
 * isRelativeURL('mailto:a@b.com');       // false
 * isRelativeURL('ftp://files.host.com'); // false
 *
 * @note A URL is relative if it cannot be parsed by itself (no scheme) but
 * can be resolved against a base URL. Protocol-relative URLs (`//example.com`)
 * are classified as relative because they require a base to resolve the scheme.
 * Invalid URL strings that cannot be resolved even with a base return `false`.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function isRelativeURL(url: string): boolean {
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  // If it can be parsed without a base, it's absolute
  try {
    new URL(url);
    return false;
  } catch {
    // Not absolute — check if it's a valid relative reference
    try {
      new URL(url, 'https://example.com');
      return true;
    } catch {
      return false;
    }
  }
}
