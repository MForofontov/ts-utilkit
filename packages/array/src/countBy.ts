/**
 * Counts array elements by grouping them according to a key function.
 * Returns a `Map` where each key is a group identifier produced by `keyFn`
 * and the corresponding value is the number of elements in that group.
 *
 * @param arr - The array of elements to count.
 * @param keyFn - A function that derives a string key from each element.
 * @returns A `Map<string, number>` mapping each key to its occurrence count.
 *
 * @example
 * // Count by remainder (even vs odd)
 * countBy([1, 2, 3, 4, 5, 6], n => n % 2 === 0 ? 'even' : 'odd');
 * // Returns Map { 'odd' => 3, 'even' => 3 }
 *
 * @example
 * // Count words by first letter
 * countBy(['apple', 'avocado', 'banana', 'blueberry', 'cherry'], w => w[0]);
 * // Returns Map { 'a' => 2, 'b' => 2, 'c' => 1 }
 *
 * @example
 * // Count objects by a property value
 * const orders = [
 *   { status: 'pending' },
 *   { status: 'shipped' },
 *   { status: 'pending' },
 *   { status: 'delivered' },
 * ];
 * countBy(orders, o => o.status);
 * // Returns Map { 'pending' => 2, 'shipped' => 1, 'delivered' => 1 }
 *
 * @example
 * // Empty array
 * countBy([], x => String(x)); // Returns Map {}
 *
 * @note The order of keys in the returned Map reflects insertion order
 * (i.e., the order in which each key is first encountered in `arr`).
 *
 * @complexity Time: O(n), Space: O(k) - Where n is array length and k is number of unique keys
 */
export function countBy<T>(
  arr: T[],
  keyFn: (value: T, index: number, array: T[]) => string,
): Map<string, number> {

  const result = new Map<string, number>();

  for (let i = 0; i < arr.length; i++) {
    const key = keyFn(arr[i], i, arr);
    result.set(key, (result.get(key) ?? 0) + 1);
  }

  return result;
}
