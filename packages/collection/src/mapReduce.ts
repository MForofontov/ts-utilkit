/**
 * Reduces a Map to a single value using a reducer function.
 *
 * @param map - The Map to reduce.
 * @param reducer - Function to execute on each entry, producing a single output value.
 * @param initialValue - Initial value for the accumulator.
 * @returns The final accumulated value.
 *
 * @throws {TypeError} If map is not a Map.
 * @throws {TypeError} If reducer is not a function.
 *
 * @example
 * // Sum all values
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapReduce(map, (acc, [key, value]) => acc + value, 0); // 6
 *
 * @example
 * // Concatenate keys
 * const map = new Map([['hello', 1], ['world', 2]]);
 * mapReduce(map, (acc, [key]) => acc + key, ''); // 'helloworld'
 *
 * @example
 * // Build object from Map
 * const map = new Map([['a', 1], ['b', 2]]);
 * mapReduce(map, (acc, [k, v]) => ({ ...acc, [k]: v }), {}); // { a: 1, b: 2 }
 *
 * @note Does not modify the original Map
 * @note Reducer receives accumulator, [key, value] tuple, and index
 *
 * @complexity Time: O(n) where n is map size, Space: O(1)
 */
export function mapReduce<K, V, R>(
  map: Map<K, V>,
  reducer: (accumulator: R, entry: [K, V], index: number) => R,
  initialValue: R,
): R {
  if (!(map instanceof Map)) {
    throw new TypeError(`map must be a Map, got ${typeof map}`);
  }

  if (typeof reducer !== 'function') {
    throw new TypeError(`reducer must be a function, got ${typeof reducer}`);
  }

  let accumulator = initialValue;
  let index = 0;

  for (const entry of map.entries()) {
    accumulator = reducer(accumulator, entry, index);
    index++;
  }

  return accumulator;
}
