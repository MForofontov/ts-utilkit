/**
 * Sorts an array of objects based on a given property.
 * Creates a new array with the same elements sorted by the specified property value.
 * Handles various data types: strings, numbers, booleans, dates, and bigints.
 *
 * @param arr - The array of objects to sort.
 * @param key - The property to sort by.
 * @returns A new sorted array. The original array is not modified.
 * @throws Error if the property values are of unsupported or mixed types.
 *
 * @example
 * // Sort by string property
 * const users = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
 * sortBy(users, 'name'); // Returns [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]
 *
 * @example
 * // Sort by number property
 * const items = [{ price: 100 }, { price: 50 }, { price: 75 }];
 * sortBy(items, 'price'); // Returns [{ price: 50 }, { price: 75 }, { price: 100 }]
 *
 * @example
 * // Sort by date property
 * const events = [
 *   { date: new Date('2023-01-10') },
 *   { date: new Date('2023-01-01') },
 *   { date: new Date('2023-01-05') }
 * ];
 * sortBy(events, 'date'); // Returns events sorted by date (oldest first)
 *
 * @example
 * // Sort by boolean property
 * const tasks = [{ completed: false }, { completed: true }, { completed: false }];
 * sortBy(tasks, 'completed'); // Returns [{ completed: true }, { completed: false }, { completed: false }]
 *
 * @note This function creates a new array without modifying the original.
 * String properties are sorted using localeCompare for proper language-sensitive ordering.
 * Boolean sorting puts true values before false values.
 *
 * @complexity Time: O(n log n), Space: O(n) - Where n is array length
 */
export function sortBy<T>(arr: T[], key: keyof T): T[] {
  return arr.slice().sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue instanceof Date && bValue instanceof Date) {
      return aValue.getTime() - bValue.getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return aValue === bValue ? 0 : aValue ? -1 : 1;
    }

    if (typeof aValue === 'bigint' && typeof bValue === 'bigint') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }

    throw new Error(
      `Unsupported types for sorting: ${typeof aValue} and ${typeof bValue}`,
    );
  });
}
