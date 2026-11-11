/**
 * Unflattens object with dot notation keys back to nested structure.
 *
 * @param flatObj - The flattened object with dot notation keys.
 * @returns Nested object structure.
 *
 * @example
 * // Unflatten object
 * unflattenFromSerialization({ 'a.b.c': 1 }); // { a: { b: { c: 1 } } }
 *
 * @example
 * // Unflatten with arrays
 * unflattenFromSerialization({ 'items.0': 1, 'items.1': 2 });
 * // { items: [1, 2] }
 *
 * @note Numeric keys create arrays.
 *
 * @complexity Time: O(n * m), Space: O(n) where n is keys, m is avg depth
 */
export function unflattenFromSerialization(
  flatObj: Record<string, any>,
): Record<string, any> {
  const result: any = {};

  for (const [path, value] of Object.entries(flatObj)) {
    const keys = path.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const nextKey = keys[i + 1];

      // Determine if next level should be array or object
      const isNextArray = /^\d+$/.test(nextKey);

      if (
        !Object.hasOwn(current, key) ||
        current[key] === null ||
        typeof current[key] !== 'object'
      ) {
        Object.defineProperty(current, key, {
          value: isNextArray ? [] : {},
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }

      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    Object.defineProperty(current, lastKey, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }

  return result;
}
