/**
 * Calculates the area of a triangle given its base and height.
 *
 * @param base - The base of the triangle (must be non-negative).
 * @param height - The height of the triangle (perpendicular to the base, must be non-negative).
 * @returns The area of the triangle in square units.
 *
 * @throws {Error} If base or height is not a valid, non-negative number.
 *
 * @example
 * // Right triangle
 * calculateTriangleArea(10, 5); // 25
 * calculateTriangleArea(6, 8); // 24
 *
 * @example
 * // Small triangles
 * calculateTriangleArea(1, 1); // 0.5
 * calculateTriangleArea(2, 3); // 3
 *
 * @example
 * // Zero dimensions (degenerate triangle)
 * calculateTriangleArea(0, 5); // 0 (no area)
 * calculateTriangleArea(10, 0); // 0 (no area)
 *
 * @example
 * // Decimal dimensions
 * calculateTriangleArea(7.5, 4.2); // 15.75
 * calculateTriangleArea(3.14, 2.5); // 3.925
 *
 * @note Formula: A = (1/2) × base × height
 * @note The height must be perpendicular to the base.
 * @note Both base and height must be non-negative (no negative distances).
 * @note Result is in square units (if dimensions are in meters, area is in square meters).
 * @note For other triangle area formulas (Heron's, SAS), see related functions.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateTriangleArea(base: number, height: number): number {
  if (isNaN(base) || isNaN(height)) {
    throw new Error('Base and height must be numbers');
  }
  if (base < 0 || height < 0) {
    throw new Error('Base and height must be non-negative numbers');
  }
  return 0.5 * base * height;
}

// Example usage:
// calculateTriangleArea(10, 5); // 25
