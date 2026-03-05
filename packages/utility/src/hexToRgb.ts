/**
 * Converts a hexadecimal color code to an RGB object.
 *
 * @param hex - The hex color string (with or without '#' prefix, must be 6 digits).
 * @returns An object with red, green, and blue values (0-255), or null if the input is invalid.
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
