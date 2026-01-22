/**
 * Calculates the volume of a rectangular prism given its width, height, and depth.
 *
 * @param width - The width of the prism.
 * @param height - The height of the prism.
 * @param depth - The depth of the prism.
 * @returns The volume of the rectangular prism in cubic units.
 *
 * @throws {Error} If width, height, or depth is NaN.
 * @throws {Error} If width, height, or depth is negative.
 *
 * @example
 * // Basic prism
 * calculatePrismVolume(2, 3, 4); // 24
 *
 * @example
 * // Cube (all dimensions equal)
 * calculatePrismVolume(5, 5, 5); // 125
 *
 * @example
 * // Flat prism
 * calculatePrismVolume(10, 5, 2); // 100
 *
 * @example
 * // Decimal dimensions
 * calculatePrismVolume(3.5, 4.2, 6.1); // ~89.67
 *
 * @example
 * // Real-world: Calculate shipping box capacity
 * const boxWidth = 30; // cm
 * const boxHeight = 20; // cm
 * const boxDepth = 15; // cm
 * const capacity = calculatePrismVolume(boxWidth, boxHeight, boxDepth); // 9,000 cm³ (9 liters)
 *
 * @note Formula: V = width × height × depth
 * @note A cube is a special prism where width = height = depth.
 * @note Also known as a cuboid or rectangular box.
 * @note Result units are cubic (e.g., cm → cm³, m → m³).
 * @note Common use cases: boxes, containers, rooms, buildings, storage spaces.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculatePrismVolume(
  width: number,
  height: number,
  depth: number,
): number {
  if (isNaN(width) || isNaN(height) || isNaN(depth)) {
    throw new Error('Width, height, and depth must be numbers');
  }
  if (width < 0 || height < 0 || depth < 0) {
    throw new Error('Width, height, and depth must be non-negative numbers');
  }
  return width * height * depth;
}
