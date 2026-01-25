/**
 * Flattens nested object structure for easier serialization with dot notation keys.
 *
 * @param obj - The object to flatten.
 * @param prefix - Optional prefix for keys (used in recursion).
 * @returns Flattened object with dot notation keys.
 *
 * @throws {TypeError} If obj is not an object.
 *
 * @example
 * // Flatten nested object
 * flattenForSerialization({ a: { b: { c: 1 } } });
 * // { 'a.b.c': 1 }
 *
 * @example
 * // Flatten with arrays
 * flattenForSerialization({ items: [1, 2, 3] });
 * // { 'items.0': 1, 'items.1': 2, 'items.2': 3 }
 *
 * @note Arrays are indexed with numeric keys.
 *
 * @complexity Time: O(n), Space: O(n) where n is total properties
 */
export function flattenForSerialization(
  obj: Record<string, any>,
  prefix: string = '',
): Record<string, any> {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError(`obj must be an object, got ${typeof obj}`);
  }

  const result: Record<string, any> = {};

  const flatten = (current: any, path: string): void => {
    if (current === null || current === undefined) {
      result[path] = current;
      return;
    }

    if (typeof current !== 'object') {
      result[path] = current;
      return;
    }

    if (Array.isArray(current)) {
      if (current.length === 0) {
        result[path] = [];
        return;
      }

      current.forEach((item, index) => {
        const newPath = path ? `${path}.${index}` : String(index);
        flatten(item, newPath);
      });
      return;
    }

    const keys = Object.keys(current);

    if (keys.length === 0) {
      result[path] = {};
      return;
    }

    keys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      flatten(current[key], newPath);
    });
  };

  flatten(obj, prefix);
  return result;
}
