/**
 * Interface representing parsed URL components.
 */
export interface ParsedURL {
  /** The protocol scheme (e.g., 'http', 'https', 'ftp') */
  protocol: string;
  /** The hostname or IP address */
  hostname: string;
  /** The port number (if specified) */
  port: string;
  /** The path component */
  pathname: string;
  /** The query string (without leading '?') */
  search: string;
  /** The fragment identifier (without leading '#') */
  hash: string;
  /** The full host (hostname:port) */
  host: string;
  /** The origin (protocol://host) */
  origin: string;
  /** The full URL */
  href: string;
}

/**
 * Parses a URL string into its component parts.
 * Extracts protocol, hostname, port, path, query string, and hash fragment.
 *
 * @param url - The URL string to parse.
 * @returns An object containing all URL components.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is invalid or cannot be parsed.
 *
 * @example
 * // Basic HTTP URL
 * parseURL('https://example.com:8080/path?query=value#hash');
 * // Returns: { protocol: 'https:', hostname: 'example.com', port: '8080', ... }
 *
 * @example
 * // URL without port
 * parseURL('http://example.com/api/users');
 * // Returns: { protocol: 'http:', hostname: 'example.com', port: '', ... }
 *
 * @example
 * // URL with query parameters and hash
 * parseURL('https://api.example.com/search?q=test&limit=10#results');
 * // Returns: { search: 'q=test&limit=10', hash: 'results', ... }
 *
 * @note Uses the built-in URL API for robust parsing.
 * @note Port is an empty string if not specified in the URL.
 * @note Query string does not include the leading '?' character.
 * @note Hash fragment does not include the leading '#' character.
 * @note Throws an error for malformed URLs (e.g., missing protocol).
 *
 * @complexity Time: O(n), Space: O(n) - Where n is URL length
 */
export function parseURL(url: string): ParsedURL {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }

  try {
    const parsed = new URL(url);

    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search.replace(/^\?/, ''),
      hash: parsed.hash.replace(/^#/, ''),
      host: parsed.host,
      origin: parsed.origin,
      href: parsed.href,
    };
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
