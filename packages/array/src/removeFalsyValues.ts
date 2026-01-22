/**
 * Removes falsy values from an array (false, 0, "", null, undefined, NaN).
 * Creates a new array containing only the truthy values from the input array.
 *
 * @param arr - The array with possible falsy values.
 * @returns A new array without any falsy values.
 *
 * @example
 * // Basic usage with mixed values
 * removeFalsyValues([0, 1, false, 2, "", 3, null, 4, undefined, NaN]); // Returns [1, 2, 3, 4]
 *
 * @example
 * // With objects and arrays (which are always truthy)
 * removeFalsyValues([{}, [], false, "hello"]); // Returns [{}, [], "hello"]
 *
 * @example
 * // With only falsy values
 * removeFalsyValues([false, 0, "", null, undefined, NaN]); // Returns []
 *
 * @example
 * // Empty array
 * removeFalsyValues([]); // Returns []
 *
 * @example
 * // Real-world: Clean form field values
 * const formValues = ['John', '', 'Doe', null, '30', undefined];
 * const cleanedValues = removeFalsyValues(formValues);
 * // ['John', 'Doe', '30'] - only valid entries
 *
 * @note This function uses JavaScript's boolean coercion rules to determine truthiness.
 * In JavaScript, the following values are considered falsy: false, 0, "" (empty string),
 * null, undefined, and NaN. All other values are truthy, including empty objects and arrays.
 * @note Does not remove empty arrays [] or empty objects {} as they are truthy.
 * @note Does not remove the string "false" or "0" as strings are truthy.
 * @note Useful for cleaning user input, API responses, and form data.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function removeFalsyValues<T>(
  arr: unknown[],
): NonNullable<Exclude<T, false | '' | 0>>[] {
  return arr.filter(
    (value): value is NonNullable<Exclude<T, false | '' | 0>> => {
      return (
        value !== false &&
        value !== 0 &&
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(typeof value === 'number' && Number.isNaN(value))
      );
    },
  );
}
