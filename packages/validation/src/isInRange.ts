/**
 * Validates if a number is within a specified range.
 *
 * @param value - The number to validate.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @param inclusive - Whether the range is inclusive of min and max values (default: true).
 * @returns True if the value is within the specified range, false otherwise.
 *
 * @throws {TypeError} If value, min, or max is not a number, or if inclusive is not a boolean.
 * @throws {Error} If any of the numbers are NaN, or if min is greater than max.
 *
 * @example
 * // Inclusive range (default)
 * isInRange(5, 1, 10); // true
 * isInRange(1, 1, 10); // true (boundary included)
 * isInRange(10, 1, 10); // true (boundary included)
 * isInRange(0, 1, 10); // false
 * isInRange(11, 1, 10); // false
 *
 * @example
 * // Exclusive range
 * isInRange(5, 1, 10, false); // true
 * isInRange(1, 1, 10, false); // false (boundary excluded)
 * isInRange(10, 1, 10, false); // false (boundary excluded)
 * isInRange(1.1, 1, 10, false); // true
 * isInRange(9.9, 1, 10, false); // true
 *
 * @example
 * // Negative numbers and decimals
 * isInRange(-5, -10, 0); // true
 * isInRange(3.14, 3, 4); // true
 * isInRange(2.99, 3, 4, false); // false
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isInRange(
  value: number,
  min: number,
  max: number,
  inclusive: boolean = true,
): boolean {
  if (typeof value !== 'number') {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }

  if (typeof min !== 'number') {
    throw new TypeError(`min must be a number, got ${typeof min}`);
  }

  if (typeof max !== 'number') {
    throw new TypeError(`max must be a number, got ${typeof max}`);
  }

  if (typeof inclusive !== 'boolean') {
    throw new TypeError(`inclusive must be a boolean, got ${typeof inclusive}`);
  }

  if (isNaN(value)) {
    throw new Error('value must be a valid number, not NaN');
  }

  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }

  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }

  if (min > max) {
    throw new Error(`min (${min}) must be less than or equal to max (${max})`);
  }

  if (inclusive) {
    return value >= min && value <= max;
  } else {
    return value > min && value < max;
  }
}
