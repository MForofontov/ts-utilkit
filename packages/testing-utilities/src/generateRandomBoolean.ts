/**
 * Generates a random boolean value for testing.
 *
 * @param trueProbability - Probability of true (0-1, default: 0.5).
 * @returns Random boolean value.
 *
 * @throws {Error} If trueProbability is not between 0 and 1.
 *
 * @example
 * const bool = generateRandomBoolean();
 * // Returns: true or false (50% each)
 *
 * @example
 * const mostlyTrue = generateRandomBoolean(0.8);
 * // Returns: true 80% of the time
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomBoolean(trueProbability: number = 0.5): boolean {
  if (trueProbability < 0 || trueProbability > 1) {
    throw new Error('trueProbability must be between 0 and 1');
  }
  return Math.random() < trueProbability;
}
