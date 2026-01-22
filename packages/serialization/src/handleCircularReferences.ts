/**
 * Detects and handles circular references in object for safe serialization.
 *
 * @param obj - The object to check and handle.
 * @param replacer - Optional replacer for circular references (default: '[Circular]').
 * @returns Object with circular references replaced.
 *
 * @throws {TypeError} If obj is not an object.
 *
 * @example
 * // Handle circular reference
 * const obj: any = { a: 1 };
 * obj.self = obj;
 * handleCircularReferences(obj); // { a: 1, self: '[Circular]' }
 *
 * @example
 * // Custom replacer
 * const obj: any = { a: 1 };
 * obj.self = obj;
 * handleCircularReferences(obj, null); // { a: 1, self: null }
 *
 * @note Creates new object with circular references replaced.
 *
 * @complexity Time: O(n), Space: O(n) where n is object size
 */
export function handleCircularReferences(
  obj: any,
  replacer: any = '[Circular]',
): any {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError(`obj must be an object, got ${typeof obj}`);
  }

  const seen = new WeakSet();

  const handle = (value: any): any => {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value !== 'object') {
      return value;
    }

    // Check for circular reference
    if (seen.has(value)) {
      return replacer;
    }

    seen.add(value);

    if (Array.isArray(value)) {
      const result = value.map(handle);
      seen.delete(value); // Allow same object at different branches
      return result;
    }

    const result: Record<string, any> = {};

    for (const [key, val] of Object.entries(value)) {
      result[key] = handle(val);
    }

    seen.delete(value); // Allow same object at different branches
    return result;
  };

  return handle(obj);
}
