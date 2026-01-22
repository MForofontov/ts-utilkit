/**
 * Validates if a string is a valid hexadecimal color code.
 * Supports 3-digit (#RGB) and 6-digit (#RRGGBB) formats, with optional alpha channel (#RRGGBBAA or #RGBA).
 *
 * @param color - The hex color string to validate.
 * @returns True if valid hex color, false otherwise.
 *
 * @throws {TypeError} If color is not a string.
 *
 * @example
 * // Valid 6-digit hex colors
 * isValidHexColor("#FF5733"); // true
 * isValidHexColor("#000000"); // true
 * isValidHexColor("#FFFFFF"); // true
 *
 * @example
 * // Valid 3-digit hex colors
 * isValidHexColor("#F00"); // true
 * isValidHexColor("#0F0"); // true
 * isValidHexColor("#abc"); // true
 *
 * @example
 * // Valid with alpha channel
 * isValidHexColor("#FF5733AA"); // true (8-digit)
 * isValidHexColor("#F00F"); // true (4-digit)
 *
 * @example
 * // Case insensitive
 * isValidHexColor("#ff5733"); // true
 * isValidHexColor("#FF5733"); // true
 *
 * @example
 * // Invalid formats
 * isValidHexColor("FF5733"); // false (missing #)
 * isValidHexColor("#FF57"); // false (invalid length)
 * isValidHexColor("#GGGGGG"); // false (invalid characters)
 * isValidHexColor("#12345"); // false (5 digits)
 *
 * @note Accepts formats: #RGB, #RRGGBB, #RGBA, #RRGGBBAA
 * @note Case-insensitive (accepts both uppercase and lowercase a-f)
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidHexColor(color: string): boolean {
  if (typeof color !== 'string') {
    throw new TypeError(`color must be a string, got ${typeof color}`);
  }

  // Regex for 3, 4, 6, or 8 digit hex colors with # prefix
  const hexColorRegex =
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

  return hexColorRegex.test(color);
}
