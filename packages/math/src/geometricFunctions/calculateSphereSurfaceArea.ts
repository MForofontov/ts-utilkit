/**
 * Calculates the surface area of a sphere given its radius.
 *
 * @param radius - The radius of the sphere.
 * @returns The surface area of the sphere in square units.
 *
 * @throws {Error} If radius is NaN.
 * @throws {Error} If radius is negative.
 *
 * @example
 * // Basic sphere
 * calculateSphereSurfaceArea(5); // ~314.16
 *
 * @example
 * // Small sphere
 * calculateSphereSurfaceArea(2); // ~50.27
 *
 * @example
 * // Large sphere
 * calculateSphereSurfaceArea(10); // ~1256.64
 *
 * @example
 * // Unit sphere (radius = 1)
 * calculateSphereSurfaceArea(1); // ~12.57 (4π)
 *
 * @example
 * // Real-world: Calculate Earth's surface area (approximate)
 * const earthRadius = 6371; // km
 * const earthSurface = calculateSphereSurfaceArea(earthRadius); // ~510,064,472 km²
 *
 * @note Formula: SA = 4 × π × r²
 * @note Sphere surface area is exactly 4 times the area of a circle with same radius.
 * @note A sphere has the smallest surface area for a given volume (most efficient shape).
 * @note Result units are square (e.g., cm → cm², m → m²).
 * @note Common use cases: balls, planets, bubbles, balloons, water droplets.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateSphereSurfaceArea(radius: number): number {
  if (isNaN(radius)) {
    throw new Error('Radius must be a number');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return 4 * Math.PI * Math.pow(radius, 2);
}
