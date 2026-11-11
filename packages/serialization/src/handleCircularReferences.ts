/**
 * Detects and handles circular references in object for safe serialization.
 *
 * @param obj - The object to check and handle.
 * @param replacer - Optional replacer for circular references (default: '[Circular]').
 * @returns Object with circular references replaced.
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
import {
  cloneDate,
  cloneRegExp,
  isPlainObject,
} from './serializationValueUtils';

export function handleCircularReferences(
  obj: any,
  replacer: any = '[Circular]',
): any {
  const seen = new WeakSet();

  const handle = (value: any): any => {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value !== 'object') {
      return value;
    }

    if (value instanceof Date) {
      return cloneDate(value);
    }

    if (value instanceof RegExp) {
      return cloneRegExp(value);
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

    if (value instanceof Map) {
      const result = new Map<any, any>();
      for (const [key, val] of value) {
        result.set(handle(key), handle(val));
      }
      seen.delete(value);
      return result;
    }

    if (value instanceof Set) {
      const result = new Set<any>();
      for (const item of value) {
        result.add(handle(item));
      }
      seen.delete(value);
      return result;
    }

    if (!isPlainObject(value)) {
      return value;
    }

    const result: Record<string | symbol, any> = {};

    for (const key of Reflect.ownKeys(value)) {
      result[key] = handle((value as Record<PropertyKey, unknown>)[key]);
    }

    seen.delete(value); // Allow same object at different branches
    return result;
  };

  return handle(obj);
}
