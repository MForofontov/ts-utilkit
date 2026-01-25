/**
 * Groups the elements of an array into separate arrays based on the values of a specified property.
 *
 * @param array - The array of objects to group.
 * @param key - The property name to group by.
 * @returns An object where keys are unique property values and values are arrays of matching elements.
 *
 * @throws {TypeError} If array is not an array.
 *
 * @example
 * // Group people by age
 * const people = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Carol', age: 25 }
 * ];
 * groupByObject(people, 'age');
 * // {
 * //   '25': [{ name: 'Alice', age: 25 }, { name: 'Carol', age: 25 }],
 * //   '30': [{ name: 'Bob', age: 30 }]
 * // }
 *
 * @example
 * // Group by boolean property
 * const items = [
 *   { id: 1, active: true },
 *   { id: 2, active: false },
 *   { id: 3, active: true }
 * ];
 * groupByObject(items, 'active');
 * // {
 * //   'true': [{ id: 1, active: true }, { id: 3, active: true }],
 * //   'false': [{ id: 2, active: false }]
 * // }
 *
 * @example
 * // Group by category
 * const products = [
 *   { name: 'Laptop', category: 'electronics' },
 *   { name: 'Shirt', category: 'clothing' },
 *   { name: 'Phone', category: 'electronics' }
 * ];
 * groupByObject(products, 'category');
 * // {
 * //   'electronics': [{ name: 'Laptop', ... }, { name: 'Phone', ... }],
 * //   'clothing': [{ name: 'Shirt', ... }]
 * // }
 *
 * @example
 * // Empty array
 * groupByObject([], 'key'); // {}
 *
 * @example
 * // Real-world: Group orders by status
 * const orders = [
 *   { orderId: 1, status: 'pending', amount: 100 },
 *   { orderId: 2, status: 'shipped', amount: 200 },
 *   { orderId: 3, status: 'pending', amount: 150 }
 * ];
 * const grouped = groupByObject(orders, 'status');
 * // {
 * //   'pending': [{ orderId: 1, ... }, { orderId: 3, ... }],
 * //   'shipped': [{ orderId: 2, ... }]
 * // }
 *
 * @note Property values are converted to strings when used as keys in the result object.
 * @note Items without the specified key are omitted from the result.
 * @note Useful for categorizing data and creating lookup tables.
 * @note Similar to SQL GROUP BY operation.
 * @note All property types (numbers, booleans, etc.) become string keys.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function groupByObject<T>(
  array: T[],
  key: keyof T,
): Record<string, T[]> {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array');
  }

  return array.reduce<Record<string, T[]>>((acc, item) => {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const group = String(item[key]);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
    }
    return acc;
  }, {});
}
