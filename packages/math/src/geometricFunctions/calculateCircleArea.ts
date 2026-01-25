/**
 * Calculates the area of a circle given its radius.
 *
 * @param radius - The radius of the circle (must be non-negative).
 * @returns The area of the circle in square units.
 *
 * @throws {Error} If radius is not a valid, non-negative number.
 *
 * @example
 * // Basic usage
 * calculateCircleArea(5); // 78.53981633974483 (π * 5²)
 * calculateCircleArea(10); // 314.1592653589793 (π * 10²)
 *
 * @example
 * // Small circles
 * calculateCircleArea(1); // 3.141592653589793 (π * 1²)
 * calculateCircleArea(0.5); // 0.7853981633974483
 *
 * @example
 * // Zero radius (point)
 * calculateCircleArea(0); // 0
 *
 * @example
 * // Large circles
 * calculateCircleArea(100); // 31415.926535897932
 *
 * @note Formula: A = π * r²
 * @note The radius must be non-negative (no negative distances).
 * @note Uses Math.PI for the value of π (≈ 3.14159).
 * @note Result is in square units (if radius is in meters, area is in square meters).
 * @note Common use cases: calculating circular areas, disk space, circular regions.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCircleArea(radius: number): number {
  if (isNaN(radius)) {
    throw new Error('Radius must be a number');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return Math.PI * Math.pow(radius, 2);
}

// Example usage:
// calculateCircleArea(5); // ~78.54
