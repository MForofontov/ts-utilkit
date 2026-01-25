/**
 * Extracts all unique values from an object, removing any duplicates.
 *
 * @param obj - The object to extract values from.
 * @returns An array containing only the unique values from the object.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic usage with duplicates
 * const obj = { a: 1, b: 2, c: 1, d: 3 };
 * uniqueValues(obj); // [1, 2, 3]
 *
 * @example
 * // With mixed value types
 * const mixed = { id: 1, name: 'Product', active: true, category: 'A', tag: 'A' };
 * uniqueValues(mixed); // [1, 'Product', true, 'A']
 *
 * @example
 * // Empty object
 * uniqueValues({}); // []
 *
 * @example
 * // Objects with same content
 * const data = { a: { x: 1 }, b: { x: 1 }, c: { x: 2 } };
 * uniqueValues(data); // [{ x: 1 }, { x: 2 }] (compares by content)
 *
 * @example
 * // Real-world: Get unique tags from products
 * const products = {
 *   p1: { tag: 'electronics' },
 *   p2: { tag: 'clothing' },
 *   p3: { tag: 'electronics' }
 * };
 * const tags = uniqueValues(products).map(p => p.tag);
 *
 * @note Uses JSON serialization for object comparison (compares by content, not reference).
 * @note The order of values follows their first occurrence in Object.values().
 * @note Objects and arrays are compared by their serialized form.
 * @note Circular references in objects will cause errors.
 * @note Useful for deduplicating object values or finding unique items.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of properties
 */
export function uniqueValues<T extends Record<string, unknown>>(
  obj: T,
): unknown[] {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const result: unknown[] = [];
  const seen = new Set<string>();
  for (const value of Object.values(obj)) {
    const key =
      typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : String(value);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
}
