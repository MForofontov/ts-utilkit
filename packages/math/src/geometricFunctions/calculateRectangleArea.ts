/**
 * Calculates the area of a rectangle given its width and height.
 *
 * @param width - The width of the rectangle (must be non-negative).
 * @param height - The height of the rectangle (must be non-negative).
 * @returns The area of the rectangle in square units.
 *
 * @throws {Error} If width or height is not a valid, non-negative number.
 *
 * @example
 * // Basic rectangles
 * calculateRectangleArea(10, 5); // 50
 * calculateRectangleArea(8, 12); // 96
 *
 * @example
 * // Square (width = height)
 * calculateRectangleArea(5, 5); // 25
 * calculateRectangleArea(10, 10); // 100
 *
 * @example
 * // Zero dimensions (degenerate rectangle)
 * calculateRectangleArea(0, 5); // 0 (no area)
 * calculateRectangleArea(10, 0); // 0 (no area)
 *
 * @example
 * // Decimal dimensions
 * calculateRectangleArea(7.5, 4.2); // 31.5
 * calculateRectangleArea(3.14, 2.5); // 7.85
 *
 * @note Formula: A = width × height
 * @note Both width and height must be non-negative (no negative distances).
 * @note Result is in square units (if dimensions are in meters, area is in square meters).
 * @note A square is a special case where width = height.
 * @note Common use cases: room sizes, screen dimensions, land areas.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateRectangleArea(width: number, height: number): number {
  if (isNaN(width) || isNaN(height)) {
    throw new Error('Width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be non-negative numbers');
  }
  return width * height;
}

// Example usage:
// calculateRectangleArea(10, 5); // 50
