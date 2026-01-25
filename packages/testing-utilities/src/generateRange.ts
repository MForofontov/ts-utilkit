/**
 * Generates a range of numbers for testing edge cases.
 *
 * @param start - Start of range (inclusive).
 * @param end - End of range (inclusive).
 * @param step - Step between values (default: 1).
 * @returns Array of numbers in the specified range.
 *
 * @throws {TypeError} If start, end, or step are not valid numbers.
 * @throws {Error} If step is not positive.
 *
 * @example
 * const testValues = generateRange(0, 10, 2); // [0, 2, 4, 6, 8, 10]
 * testValues.forEach(value => {
 *   expect(myFunction(value)).toBeDefined();
 * });
 *
 * @example
 * // Generate boundary test values
 * const boundaries = generateRange(-100, 100, 25);
 * boundaries.forEach(val => {
 *   const result = myFunction(val);
 *   expect(result).toBeGreaterThanOrEqual(0);
 * });
 *
 * @complexity Time: O(n) where n is (end-start)/step, Space: O(n)
 */
export function generateRange(
  start: number,
  end: number,
  step: number = 1,
): number[] {
  if (typeof start !== 'number' || isNaN(start)) {
    throw new TypeError('start must be a valid number');
  }
  if (typeof end !== 'number' || isNaN(end)) {
    throw new TypeError('end must be a valid number');
  }
  if (typeof step !== 'number' || isNaN(step) || step <= 0) {
    throw new Error('step must be a positive number');
  }

  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}
