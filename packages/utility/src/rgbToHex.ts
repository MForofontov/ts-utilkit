/**
 * Converts an RGB color object to a hexadecimal color code.
 *
 * @param rgb - The object containing red (r), green (g), and blue (b) values (0-255).
 * @returns The hexadecimal color string in the format #RRGGBB (lowercase).
 *
 * @example
 * // Basic usage
 * rgbToHex({ r: 255, g: 87, b: 51 }); // '#ff5733'
 *
 * @example
 * // Edge cases with clamping
 * rgbToHex({ r: 300, g: -10, b: 128 }); // '#ff0080' (values clamped to 0-255)
 *
 * @example
 * // Black and white
 * rgbToHex({ r: 0, g: 0, b: 0 }); // '#000000'
 * rgbToHex({ r: 255, g: 255, b: 255 }); // '#ffffff'
 *
 * @note Values are automatically clamped to the valid range (0-255) and rounded to integers.
 * @note Output is always lowercase hexadecimal with leading '#'.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  const clamp = (num: number) => Math.min(255, Math.max(0, Math.round(num)));
  const toHex = (num: number) => clamp(num).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
