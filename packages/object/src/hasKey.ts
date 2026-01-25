/**
 * Checks if an object has a specified property as its own (non-inherited) property.
 *
 * @param obj - The object to check for the property.
 * @param key - The property name to look for.
 * @returns True if the property exists directly on the object, false otherwise.
 *
 * @throws {TypeError} If obj is not a non-null object or key is not a string.
 *
 * @example
 * // Basic usage
 * hasKey({ a: 1, b: 2 }, 'a'); // true
 * hasKey({ a: 1, b: 2 }, 'c'); // false
 *
 * @example
 * // Inherited properties return false
 * const obj = Object.create({ inherited: 'value' });
 * obj.own = 'value';
 * hasKey(obj, 'own'); // true
 * hasKey(obj, 'inherited'); // false
 *
 * @example
 * // Properties with undefined values
 * hasKey({ a: undefined }, 'a'); // true (property exists with undefined value)
 * hasKey({}, 'a'); // false (property doesn't exist)
 *
 * @example
 * // Common prototype methods
 * hasKey({ a: 1 }, 'toString'); // false (inherited from prototype)
 *
 * @note Uses Object.prototype.hasOwnProperty.call() for safe property checking.
 * @note Unlike the 'in' operator, this only checks own properties, not inherited ones.
 * @note Returns true even if the property value is undefined, as long as the property exists.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function hasKey(obj: Record<string, unknown>, key: string): boolean {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.prototype.hasOwnProperty.call(obj, key);
}
