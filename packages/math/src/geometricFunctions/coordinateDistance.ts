/**
 * Calculates the Euclidean distance between two points in 2D space.
 *
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @returns The distance between the two points (always non-negative).
 *
 * @throws {Error} If any coordinate is not a finite number.
 *
 * @example
 * // Classic 3-4-5 right triangle
 * coordinateDistance(0, 0, 3, 4); // 5
 *
 * @example
 * // Horizontal and vertical distances
 * coordinateDistance(0, 0, 5, 0); // 5 (horizontal line)
 * coordinateDistance(0, 0, 0, 5); // 5 (vertical line)
 *
 * @example
 * // Same point (distance is zero)
 * coordinateDistance(3, 4, 3, 4); // 0
 *
 * @example
 * // Negative coordinates
 * coordinateDistance(-3, -4, 0, 0); // 5
 * coordinateDistance(-5, 2, 3, -1); // 8.54400374531753
 *
 * @example
 * // Decimal coordinates
 * coordinateDistance(1.5, 2.5, 4.5, 6.5); // 5
 * coordinateDistance(0, 0, 1, 1); // 1.4142135623730951 (√2)
 *
 * @note Formula: d = √[(x2-x1)² + (y2-y1)²] (Pythagorean theorem)
 * @note This is the Euclidean distance (straight-line distance) in 2D space.
 * @note Distance is always non-negative and symmetric: d(A,B) = d(B,A).
 * @note For 3D distance, use a function that accepts z-coordinates.
 * @note Common uses: collision detection, proximity checks, pathfinding.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function coordinateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    throw new Error('All coordinates must be numbers');
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Example usage:
// coordinateDistance(0, 0, 3, 4); // 5
