/**
 * Interface representing URL components for building a URL.
 */
export interface URLComponents {
  /** The protocol scheme (e.g., 'http', 'https') without colon */
  protocol: string;
  /** The hostname or IP address */
  hostname: string;
  /** Optional port number */
  port?: number | string;
  /** Optional path component (with or without leading slash) */
  pathname?: string;
  /** Optional query parameters as object */
  query?: Record<string, string | number | boolean | string[]>;
  /** Optional fragment identifier (with or without leading #) */
  hash?: string;
}

/**
 * Builds a complete URL from component parts.
 * Handles query parameter encoding and proper URL formatting.
 *
 * @param components - An object containing URL components.
 * @returns A properly formatted URL string.
 *
 * @throws {TypeError} If components is not an object.
 * @throws {TypeError} If required components (protocol, hostname) are not strings.
 * @throws {Error} If required components are missing.
 *
 * @example
 * // Basic URL
 * buildURL({ protocol: 'https', hostname: 'example.com', pathname: '/api' });
 * // Returns: 'https://example.com/api'
 *
 * @example
 * // With port and query parameters
 * buildURL({
 *   protocol: 'http',
 *   hostname: 'localhost',
 *   port: 8080,
 *   pathname: '/search',
 *   query: { q: 'test', page: 1 }
 * });
 * // Returns: 'http://localhost:8080/search?q=test&page=1'
 *
 * @example
 * // With hash fragment
 * buildURL({
 *   protocol: 'https',
 *   hostname: 'example.com',
 *   pathname: '/page',
 *   hash: 'section'
 * });
 * // Returns: 'https://example.com/page#section'
 *
 * @note Automatically encodes query parameter values.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function buildURL(components: URLComponents): string {
  // Input validation
  if (typeof components !== 'object' || components === null) {
    throw new TypeError(
      `components must be an object, got ${typeof components}`,
    );
  }
  if (typeof components.protocol !== 'string') {
    throw new TypeError(
      `protocol must be a string, got ${typeof components.protocol}`,
    );
  }
  if (typeof components.hostname !== 'string') {
    throw new TypeError(
      `hostname must be a string, got ${typeof components.hostname}`,
    );
  }

  let url = `${components.protocol}://${components.hostname}`;

  // Add port if specified
  if (components.port) {
    url += `:${components.port}`;
  }

  // Add pathname
  if (components.pathname) {
    const pathname = components.pathname.startsWith('/')
      ? components.pathname
      : `/${components.pathname}`;
    url += pathname;
  }

  // Add query parameters
  if (components.query && Object.keys(components.query).length > 0) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(components.query)) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, String(v)));
      } else {
        queryParams.append(key, String(value));
      }
    }
    url += `?${queryParams.toString()}`;
  }

  // Add hash
  if (components.hash) {
    const hash = components.hash.startsWith('#')
      ? components.hash
      : `#${components.hash}`;
    url += hash;
  }

  return url;
}
