/**
 * Deep clones data using JSON serialization/deserialization.
 *
 * @template T - The type of data to clone.
 * @param data - The data to clone.
 * @returns Deep clone of the data.
 *
 * @throws {Error} If data contains circular references or non-serializable values.
 *
 * @example
 * // Clone object
 * const obj = { a: 1, b: { c: 2 } };
 * const clone = cloneViaSerialization(obj);
 * clone.b.c = 3; // Original obj.b.c is still 2
 *
 * @example
 * // Clone array
 * cloneViaSerialization([1, 2, { a: 3 }]); // [1, 2, { a: 3 }]
 *
 * @note Functions, symbols, and undefined values are lost during cloning.
 *
 * @complexity Time: O(n), Space: O(n) where n is data size
 */
export function cloneViaSerialization<T>(data: T): T {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to clone via serialization: ${error.message}`);
    }
    throw new Error('Failed to clone via serialization: Unknown error');
  }
}
