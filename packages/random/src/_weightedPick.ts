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
  let totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let scale = 1;
  // Keep ordinary cumulative boundaries unchanged. Scale only finite weights
  // whose total overflows or is subnormal, where multiplication loses range.
  if (!Number.isFinite(totalWeight) || totalWeight < 2 ** -1022) {
    const maximum = weights.reduce(
      (largest, weight) => Math.max(largest, weight),
      0,
    );
    if (Number.isFinite(maximum)) {
      scale = maximum;
      totalWeight = weights.reduce((sum, weight) => sum + weight / scale, 0);
    }
  }
  let random = Math.random() * totalWeight;
  let lastPositiveIndex = items.length - 1;

  for (let i = 0; i < items.length; i++) {
    const weight = weights[i] / scale;
    if (weight <= 0) {
      continue;
    }
    lastPositiveIndex = i;
    random -= weight;
    if (random < 0) {
      return items[i];
    }
  }

  // Fallback for floating-point precision edge cases
  return items[lastPositiveIndex];
}
