/**
 * Recursively converts object keys from camelCase to snake_case.
 * Handles nested objects and arrays, preserving the original values.
 *
 * @param obj - The object or array whose keys should be converted.
 * @returns A new object or array with all keys converted to snake_case.
 *
 * @throws {TypeError} If input is not an object, array, or is null.
 *
 * @example
 * // Basic camelCase to snake_case
 * keysToSnakeCase({ firstName: 'John', lastName: 'Doe' });
 * // { first_name: 'John', last_name: 'Doe' }
 *
 * @example
 * // With acronyms and multiple capitals
 * keysToSnakeCase({ userId: 123, isHTTPSEnabled: true });
 * // { user_id: 123, is_https_enabled: true }
 *
 * @example
 * // Nested objects
 * keysToSnakeCase({ userProfile: { firstName: 'Alice', homeAddress: { streetName: 'Main' } } });
 * // { user_profile: { first_name: 'Alice', home_address: { street_name: 'Main' } } }
 *
 * @example
 * // Arrays with objects
 * keysToSnakeCase({ userList: [{ firstName: 'Bob' }, { firstName: 'Carol' }] });
 * // { user_list: [{ first_name: 'Bob' }, { first_name: 'Carol' }] }
 *
 * @note Creates a new object/array and does not modify the original input.
 * @note Treats consecutive capital letters as a single word (HTTPSEnabled → https_enabled).
 * @note Recursively processes nested objects and arrays at any depth.
 * @note Non-object values (strings, numbers, etc.) are preserved as-is.
 * @note Useful for converting JavaScript objects to backend/database naming conventions.
 *
 * @complexity Time: O(n), Space: O(n) where n is the total number of keys in all nested objects
 */
export function keysToSnakeCase(
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
          ? k
              .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
              .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
              .toLowerCase()
          : k,
        transform(v),
      ]);
      return Object.fromEntries(entries) as Record<string, unknown>;
    }
    return value;
  };

  return transform(obj) as typeof obj;
}
