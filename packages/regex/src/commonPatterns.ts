/**
 * Common regex patterns for validation and extraction.
 */
export const CommonPatterns = {
  /**
   * Email address pattern (basic RFC 5322 compliant).
   */
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /**
   * URL pattern (HTTP/HTTPS).
   */
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,

  /**
   * IPv4 address pattern.
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  /**
   * IPv6 address pattern (simplified).
   */
  ipv6: /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,

  /**
   * UUID pattern (v4).
   */
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  /**
   * Hexadecimal color code (#RGB or #RRGGBB).
   */
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  /**
   * Credit card number pattern (basic, spaces/dashes optional).
   */
  creditCard: /^(?:\d{4}[-\s]?){3}\d{4}$/,

  /**
   * US ZIP code (5 or 9 digits).
   */
  zipCodeUS: /^\d{5}(-\d{4})?$/,

  /**
   * ISO 8601 date format (YYYY-MM-DD).
   */
  isoDate: /^\d{4}-\d{2}-\d{2}$/,

  /**
   * ISO 8601 datetime format.
   */
  isoDateTime:
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?$/,

  /**
   * Alphanumeric characters only.
   */
  alphanumeric: /^[a-zA-Z0-9]+$/,

  /**
   * Username pattern (letters, numbers, underscore, hyphen, 3-16 chars).
   */
  username: /^[a-zA-Z0-9_-]{3,16}$/,

  /**
   * Strong password (min 8 chars, uppercase, lowercase, number, special char).
   */
  strongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  /**
   * HTML tag pattern.
   */
  htmlTag: /<\/?[\w\s="/.':;#-\/]+>/,

  /**
   * Slug pattern (URL-friendly string).
   */
  slug: /^[a-z0-9_-]+$/i,

  /**
   * MAC address pattern.
   */
  macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,

  /**
   * Semantic version pattern (e.g., 1.2.3).
   */
  semver:
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
};

/**
 * Gets a common regex pattern by name.
 *
 * @param patternName - Name of the pattern to retrieve.
 * @returns The RegExp pattern.
 *
 * @throws {Error} If pattern name is not recognized.
 *
 * @example
 * // Get email pattern
 * const emailRegex = getCommonPattern('email');
 * emailRegex.test("test@example.com"); // true
 *
 * @example
 * // Get URL pattern
 * const urlRegex = getCommonPattern('url');
 * urlRegex.test("https://example.com"); // true
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getCommonPattern(
  patternName: keyof typeof CommonPatterns,
): RegExp {
  if (typeof patternName !== 'string') {
    throw new TypeError(`name must be a string, got ${typeof patternName}`);
  }
  
  if (!(patternName in CommonPatterns)) {
    throw new Error(
      `Unknown pattern name: ${patternName}. Available patterns: ${Object.keys(CommonPatterns).join(', ')}`,
    );
  }

  return CommonPatterns[patternName];
}

/**
 * Tests if a string matches a common pattern.
 *
 * @param text - The text to test.
 * @param patternName - Name of the common pattern.
 * @returns True if text matches the pattern, false otherwise.
 *
 * @throws {TypeError} If text is not a string.
 * @throws {Error} If pattern name is not recognized.
 *
 * @example
 * // Test email
 * testCommonPattern("user@example.com", "email"); // true
 * testCommonPattern("invalid-email", "email"); // false
 *
 * @example
 * // Test URL
 * testCommonPattern("https://google.com", "url"); // true
 *
 * @complexity Time: O(n), Space: O(1) where n is text length
 */
export function testCommonPattern(
  text: string,
  patternName: keyof typeof CommonPatterns,
): boolean {
  if (typeof text !== 'string') {
    throw new TypeError(`text must be a string, got ${typeof text}`);
  }
  
  if (typeof patternName !== 'string') {
    throw new TypeError(`name must be a string, got ${typeof patternName}`);
  }

  const pattern = getCommonPattern(patternName);
  return pattern.test(text);
}
