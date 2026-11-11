/**
 * Removes non-serializable values from object (functions, symbols, undefined).
 *
 * @param obj - The object to sanitize.
 * @param removeNull - Whether to remove null values (default: false).
 * @returns Sanitized object safe for serialization.
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
import {
  cloneDate,
  cloneRegExp,
  isPlainObject,
} from './serializationValueUtils';

export function sanitizeForSerialization(
  obj: any,
  removeNull: boolean = false,
): any {
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

    if (value instanceof Date) {
      return cloneDate(value);
    }

    if (value instanceof RegExp) {
      return cloneRegExp(value);
    }

    if (Array.isArray(value)) {
      return value.map(sanitize).filter((v) => v !== undefined);
    }

    if (value instanceof Map) {
      const result = new Map<any, any>();
      for (const [key, val] of value) {
        const sanitizedKey = sanitize(key);
        const sanitizedVal = sanitize(val);
        if (sanitizedKey !== undefined && sanitizedVal !== undefined) {
          result.set(sanitizedKey, sanitizedVal);
        }
      }
      return result;
    }

    if (value instanceof Set) {
      const result = new Set<any>();
      for (const item of value) {
        const sanitized = sanitize(item);
        if (sanitized !== undefined) {
          result.add(sanitized);
        }
      }
      return result;
    }

    if (typeof value === 'object') {
      if (!isPlainObject(value)) {
        return value;
      }

      const result: Record<string, any> = {};

      for (const key of Reflect.ownKeys(value)) {
        if (typeof key === 'symbol') {
          continue;
        }

        const sanitized = sanitize((value as any)[key]);
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
