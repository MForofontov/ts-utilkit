/**
 * Checks if a value is null or undefined (nullish).
 *
 * @deprecated Use the native `value == null` check directly, or an explicit
 * `value === null || value === undefined` check for better readability.
 * Will be removed in the next major version.
 *
 * @param value - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 *
 * @example
 * isNil(null);      // true
 * isNil(undefined); // true
 * isNil(0);         // false
 * isNil('');        // false
 *
 * @note Equivalent to checking `value == null` but more explicit and readable.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isNil(value: unknown): boolean {
  return value === null || value === undefined;
}
