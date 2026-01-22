/**
 * RGB color representation.
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Generates a random RGB color.
 *
 * @returns An RGB object with random r, g, b values (0-255).
 *
 * @example
 * // Generate random RGB color
 * randomRGB(); // { r: 142, g: 68, b: 219 }
 *
 * @example
 * // Use in CSS
 * const color = randomRGB();
 * const css = `rgb(${color.r}, ${color.g}, ${color.b})`;
 * // 'rgb(142, 68, 219)'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomRGB(): RGB {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}
