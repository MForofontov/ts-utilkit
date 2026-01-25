/**
 * Sanitizes a URL to prevent XSS and other security issues.
 * Blocks dangerous protocols like javascript:, data:, vbscript:.
 *
 * @param url - The URL to sanitize.
 * @param allowedProtocols - Optional array of allowed protocols (default: ['http', 'https', 'mailto', 'tel']).
 * @returns The sanitized URL if safe, otherwise throws an error.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {TypeError} If allowedProtocols is provided but not an array.
 * @throws {Error} If URL uses a dangerous or disallowed protocol.
 * @throws {Error} If URL is invalid.
 *
 * @example
 * // Safe URL
 * sanitizeURL('https://example.com');
 * // Returns: 'https://example.com/'
 *
 * @example
 * // Dangerous URL (throws error)
 * sanitizeURL('javascript:alert("XSS")');
 * // Throws: Error: Dangerous protocol detected: javascript
 *
 * @example
 * // Custom allowed protocols
 * sanitizeURL('ftp://example.com', ['ftp', 'http', 'https']);
 * // Returns: 'ftp://example.com/'
 *
 * @note Always validates against a whitelist of safe protocols.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function sanitizeURL(
  url: string,
  allowedProtocols: string[] = ['http', 'https', 'mailto', 'tel'],
): string {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  if (!Array.isArray(allowedProtocols)) {
    throw new TypeError(
      `allowedProtocols must be an array, got ${typeof allowedProtocols}`,
    );
  }

  // List of dangerous protocols
  const dangerousProtocols = [
    'javascript',
    'data',
    'vbscript',
    'file',
    'about',
  ];

  try {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol.replace(':', '').toLowerCase();

    // Check for dangerous protocols (but allow if explicitly whitelisted)
    if (
      dangerousProtocols.includes(protocol) &&
      !allowedProtocols.includes(protocol)
    ) {
      throw new Error('URL contains dangerous protocol');
    }

    // Check if protocol is in allowed list
    if (!allowedProtocols.includes(protocol)) {
      throw new Error('URL protocol not in whitelist');
    }

    return urlObj.toString();
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.startsWith('URL contains') ||
        error.message.startsWith('URL protocol'))
    ) {
      throw error;
    }
    throw new Error(`Invalid URL: ${url}`);
  }
}
