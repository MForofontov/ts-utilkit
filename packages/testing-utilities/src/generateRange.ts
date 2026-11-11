/**
 * Generates a range of numbers for testing edge cases.
 *
 * @param start - Start of range (inclusive).
 * @param end - End of range (inclusive).
 * @param step - Step between values (default: 1).
 * @returns Array of numbers in the specified range.
 *
 * @throws {Error} If step is not positive.
 * @throws {RangeError} If endpoints are not finite or step cannot advance the range.
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
  if (typeof step !== 'number' || isNaN(step) || step <= 0) {
    throw new Error('step must be a positive number');
  }

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new RangeError('start and end must be finite numbers');
  }

  const result: number[] = [];
  for (let i = start; i <= end; ) {
    result.push(i);
    if (i === end) break;
    const next = i + step;
    if (next === i) {
      throw new RangeError('step is too small to advance the range');
    }
    i = next;
  }
  return result;
}
