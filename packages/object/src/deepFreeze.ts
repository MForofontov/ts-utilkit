/**
 * Deeply freezes an object and all its nested properties, making it completely immutable.
 *
 * @param obj - The object to freeze recursively.
 * @returns The frozen object (same reference as input, but now immutable).
 *
 * @example
 * // Basic usage
 * const user = { name: 'John', address: { city: 'New York' } };
 * const frozenUser = deepFreeze(user);
 *
 * @example
 * // Attempting modifications (throws in strict mode)
 * 'use strict';
 * const config = deepFreeze({ api: { timeout: 5000 } });
 * config.api.timeout = 10000; // TypeError: Cannot assign to read only property
 *
 * @example
 * // Nested arrays are also frozen
 * const data = { items: [{ id: 1 }, { id: 2 }] };
 * deepFreeze(data);
 * data.items.push({ id: 3 }); // TypeError: Cannot add property
 * data.items[0].id = 99; // TypeError: Cannot assign to read only property
 *
 * @example
 * // Check if object is frozen
 * const obj = deepFreeze({ a: { b: 1 } });
 * Object.isFrozen(obj); // true
 * Object.isFrozen(obj.a); // true
 *
 * @example
 * // Immutable configuration
 * const appConfig = deepFreeze({
 *   database: { host: 'localhost', port: 5432 },
 *   features: { darkMode: true }
 * });
 * // Cannot modify any nested property
 *
 * @note This is a recursive operation that modifies the original object in place.
 * @note Prevents all properties from being modified, added, or deleted at all nesting levels.
 * @note In strict mode, attempts to modify throw TypeError; in non-strict mode, they silently fail.
 * @note The same object reference is returned, but it's now deeply immutable.
 * @note Useful for configuration objects, constants, and preventing accidental mutations.
 * @note Different from Object.freeze() which only freezes the top level.
 *
 * @complexity Time: O(n) properties, Space: O(n) visited objects and recursion stack.
 */
export function deepFreeze<T extends object>(obj: T): T {
  const seen = new WeakSet<object>();
  const freeze = (current: object): void => {
    if (seen.has(current)) return;
    seen.add(current);
    Object.freeze(current);
    for (const key of Reflect.ownKeys(current)) {
      const value = (current as Record<PropertyKey, unknown>)[key];
      if (typeof value === 'object' && value !== null) freeze(value);
    }
  };
  freeze(obj);
  return obj;
}
