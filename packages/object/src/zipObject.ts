/**
 * Creates an object from two separate arrays: one of keys and one of values.
 * Pairs each key with the value at the same index.
 *
 * @template T - The type of the values.
 * @param keys - Array of string keys.
 * @param values - Array of values to pair with the keys.
 * @returns An object mapping each key to the corresponding value.
 *
 * @throws {Error} If keys and values arrays have different lengths.
 *
 * @example
 * // Basic usage
 * zipObject(['a', 'b', 'c'], [1, 2, 3]);
 * // { a: 1, b: 2, c: 3 }
 *
 * @example
 * // From CSV headers and row data
 * const headers = ['name', 'age', 'city'];
 * const row = ['Alice', 30, 'Berlin'];
 * zipObject(headers, row);
 * // { name: 'Alice', age: 30, city: 'Berlin' }
 *
 * @example
 * // Empty arrays
 * zipObject([], []);
 * // {}
 *
 * @note If duplicate keys appear, the last corresponding value wins.
 * @note Use entriesToObject when you already have [key, value] pairs.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the arrays
 */
export function zipObject<T>(keys: string[], values: T[]): Record<string, T> {
  if (keys.length !== values.length) {
    throw new Error(
      `keys and values must have the same length, got ${keys.length} and ${values.length}`,
    );
  }

  const result: Record<string, T> = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}
