/**
 * Normalizes a URL by applying various standardization rules.
 * Removes trailing slashes, converts to lowercase, sorts query parameters, etc.
 *
 * @param url - The URL string to normalize.
 * @param options - Optional normalization options.
 * @returns A normalized URL string.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {TypeError} If options is provided but not an object.
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Remove trailing slash
 * normalizeURL('https://example.com/path/'); // 'https://example.com/path'
 *
 * @example
 * // Sort query parameters
 * normalizeURL('https://example.com?z=1&a=2'); // 'https://example.com?a=2&z=1'
 *
 * @example
 * // With custom options
 * normalizeURL('HTTPS://EXAMPLE.COM/Path', { lowercaseHostname: false });
 * // 'https://EXAMPLE.COM/Path'
 *
 * @note Helps with URL comparison and caching.
 *
 * @complexity Time: O(n log n), Space: O(n)
 */
export interface NormalizeOptions {
  /** Remove trailing slashes from pathname (default: true) */
  removeTrailingSlash?: boolean;
  /** Convert hostname to lowercase (default: true) */
  lowercaseHostname?: boolean;
  /** Sort query parameters alphabetically (default: true) */
  sortQueryParams?: boolean;
  /** Remove default ports (80 for http, 443 for https) (default: true) */
  removeDefaultPorts?: boolean;
  /** Remove empty query parameters (default: true) */
  removeEmptyParams?: boolean;
}

export function normalizeURL(
  url: string,
  options: NormalizeOptions = {},
): string {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  if (typeof options !== 'object' || options === null) {
    throw new TypeError(`options must be an object, got ${typeof options}`);
  }

  // Set defaults
  const opts: Required<NormalizeOptions> = {
    removeTrailingSlash: options.removeTrailingSlash ?? true,
    lowercaseHostname: options.lowercaseHostname ?? true,
    sortQueryParams: options.sortQueryParams ?? true,
    removeDefaultPorts: options.removeDefaultPorts ?? true,
    removeEmptyParams: options.removeEmptyParams ?? true,
  };

  try {
    const parsed = new URL(url);

    // Lowercase hostname
    if (opts.lowercaseHostname) {
      parsed.hostname = parsed.hostname.toLowerCase();
    }

    // Remove default ports
    if (opts.removeDefaultPorts) {
      if (
        (parsed.protocol === 'http:' && parsed.port === '80') ||
        (parsed.protocol === 'https:' && parsed.port === '443')
      ) {
        parsed.port = '';
      }
    }

    // Remove trailing slash from pathname
    if (opts.removeTrailingSlash && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.replace(/\/$/, '') || '/';
    }

    // Handle query parameters
    if (parsed.search) {
      const params = new URLSearchParams(parsed.search);

      // Remove empty parameters
      if (opts.removeEmptyParams) {
        const keysToDelete: string[] = [];
        params.forEach((value, key) => {
          if (value === '') {
            keysToDelete.push(key);
          }
        });
        keysToDelete.forEach((key) => params.delete(key));
      }

      // Sort query parameters
      if (opts.sortQueryParams) {
        const sortedParams = new URLSearchParams();
        const keys = Array.from(params.keys()).sort();
        keys.forEach((key) => {
          const values = params.getAll(key);
          values.forEach((value) => sortedParams.append(key, value));
        });
        parsed.search = sortedParams.toString();
      } else {
        parsed.search = params.toString();
      }
    }

    return parsed.toString();
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
