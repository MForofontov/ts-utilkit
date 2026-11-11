/**
 * Returns source items whose derived keys are present in the comparison array.
 * @param items - Source items; sparse slots are skipped.
 * @param other - Comparison items; sparse slots are skipped.
 * @param keyFn - Derives a key, once per present comparison item, then source item.
 * @returns A new array preserving source order, duplicates, and item references.
 * @throws {TypeError} If either input is not an array or keyFn is not a function.
 * @example arrayIntersectionBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], x => x.id); // [{ id: 1 }]
 * @note Keys use SameValueZero equality; object keys compare by reference.
 * Callback errors propagate. Neither input is modified.
 * @complexity Time: O(n+m), Space: O(n+m), excluding callback cost.
 */
export function arrayIntersectionBy<T, K>(
  items: T[],
  other: T[],
  keyFn: (item: T) => K,
): T[] {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (!Array.isArray(other)) throw new TypeError('other must be an array');
  if (typeof keyFn !== 'function')
    throw new TypeError('keyFn must be a function');
  const keys = new Set<K>();
  other.forEach((item) => keys.add(keyFn(item)));
  return items.filter((item) => keys.has(keyFn(item)));
}
