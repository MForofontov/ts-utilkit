import { _parseURL } from './_parseURL';

/**
 * Normalizes a URL by applying various standardization rules.
 * Removes trailing slashes, converts to lowercase, sorts query parameters, etc.
 *
 * @param url - The URL string to normalize.
 * @param options - Optional normalization options.
 * @returns A normalized URL string.
 *
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Remove trailing slash
 * normalizeURL('https://example.com/path/'); // 'https://example.com/path'
 *
 * @example
 * // Sort query parameters
 * normalizeURL('https://example.com?z=1&a=2'); // 'https://example.com/?a=2&z=1'
 *
 * @example
 * // With custom options
 * normalizeURL('HTTPS://EXAMPLE.COM/Path', { lowercaseHostname: false });
 * // 'https://example.com/Path' (URL itself canonicalizes the hostname)
 *
 * @note Helps with URL comparison and caching.
 * @note Empty entries are removed individually; repeated non-empty values keep their order.
 * @note Hostname and default-port canonicalization performed by URL cannot be disabled.
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
  /** Legacy flag: URL canonicalizes default HTTP(S) ports regardless of this value. */
  removeDefaultPorts?: boolean;
  /** Remove empty query parameters (default: true) */
  removeEmptyParams?: boolean;
}

export function normalizeURL(
  url: string,
  options: NormalizeOptions = {},
): string {
  // Set defaults
  const opts: Required<NormalizeOptions> = {
    removeTrailingSlash: options.removeTrailingSlash ?? true,
    lowercaseHostname: options.lowercaseHostname ?? true,
    sortQueryParams: options.sortQueryParams ?? true,
    removeDefaultPorts: options.removeDefaultPorts ?? true,
    removeEmptyParams: options.removeEmptyParams ?? true,
  };

  const parsed = _parseURL(url);

  // Lowercase hostname
  if (opts.lowercaseHostname) {
    parsed.hostname = parsed.hostname.toLowerCase();
  }

  // Default HTTP(S) ports are already canonicalized by URL.

  // Remove trailing slash from pathname
  if (opts.removeTrailingSlash && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.replace(/\/$/, '') || '/';
  }

  // Handle query parameters
  if (parsed.search) {
    let params = new URLSearchParams(parsed.search);

    // Filter entries without discarding other values of the same key.
    if (opts.removeEmptyParams) {
      let hasEmpty = false;
      params.forEach((value) => {
        if (value === '') hasEmpty = true;
      });
      if (hasEmpty) {
        const nonEmpty = new URLSearchParams();
        params.forEach((value, key) => {
          if (value !== '') nonEmpty.append(key, value);
        });
        params = nonEmpty;
      }
    }

    // Native sorting is stable for repeated keys and compares UTF-16 code units.
    if (opts.sortQueryParams) params.sort();
    parsed.search = params.toString();
  }

  return parsed.toString();
}
