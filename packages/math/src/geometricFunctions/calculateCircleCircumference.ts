/**
 * Calculates the circumference of a circle given its radius.
 *
 * @param radius - The radius of the circle.
 * @returns The circumference of the circle in linear units.
 *
 * @throws {Error} If radius is NaN.
 * @throws {Error} If radius is negative.
 *
 * @example
 * // Basic circle
 * calculateCircleCircumference(5); // ~31.42
 *
 * @example
 * // Small circle
 * calculateCircleCircumference(2); // ~12.57
 *
 * @example
 * // Large circle
 * calculateCircleCircumference(10); // ~62.83
 *
 * @example
 * // Unit circle (radius = 1)
 * calculateCircleCircumference(1); // ~6.28 (2π)
 *
 * @example
 * // Real-world: Calculate wheel perimeter
 * const wheelRadius = 30; // cm
 * const perimeter = calculateCircleCircumference(wheelRadius); // ~188.50 cm
 *
 * @note Formula: C = 2 × π × r (or C = π × d where d is diameter)
 * @note Circumference is the perimeter/boundary length of a circle.
 * @note Ratio of circumference to diameter is always π (≈3.14159).
 * @note Result units match radius units (e.g., cm → cm, m → m).
 * @note Common use cases: wheels, hoops, circular tracks, orbital paths.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCircleCircumference(radius: number): number {
  if (isNaN(radius)) {
    throw new Error('Radius must be a number');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return 2 * Math.PI * radius;
}
