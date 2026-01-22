/**
 * Checks if a URL or hostname represents localhost or a local address.
 * Supports various localhost formats including IPv4, IPv6, and hostnames.
 *
 * @param urlOrHostname - A URL string or hostname to check.
 * @returns True if the URL/hostname represents localhost, false otherwise.
 *
 * @throws {TypeError} If urlOrHostname is not a string.
 *
 * @example
 * // Hostname checks
 * isLocalhost('localhost'); // true
 * isLocalhost('127.0.0.1'); // true
 * isLocalhost('::1'); // true
 *
 * @example
 * // Full URL checks
 * isLocalhost('http://localhost:3000'); // true
 * isLocalhost('https://127.0.0.1:8080'); // true
 *
 * @example
 * // Non-localhost
 * isLocalhost('example.com'); // false
 * isLocalhost('https://example.com'); // false
 *
 * @note Checks common localhost patterns including 127.x.x.x range.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isLocalhost(urlOrHostname: string): boolean {
  // Input validation
  if (typeof urlOrHostname !== 'string') {
    throw new TypeError(
      `urlOrHostname must be a string, got ${typeof urlOrHostname}`,
    );
  }

  let hostname = urlOrHostname;

  // Try to parse as URL first
  try {
    const parsed = new URL(urlOrHostname);
    hostname = parsed.hostname;
  } catch {
    // Not a valid URL, treat as hostname
    hostname = urlOrHostname;
  }

  // Normalize to lowercase for comparison
  hostname = hostname.toLowerCase();

  // Check for localhost patterns
  const localhostPatterns = [
    'localhost',
    '127.0.0.1',
    '::1',
    '[::1]', // IPv6 with brackets
    '0.0.0.0',
  ];

  // Check exact matches
  if (localhostPatterns.includes(hostname)) {
    return true;
  }

  // Check for 127.x.x.x range (IPv4 loopback)
  const ipv4LoopbackRegex = /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipv4LoopbackRegex.test(hostname)) {
    return true;
  }

  // Check for [::1] variant and other IPv6 loopback notations
  if (hostname.startsWith('[::') && hostname.endsWith(']')) {
    return true;
  }

  return false;
}
