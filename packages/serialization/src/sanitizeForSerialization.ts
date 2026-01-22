/**
 * Removes non-serializable values from object (functions, symbols, undefined).
 *
 * @param obj - The object to sanitize.
 * @param removeNull - Whether to remove null values (default: false).
 * @returns Sanitized object safe for serialization.
 *
 * @throws {TypeError} If obj is not an object or removeNull is not boolean.
 *
 * @example
 * // Remove functions and symbols
 * sanitizeForSerialization({ a: 1, b: () => {}, c: Symbol('x') });
 * // { a: 1 }
 *
 * @example
 * // Remove nulls too
 * sanitizeForSerialization({ a: 1, b: null }, true); // { a: 1 }
 *
 * @note Creates new object, does not modify original.
 *
 * @complexity Time: O(n), Space: O(n) where n is object properties
 */
export function sanitizeForSerialization(
  obj: any,
  removeNull: boolean = false,
): any {
  if (typeof removeNull !== 'boolean') {
    throw new TypeError(
      `removeNull must be a boolean, got ${typeof removeNull}`,
    );
  }

  const sanitize = (value: any): any => {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return removeNull ? undefined : null;
    }

    if (typeof value === 'function' || typeof value === 'symbol') {
      return undefined;
    }

    if (Array.isArray(value)) {
      return value.map(sanitize).filter((v) => v !== undefined);
    }

    if (typeof value === 'object') {
      const result: Record<string, any> = {};

      for (const [key, val] of Object.entries(value)) {
        if (typeof key === 'symbol') {
          continue;
        }

        const sanitized = sanitize(val);
        if (sanitized !== undefined) {
          result[key] = sanitized;
        }
      }

      return result;
    }

    return value;
  };

  return sanitize(obj);
}
