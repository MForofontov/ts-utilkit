/**
 * Groups an array of objects by a specific property.
 * Creates a dictionary where each key is a unique value of the specified property,
 * and each value is an array of items that have that property value.
 *
 * @param arr - The array of objects to group.
 * @param key - The property to group by.
 * @returns An object where each key is a value of the property, and the value is an array of items with that property.
 *
 * @example
 * // Basic usage
 * const people = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 25 },
 *   { name: 'Charlie', age: 30 }
 * ];
 * groupBy(people, 'age');
 * // Returns: { "25": [{ name: "Alice", age: 25 }, { name: "Bob", age: 25 }],
 * //            "30": [{ name: "Charlie", age: 30 }] }
 *
 * @example
 * // Empty array
 * groupBy([], 'id'); // Returns: {}
 *
 * @example
 * // Grouping by boolean property
 * const tasks = [
 *   { id: 1, completed: true },
 *   { id: 2, completed: false },
 *   { id: 3, completed: true }
 * ];
 * groupBy(tasks, 'completed');
 * // Returns: { "true": [{ id: 1, completed: true }, { id: 3, completed: true }],
 * //            "false": [{ id: 2, completed: false }] }
 *
 * @note All keys in the returned object are strings, as object keys in JavaScript
 * are always converted to strings. The original property values are preserved in
 * the grouped items.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (grouped, item) => {
      const groupKey = String(item[key]);
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(item);
      return grouped;
    },
    {} as Record<string, T[]>,
  );
}
