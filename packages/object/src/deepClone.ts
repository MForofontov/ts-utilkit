/**
 * Creates a deep clone of an object or array, preserving nested structures.
 *
 * @param obj - The object or array to clone (must be a non-null object).
 * @returns A deep copy of the input object with no shared references.
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Clone nested object
 * const original = { name: 'John', address: { city: 'NY', zip: '10001' } };
 * const copy = deepClone(original);
 * copy.address.city = 'LA';
 * console.log(original.address.city); // 'NY' (unchanged)
 *
 * @example
 * // Clone array with nested objects
 * const arr = [{ id: 1 }, { id: 2 }];
 * const clonedArr = deepClone(arr);
 * clonedArr[0].id = 99;
 * console.log(arr[0].id); // 1 (original unchanged)
 *
 * @example
 * // Clone with Date and RegExp (when structuredClone available)
 * const obj = {
 *   date: new Date('2025-01-01'),
 *   pattern: /test/gi
 * };
 * const cloned = deepClone(obj);
 * // Date and RegExp objects are properly cloned
 *
 * @example
 * // Primitives throw error
 * deepClone(42); // TypeError: Input must be a non-null object
 * deepClone(null); // TypeError: Input must be a non-null object
 *
 * @note Uses `structuredClone` when available (Node.js 17+, modern browsers).
 * @note Falls back to JSON serialization if `structuredClone` not available.
 * @note JSON fallback limitations: doesn't preserve functions, undefined, Date, RegExp, Map, Set, symbols, or circular references.
 * @note structuredClone supports: Date, RegExp, Map, Set, ArrayBuffer, Blob, File, and circular references.
 * @note For cloning with custom logic, use deepCloneWith instead.
 *
 * @complexity Time: O(n) where n is total number of values in object tree, Space: O(n)
 */
export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(obj) as T;
  }
  return JSON.parse(JSON.stringify(obj)) as T;
}
