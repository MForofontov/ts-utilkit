/**
 * Validates if a string is a valid URL with optional scheme restrictions.
 *
 * @param url - The URL string to validate.
 * @param allowedSchemes - Optional array of allowed URL schemes (e.g., ['http', 'https']). If not provided, all schemes are allowed.
 * @returns True if the URL is valid and matches allowed schemes, false otherwise.
 *
 * @example
 * // Basic validation
 * isValidURL('https://example.com'); // true
 *
 * @example
 * // Invalid URL
 * isValidURL('not a url'); // false
 *
 * @example
 * // With scheme restriction
 * isValidURL('https://example.com', ['http', 'https']); // true
 * isValidURL('ftp://example.com', ['http', 'https']); // false
 *
 * @note Uses the built-in URL API for validation.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function isValidURL(url: string, allowedSchemes?: string[]): boolean {
  // Input validation

  try {
    const parsed = new URL(url);

    // If no allowed schemes specified, any valid URL is acceptable
    if (!allowedSchemes || allowedSchemes.length === 0) {
      return true;
    }

    // Check if the scheme (without colon) is in allowed list
    const scheme = parsed.protocol.replace(/:$/, '');
    return allowedSchemes.includes(scheme);
  } catch {
    return false;
  }
}
