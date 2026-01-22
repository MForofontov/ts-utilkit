/**
 * Calculates the area of a trapezoid given the lengths of its two bases and its height.
 *
 * @param base1 - The length of the first parallel base.
 * @param base2 - The length of the second parallel base.
 * @param height - The perpendicular height between the two bases.
 * @returns The area of the trapezoid in square units.
 *
 * @throws {Error} If base1, base2, or height is NaN.
 * @throws {Error} If base1, base2, or height is negative.
 *
 * @example
 * // Basic trapezoid
 * calculateTrapezoidArea(5, 7, 3); // 18
 *
 * @example
 * // Equal bases (becomes rectangle)
 * calculateTrapezoidArea(10, 10, 4); // 40
 *
 * @example
 * // Wide top, narrow bottom
 * calculateTrapezoidArea(12, 6, 5); // 45
 *
 * @example
 * // Decimal measurements
 * calculateTrapezoidArea(8.5, 5.5, 3.2); // 22.4
 *
 * @example
 * // Real-world: Calculate garden bed area
 * const topWidth = 4; // meters
 * const bottomWidth = 6; // meters
 * const bedHeight = 3; // meters
 * const area = calculateTrapezoidArea(topWidth, bottomWidth, bedHeight); // 15 m²
 *
 * @note Formula: A = (1/2) × (base1 + base2) × height
 * @note The two bases must be parallel to each other.
 * @note When base1 = base2, the trapezoid becomes a rectangle.
 * @note The height must be perpendicular to both bases.
 * @note Result units are square (e.g., cm → cm², m → m²).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateTrapezoidArea(
  base1: number,
  base2: number,
  height: number,
): number {
  if (isNaN(base1) || isNaN(base2) || isNaN(height)) {
    throw new Error('Base1, base2, and height must be numbers');
  }
  if (base1 < 0 || base2 < 0 || height < 0) {
    throw new Error('Base1, base2, and height must be non-negative numbers');
  }
  return 0.5 * (base1 + base2) * height;
}
