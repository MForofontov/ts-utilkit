/**
 * Internal helper that performs the core weighted random selection algorithm.
 *
 * Pre-condition: `items` is non-empty, `weights` matches `items` length,
 * all weights are non-negative, and `totalWeight > 0`. Callers are expected
 * to validate these invariants before invoking.
 *
 * @internal
 * @template T - The type of elements in the items array.
 * @param items - The pre-validated array of items to pick from.
 * @param weights - The matching weights array (same length, all non-negative).
 * @returns The randomly selected item based on its weight.
 *
 * @complexity Time: O(n), Space: O(1) where n is the number of items
 */
export function _weightedPick<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  // Fallback for floating-point precision edge cases
  return items[items.length - 1];
}
