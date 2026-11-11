/**
 * Groups adjacent items whose derived keys are equal, preserving their order.
 * @param items - Items to inspect, including sparse slots as undefined.
 * @param keyFn - Derives a key from an item and its original index.
 * @returns Consecutive runs; nonadjacent equal keys remain in separate runs.
 * @throws {TypeError} If items is not an array or keyFn is not a function.
 * @example partitionBy([1, 3, 2, 4, 5], n => n % 2); // [[1, 3], [2, 4], [5]]
 * @note Keys use SameValueZero equality; object keys compare by reference.
 * @complexity Time: O(n), Space: O(n), excluding callback cost.
 */
export function partitionBy<T, K>(
  items: T[],
  keyFn: (item: T, index: number) => K,
): T[][] {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (typeof keyFn !== 'function')
    throw new TypeError('keyFn must be a function');
  const result: T[][] = [];
  let previous: K | undefined;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const key = keyFn(item, index);
    if (index === 0 || !(key === previous || Object.is(key, previous))) {
      result.push([]);
    }
    result[result.length - 1].push(item);
    previous = key;
  }
  return result;
}
