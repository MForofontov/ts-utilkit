/**
 * Calculates the perimeter of a rectangle given its width and height.
 *
 * @param width - The width of the rectangle.
 * @param height - The height of the rectangle.
 * @returns The perimeter of the rectangle in linear units.
 *
 * @throws {Error} If width or height is NaN.
 * @throws {Error} If width or height is negative.
 *
 * @example
 * // Basic rectangle
 * calculateRectanglePerimeter(10, 5); // 30
 *
 * @example
 * // Square (width = height)
 * calculateRectanglePerimeter(7, 7); // 28
 *
 * @example
 * // Wide rectangle
 * calculateRectanglePerimeter(15, 3); // 36
 *
 * @example
 * // Decimal measurements
 * calculateRectanglePerimeter(6.5, 4.2); // 21.4
 *
 * @example
 * // Real-world: Calculate fence length for garden
 * const gardenWidth = 12; // meters
 * const gardenHeight = 8; // meters
 * const fenceLength = calculateRectanglePerimeter(gardenWidth, gardenHeight); // 40 meters
 *
 * @note Formula: P = 2 × (width + height)
 * @note Perimeter is the total distance around the rectangle's boundary.
 * @note For a square, P = 4 × side (since width = height).
 * @note Result units match input units (e.g., cm → cm, m → m).
 * @note Common use cases: fencing, framing, borders, room molding.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateRectanglePerimeter(
  width: number,
  height: number,
): number {
  if (isNaN(width) || isNaN(height)) {
    throw new Error('Width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be non-negative numbers');
  }
  return 2 * (width + height);
}
