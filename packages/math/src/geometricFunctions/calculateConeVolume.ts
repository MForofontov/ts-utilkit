/**
 * Calculates the volume of a cone given its radius and height.
 *
 * @param radius - The radius of the cone's circular base.
 * @param height - The perpendicular height of the cone from base to apex.
 * @returns The volume of the cone in cubic units.
 *
 * @throws {Error} If radius or height is NaN.
 * @throws {Error} If radius is negative.
 * @throws {Error} If height is negative.
 *
 * @example
 * // Basic cone
 * calculateConeVolume(5, 10); // ~261.80
 *
 * @example
 * // Small cone
 * calculateConeVolume(2, 6); // ~25.13
 *
 * @example
 * // Flat cone (height = 0)
 * calculateConeVolume(5, 0); // 0
 *
 * @example
 * // Thin tall cone
 * calculateConeVolume(1, 20); // ~20.94
 *
 * @example
 * // Real-world: Calculate ice cream cone volume
 * const coneRadius = 3; // cm
 * const coneHeight = 12; // cm
 * const volume = calculateConeVolume(coneRadius, coneHeight); // ~113.10 cm³
 *
 * @note Formula: V = (1/3) × π × r² × h
 * @note Cone volume is exactly 1/3 of a cylinder with same base and height.
 * @note The height must be perpendicular to the base (not slant height).
 * @note Result units are cubic (e.g., cm → cm³, m → m³).
 * @note Common use cases: ice cream cones, funnels, party hats, traffic cones.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateConeVolume(radius: number, height: number): number {
  if (isNaN(radius) || isNaN(height)) {
    throw new Error('Radius and height must be numbers');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  if (height < 0) {
    throw new Error('Height must be a non-negative number');
  }
  return (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
}
