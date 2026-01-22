/**
 * Creates a test suite for type validation errors.
 * Tests that a function throws TypeError for invalid input types.
 *
 * @param fn - The function to test.
 * @param invalidInputs - Array of invalid inputs to test.
 * @param paramName - Name of the parameter being validated.
 * @returns Array of boolean results (true if TypeError was thrown).
 *
 * @throws {TypeError} If fn is not a function or invalidInputs is not an array.
 * @throws {TypeError} If paramName is not a string.
 *
 * @example
 * const results = testInvalidTypes(
 *   myFunction,
 *   ['string', null, undefined, {}],
 *   'value'
 * );
 * expect(results.every(r => r)).toBe(true);
 *
 * @example
 * // Test that all invalid inputs throw TypeError
 * const invalidInputs = [null, undefined, [], {}];
 * testInvalidTypes(myNumberFunction, invalidInputs, 'num').forEach((passed, i) => {
 *   expect(passed).toBe(true);
 * });
 *
 * @complexity Time: O(n) where n is invalidInputs length, Space: O(n)
 */
export function testInvalidTypes(
  fn: (arg: unknown) => unknown,
  invalidInputs: unknown[],
  paramName: string,
): boolean[] {
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }
  if (!Array.isArray(invalidInputs)) {
    throw new TypeError('invalidInputs must be an array');
  }
  if (typeof paramName !== 'string') {
    throw new TypeError(`paramName must be a string, got ${typeof paramName}`);
  }

  return invalidInputs.map((input) => {
    try {
      fn(input);
      return false; // Should have thrown
    } catch (error) {
      return error instanceof TypeError;
    }
  });
}
