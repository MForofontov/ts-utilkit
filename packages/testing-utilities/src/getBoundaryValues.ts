/**
 * Interface for boundary test values.
 */
export interface BoundaryValues {
  zero: number;
  positiveOne: number;
  negativeOne: number;
  maxSafeInteger: number;
  minSafeInteger: number;
  maxValue: number;
  minValue: number;
  epsilon: number;
  positiveInfinity: number;
  negativeInfinity: number;
  nan: number;
}

/**
 * Creates test cases for boundary values.
 * Useful for testing numeric functions with edge cases.
 *
 * @returns Object containing common boundary test values.
 *
 * @example
 * const boundaries = getBoundaryValues();
 * expect(myFunction(boundaries.maxSafeInteger)).toBeDefined();
 * expect(myFunction(boundaries.minSafeInteger)).toBeDefined();
 *
 * @example
 * // Test all boundary values
 * const boundaries = getBoundaryValues();
 * Object.entries(boundaries).forEach(([name, value]) => {
 *   it(`should handle ${name}`, () => {
 *     expect(() => myFunction(value)).not.toThrow();
 *   });
 * });
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getBoundaryValues(): BoundaryValues {
  return {
    zero: 0,
    positiveOne: 1,
    negativeOne: -1,
    maxSafeInteger: Number.MAX_SAFE_INTEGER,
    minSafeInteger: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_VALUE,
    minValue: Number.MIN_VALUE,
    epsilon: Number.EPSILON,
    positiveInfinity: Number.POSITIVE_INFINITY,
    negativeInfinity: Number.NEGATIVE_INFINITY,
    nan: NaN,
  };
}
