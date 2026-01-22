/**
 * Calculates the volume of a cylinder given its radius and height.
 *
 * @param radius - The radius of the cylinder's circular base.
 * @param height - The height of the cylinder (distance between bases).
 * @returns The volume of the cylinder in cubic units.
 *
 * @throws {Error} If radius or height is NaN.
 * @throws {Error} If radius is negative.
 * @throws {Error} If height is negative.
 *
 * @example
 * // Basic cylinder
 * calculateCylinderVolume(5, 10); // ~785.40
 *
 * @example
 * // Short wide cylinder
 * calculateCylinderVolume(10, 2); // ~628.32
 *
 * @example
 * // Thin tall cylinder
 * calculateCylinderVolume(1, 20); // ~62.83
 *
 * @example
 * // Flat cylinder (height = 0)
 * calculateCylinderVolume(5, 0); // 0
 *
 * @example
 * // Real-world: Calculate water tank capacity
 * const tankRadius = 50; // cm
 * const tankHeight = 100; // cm
 * const capacity = calculateCylinderVolume(tankRadius, tankHeight); // ~785,398 cm³ (≈785 liters)
 *
 * @note Formula: V = π × r² × h
 * @note Cylinder volume is 3 times the volume of a cone with same base and height.
 * @note The bases must be parallel and circular.
 * @note Result units are cubic (e.g., cm → cm³, m → m³).
 * @note Common use cases: tanks, pipes, cans, barrels, storage containers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCylinderVolume(
  radius: number,
  height: number,
): number {
  if (isNaN(radius) || isNaN(height)) {
    throw new Error('Radius and height must be numbers');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  if (height < 0) {
    throw new Error('Height must be a non-negative number');
  }
  return Math.PI * Math.pow(radius, 2) * height;
}
