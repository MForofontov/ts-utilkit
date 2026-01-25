/**
 * Picks a random color from a predefined palette.
 *
 * @param palette - Array of color codes (hex, rgb, or named colors).
 * @returns A random color from the palette.
 *
 * @throws {TypeError} If palette is not an array.
 * @throws {Error} If palette is empty.
 * @throws {Error} If any palette item is not a string.
 *
 * @example
 * // Pick from material design colors
 * const palette = ['#F44336', '#E91E63', '#9C27B0', '#673AB7'];
 * randomColorFromPalette(palette); // '#9C27B0'
 *
 * @example
 * // Pick from named colors
 * randomColorFromPalette(['red', 'blue', 'green', 'yellow']); // 'blue'
 *
 * @example
 * // Pick from RGB colors
 * randomColorFromPalette(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)']);
 * // 'rgb(0,255,0)'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomColorFromPalette(palette: string[]): string {
  if (!Array.isArray(palette)) {
    throw new TypeError(`palette must be an array, got ${typeof palette}`);
  }
  if (palette.length === 0) {
    throw new Error('palette cannot be empty');
  }

  // Validate palette items
  for (let i = 0; i < palette.length; i++) {
    if (typeof palette[i] !== 'string') {
      throw new Error(
        `All palette items must be strings, got ${typeof palette[i]} at index ${i}`,
      );
    }
  }

  const randomIndex = Math.floor(Math.random() * palette.length);
  return palette[randomIndex];
}
