/**
 * Keeps the first item for each derived key without modifying the input.
 * @param items - Items to inspect, including sparse slots as undefined.
 * @param keyFn - Derives a key from an item and its original index.
 * @returns Unique items in first-occurrence order.
 * @throws {TypeError} If items is not an array or keyFn is not a function.
 * @example uniqueBy([{ id: 1 }, { id: 1 }], item => item.id); // [{ id: 1 }]
 * @note Keys use SameValueZero equality; object keys compare by reference.
 * @complexity Time: O(n), Space: O(n), excluding callback cost.
 */
export function uniqueBy<T, K>(
  items: T[],
  keyFn: (item: T, index: number) => K,
): T[] {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (typeof keyFn !== 'function')
    throw new TypeError('keyFn must be a function');
  const keys = new Set<K>();
  const result: T[] = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const key = keyFn(item, index);
    if (!keys.has(key)) {
      keys.add(key);
      result.push(item);
    }
  }
  return result;
}
