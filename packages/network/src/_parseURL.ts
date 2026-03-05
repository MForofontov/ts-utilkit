/**
 * Internal helper: parses a URL string into a `URL` object.
 * Validates that the input is a string and that the URL is well-formed.
 *
 * @param url - The URL string to parse.
 * @returns A `URL` object representing the parsed URL.
 *
 * @throws {Error} If url is not a valid URL.
 *
 * @internal This function is not part of the public API.
 */
export function _parseURL(url: string): URL {
  try {
    return new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
