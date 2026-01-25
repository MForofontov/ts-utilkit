/**
 * Calculates the area of a parallelogram given its base and height.
 *
 * @param base - The length of the base of the parallelogram.
 * @param height - The perpendicular height of the parallelogram.
 * @returns The area of the parallelogram in square units.
 *
 * @throws {Error} If base or height is NaN.
 * @throws {Error} If base or height is negative.
 *
 * @example
 * // Basic parallelogram
 * calculateParallelogramArea(10, 5); // 50
 *
 * @example
 * // Square (special case)
 * calculateParallelogramArea(6, 6); // 36
 *
 * @example
 * // Wide parallelogram
 * calculateParallelogramArea(15, 3); // 45
 *
 * @example
 * // Decimal measurements
 * calculateParallelogramArea(7.5, 4.2); // 31.5
 *
 * @example
 * // Real-world: Calculate parking space area
 * const spaceBase = 5.5; // meters
 * const spaceHeight = 2.5; // meters
 * const area = calculateParallelogramArea(spaceBase, spaceHeight); // 13.75 m²
 *
 * @note Formula: A = base × height (same as rectangle)
 * @note The height must be perpendicular to the base, not the slant side.
 * @note A rectangle is a special parallelogram with 90° angles.
 * @note Result units are square (e.g., cm → cm², m → m²).
 * @note Common use cases: angled structures, sheared shapes, architectural designs.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateParallelogramArea(
  base: number,
  height: number,
): number {
  if (isNaN(base) || isNaN(height)) {
    throw new Error('Base and height must be numbers');
  }
  if (base < 0 || height < 0) {
    throw new Error('Base and height must be non-negative numbers');
  }
  return base * height;
}
