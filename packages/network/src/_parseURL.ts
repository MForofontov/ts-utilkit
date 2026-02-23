/**
 * Internal helper: parses a URL string into a `URL` object.
 * Validates that the input is a string and that the URL is well-formed.
 *
 * @param url - The URL string to parse.
 * @returns A `URL` object representing the parsed URL.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is not a valid URL.
 *
 * @internal This function is not part of the public API.
 */
export function _parseURL(url: string): URL {
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  try {
    return new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
