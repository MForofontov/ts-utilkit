/**
 * Creates a new object with all properties from the source except those with empty values.
 * Empty values are defined as null, undefined, or empty strings.
 *
 * @param obj - The source object to filter.
 * @returns A new object containing only properties with non-empty values.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic usage
 * const obj = { a: 1, b: null, c: '', d: undefined, e: 'value' };
 * removeEmptyValues(obj);
 * // { a: 1, e: 'value' }
 *
 * @example
 * // Nested objects and arrays
 * const data = {
 *   user: { name: 'Alice', age: null },
 *   tags: ['valid', '', null],
 *   active: true
 * };
 * removeEmptyValues(data);
 * // { user: { name: 'Alice' }, tags: ['valid'], active: true }
 *
 * @example
 * // Zero and false are preserved
 * removeEmptyValues({ a: 0, b: false, c: null, d: '' });
 * // { a: 0, b: false }
 *
 * @example
 * // Empty arrays and objects are preserved
 * removeEmptyValues({ arr: [], obj: {}, value: null });
 * // { arr: [], obj: {} }
 *
 * @example
 * // Real-world: Clean API response before saving
 * const apiResponse = {
 *   id: 123,
 *   name: 'Product',
 *   description: '',
 *   metadata: null,
 *   tags: ['electronics', '', 'gadgets']
 * };
 * const cleaned = removeEmptyValues(apiResponse);
 * // { id: 123, name: 'Product', tags: ['electronics', 'gadgets'] }
 *
 * @note Creates a new object and doesn't modify the original.
 * @note Zero, false, and empty arrays/objects are NOT considered empty values.
 * @note Recursively filters nested objects and arrays.
 * @note Empty strings (''), null, and undefined are removed.
 * @note Useful for cleaning form data and API responses.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is total values including nested
 */
export function removeEmptyValues(
  obj: Record<string, unknown>,
): Partial<Record<string, unknown>> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const clean = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value
        .map(clean)
        .filter((v) => v !== null && v !== undefined && v !== '');
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value)
          .map(([k, v]) => [k, clean(v)])
          .filter(([_, v]) => v !== null && v !== undefined && v !== ''),
      );
    }
    return value;
  };

  return clean(obj) as Partial<Record<string, unknown>>;
}
