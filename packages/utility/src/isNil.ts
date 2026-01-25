/**
 * Checks if a value is null or undefined (nullish).
 *
 * @param value - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 *
 * @example
 * // Basic usage
 * isNil(null); // true
 * isNil(undefined); // true
 *
 * @example
 * // Falsy values that are not nil
 * isNil(0); // false
 * isNil(""); // false
 * isNil(false); // false
 * isNil(NaN); // false
 *
 * @example
 * // Common use case: checking before property access
 * if (!isNil(user)) {
 *   console.log(user.name);
 * }
 *
 * @note This performs a strict equality check against `null` and `undefined`.
 * @note Useful for distinguishing between nullish values and other falsy values (0, "", false, NaN).
 * @note Equivalent to checking `value == null` but more explicit and readable.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isNil(value: unknown): boolean {
  return value === null || value === undefined;
}
