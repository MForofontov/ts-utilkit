/**
 * Creates an object from an array of objects, using the specified property value
 * of each object as the key and the entire object as the value.
 *
 * @param array - The array of objects to convert into an object.
 * @param key - The property name to use for generating keys.
 * @returns An object where keys are property values from the objects and values are the complete objects.
 *
 * @throws {TypeError} If array is not an array.
 *
 * @example
 * // Create an object indexed by id
 * const users = [
 *   { id: 'a1', name: 'Alice', age: 30 },
 *   { id: 'b2', name: 'Bob', age: 25 }
 * ];
 * keyBy(users, 'id');
 * // { 'a1': { id: 'a1', name: 'Alice', age: 30 }, 'b2': { id: 'b2', name: 'Bob', age: 25 } }
 *
 * @example
 * // Index by different property
 * const products = [
 *   { sku: 'ABC', name: 'Widget', price: 10 },
 *   { sku: 'DEF', name: 'Gadget', price: 20 }
 * ];
 * keyBy(products, 'sku');
 * // { 'ABC': { sku: 'ABC', name: 'Widget', price: 10 }, ... }
 *
 * @example
 * // Duplicate keys (last one wins)
 * const items = [
 *   { id: '1', value: 'first' },
 *   { id: '1', value: 'second' }
 * ];
 * keyBy(items, 'id');
 * // { '1': { id: '1', value: 'second' } } (second overwrites first)
 *
 * @example
 * // Empty array
 * keyBy([], 'id'); // {}
 *
 * @example
 * // Real-world: Fast lookup for users by ID
 * const usersList = await fetchUsers();
 * const usersById = keyBy(usersList, 'id');
 * const user = usersById['user_123']; // O(1) lookup instead of O(n) find
 *
 * @note Property values are converted to strings when used as keys.
 * @note If multiple objects have the same key value, later objects will overwrite earlier ones.
 * @note Objects without the specified key property are skipped.
 * @note Useful for converting arrays to lookup tables for fast O(1) access.
 * @note Similar to lodash's keyBy function.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the array length
 */
export function keyBy<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
): Record<string, T> {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array');
  }
  return array.reduce<Record<string, T>>((acc, item) => {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      acc[String(item[key])] = item;
    }
    return acc;
  }, {});
}
