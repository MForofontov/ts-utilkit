/**
 * Calculates the volume of a sphere given its radius.
 *
 * @param radius - The radius of the sphere.
 * @returns The volume of the sphere in cubic units.
 *
 * @throws {Error} If radius is NaN.
 * @throws {Error} If radius is negative.
 *
 * @example
 * // Basic sphere
 * calculateSphereVolume(5); // ~523.60
 *
 * @example
 * // Small sphere
 * calculateSphereVolume(2); // ~33.51
 *
 * @example
 * // Large sphere
 * calculateSphereVolume(10); // ~4188.79
 *
 * @example
 * // Unit sphere (radius = 1)
 * calculateSphereVolume(1); // ~4.19 (4π/3)
 *
 * @example
 * // Real-world: Calculate ball volume
 * const basketballRadius = 12; // cm
 * const volume = calculateSphereVolume(basketballRadius); // ~7238.23 cm³
 *
 * @note Formula: V = (4/3) × π × r³
 * @note Sphere has the largest volume for a given surface area (most efficient 3D shape).
 * @note Volume increases with the cube of radius (doubling radius = 8x volume).
 * @note Result units are cubic (e.g., cm → cm³, m → m³).
 * @note Common use cases: balls, planets, bubbles, water droplets, spherical tanks.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateSphereVolume(radius: number): number {
  if (isNaN(radius)) {
    throw new Error('Radius must be a number');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return (4 / 3) * Math.PI * Math.pow(radius, 3);
}
