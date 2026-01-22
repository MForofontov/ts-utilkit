/**
 * Picks a random element from an array based on weights.
 *
 * @template T - The type of array elements.
 * @param items - The array of items to pick from.
 * @param weights - The array of weights (positive numbers) corresponding to each item.
 * @returns A randomly selected item based on weights.
 *
 * @throws {TypeError} If items is not an array.
 * @throws {TypeError} If weights is not an array.
 * @throws {Error} If items array is empty.
 * @throws {Error} If weights array is empty.
 * @throws {Error} If items and weights arrays have different lengths.
 * @throws {Error} If any weight is not a positive number.
 * @throws {Error} If any weight is NaN.
 * @throws {Error} If sum of weights is zero.
 *
 * @example
 * // Pick with equal weights
 * randomWeighted(['a', 'b', 'c'], [1, 1, 1]); // 'b'
 *
 * @example
 * // Pick with unequal weights (75% chance of 'common', 25% chance of 'rare')
 * randomWeighted(['common', 'rare'], [3, 1]); // 'common'
 *
 * @example
 * // Pick rarity level
 * randomWeighted(['common', 'uncommon', 'rare', 'legendary'], [50, 30, 15, 5]);
 * // 'uncommon'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Higher weight means higher probability of selection.
 * @note Weights don't need to sum to 1 or 100 - they are normalized internally.
 *
 * @complexity Time: O(n), Space: O(1) where n is array length
 */
export function randomWeighted<T>(items: T[], weights: number[]): T {
  if (!Array.isArray(items)) {
    throw new TypeError(`items must be an array, got ${typeof items}`);
  }
  if (!Array.isArray(weights)) {
    throw new TypeError(`weights must be an array, got ${typeof weights}`);
  }
  if (items.length === 0) {
    throw new Error('items array cannot be empty');
  }
  if (weights.length === 0) {
    throw new Error('weights array cannot be empty');
  }
  if (items.length !== weights.length) {
    throw new Error('items and weights arrays must have the same length');
  }

  // Validate weights
  for (let i = 0; i < weights.length; i++) {
    if (typeof weights[i] !== 'number') {
      throw new Error(
        `All weights must be numbers, got ${typeof weights[i]} at index ${i}`,
      );
    }
    if (isNaN(weights[i])) {
      throw new Error(`Weight at index ${i} is NaN`);
    }
    if (weights[i] < 0) {
      throw new Error('All weights must be non-negative');
    }
  }

  // Calculate total weight
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  if (totalWeight === 0) {
    throw new Error('Sum of weights must be greater than zero');
  }

  // Generate random value between 0 and totalWeight
  let random = Math.random() * totalWeight;

  // Find the item corresponding to the random value
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  // Fallback (should never reach here due to floating point precision)
  return items[items.length - 1];
}
