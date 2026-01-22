/**
 * Calculates the volume of a cube given the length of its side.
 *
 * @param side - The length of a side of the cube.
 * @returns The volume of the cube in cubic units.
 *
 * @throws {Error} If side is NaN.
 * @throws {Error} If side is negative.
 *
 * @example
 * // Basic cube
 * calculateCubeVolume(3); // 27
 *
 * @example
 * // Small cube
 * calculateCubeVolume(2); // 8
 *
 * @example
 * // Large cube
 * calculateCubeVolume(10); // 1000
 *
 * @example
 * // Unit cube (side = 1)
 * calculateCubeVolume(1); // 1
 *
 * @example
 * // Real-world: Calculate storage box capacity
 * const boxSide = 50; // cm
 * const capacity = calculateCubeVolume(boxSide); // 125,000 cm³ (125 liters)
 *
 * @note Formula: V = s³ (side cubed)
 * @note A cube is a special rectangular prism where all edges are equal.
 * @note Volume increases with the cube of side length (doubling side = 8x volume).
 * @note Result units are cubic (e.g., cm → cm³, m → m³).
 * @note Common use cases: dice, boxes, Rubik's cubes, storage containers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCubeVolume(side: number): number {
  if (isNaN(side)) {
    throw new Error('Side length must be a number');
  }
  if (side < 0) {
    throw new Error('Side length must be a non-negative number');
  }
  return Math.pow(side, 3);
}
