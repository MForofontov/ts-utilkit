/**
 * Converts a hexadecimal color code to an RGB object.
 *
 * @param hex - The hex color string (with or without '#' prefix, must be 6 digits).
 * @returns An object with red, green, and blue values (0-255), or null if the input is invalid.
 *
 * @throws {TypeError} If hex is not a string.
 *
 * @example
 * // Basic usage with hash prefix
 * hexToRgb('#ff5733'); // { r: 255, g: 87, b: 51 }
 * hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
 *
 * @example
 * // Without hash prefix
 * hexToRgb('ff5733'); // { r: 255, g: 87, b: 51 }
 * hexToRgb('0000ff'); // { r: 0, g: 0, b: 255 }
 *
 * @example
 * // Case insensitive
 * hexToRgb('#FF5733'); // { r: 255, g: 87, b: 51 }
 * hexToRgb('#AaBbCc'); // { r: 170, g: 187, b: 204 }
 *
 * @example
 * // Invalid formats return null
 * hexToRgb('invalid'); // null
 * hexToRgb('#12345'); // null (only 5 digits)
 * hexToRgb('#1234567'); // null (7 digits)
 * hexToRgb(''); // null
 *
 * @note The '#' prefix is optional and will be automatically removed.
 * @note Requires exactly 6 hexadecimal digits (0-9, a-f, A-F).
 * @note Case-insensitive: accepts both uppercase and lowercase hex digits.
 * @note Returns null for invalid hex codes instead of throwing errors.
 * @note RGB values are always in the range [0, 255].
 * @note Does not support 3-digit shorthand hex codes (e.g., #abc).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const hexValue = hex.replace(/^#/, '');
  if (!/^[\da-fA-F]{6}$/.test(hexValue)) return null;

  const bigint = parseInt(hexValue, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
