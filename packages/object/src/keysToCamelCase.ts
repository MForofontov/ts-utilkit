/**
 * Recursively converts object keys from snake_case or kebab-case to camelCase.
 * Handles nested objects and arrays, preserving the original values.
 *
 * @param obj - The object or array whose keys should be converted.
 * @returns A new object or array with all keys converted to camelCase.
 *
 * @throws {TypeError} If input is not an object, array, or is null.
 *
 * @example
 * // Basic snake_case to camelCase
 * keysToCamelCase({ 'first_name': 'John', 'last_name': 'Doe' });
 * // { firstName: 'John', lastName: 'Doe' }
 *
 * @example
 * // Kebab-case to camelCase
 * keysToCamelCase({ 'user-id': 123, 'is-active': true });
 * // { userId: 123, isActive: true }
 *
 * @example
 * // Nested objects
 * keysToCamelCase({ user_profile: { first_name: 'Alice', home_address: { street_name: 'Main' } } });
 * // { userProfile: { firstName: 'Alice', homeAddress: { streetName: 'Main' } } }
 *
 * @example
 * // Arrays with objects
 * keysToCamelCase({ user_list: [{ first_name: 'Bob' }, { first_name: 'Carol' }] });
 * // { userList: [{ firstName: 'Bob' }, { firstName: 'Carol' }] }
 *
 * @note Converts both snake_case (using underscores) and kebab-case (using hyphens) to camelCase.
 * @note Creates a new object/array and does not modify the original input.
 * @note Recursively processes nested objects and arrays at any depth.
 * @note Non-object values (strings, numbers, etc.) are preserved as-is.
 * @note Useful for converting API responses from backend conventions to JavaScript conventions.
 *
 * @complexity Time: O(n), Space: O(n) where n is the total number of keys in all nested objects
 */
export function keysToCamelCase(
  obj: Record<string, unknown> | unknown[],
): Record<string, unknown> | unknown[] {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('Input must be a non-null object');
  }

  const transform = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map((v) => transform(v));
    }
    if (value !== null && typeof value === 'object') {
      const entries = Object.entries(value).map(([k, v]) => [
        typeof k === 'string'
          ? (/[-_]/.test(k) ? k.toLowerCase() : k).replace(
              /[-_]+([a-zA-Z0-9])/g,
              (_, char: string) => char.toUpperCase(),
            )
          : k,
        transform(v),
      ]);
      return Object.fromEntries(entries) as Record<string, unknown>;
    }
    return value;
  };

  return transform(obj) as typeof obj;
}
