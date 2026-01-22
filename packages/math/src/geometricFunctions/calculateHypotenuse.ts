/**
 * Calculates the hypotenuse of a right triangle given the lengths of the other two sides.
 * Uses the Pythagorean theorem: c² = a² + b²
 *
 * @param a - The length of one side of the right triangle.
 * @param b - The length of the other side of the right triangle.
 * @returns The length of the hypotenuse.
 *
 * @throws {Error} If side lengths are NaN.
 * @throws {Error} If side lengths are negative.
 *
 * @example
 * // Classic 3-4-5 right triangle
 * calculateHypotenuse(3, 4); // 5
 *
 * @example
 * // Isosceles right triangle (45-45-90)
 * calculateHypotenuse(1, 1); // ~1.414 (√2)
 *
 * @example
 * // Larger triangle
 * calculateHypotenuse(5, 12); // 13
 *
 * @example
 * // Decimal sides
 * calculateHypotenuse(2.5, 6.0); // ~6.5
 *
 * @example
 * // Real-world: Calculate diagonal screen size
 * const screenWidth = 16; // inches
 * const screenHeight = 9; // inches
 * const diagonalSize = calculateHypotenuse(screenWidth, screenHeight); // ~18.36 inches
 *
 * @note Formula: c = √(a² + b²) (Pythagorean theorem)
 * @note The hypotenuse is always the longest side of a right triangle.
 * @note Both input sides must be from a right triangle (one 90° angle).
 * @note Result units match input units (e.g., meters → meters).
 * @note Common use cases: distance calculations, screen sizes, construction measurements.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateHypotenuse(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Side lengths must be numbers');
  }
  if (a < 0 || b < 0) {
    throw new Error('Side lengths must be non-negative numbers');
  }
  return Math.sqrt(a * a + b * b);
}
