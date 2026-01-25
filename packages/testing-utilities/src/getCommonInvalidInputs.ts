/**
 * Creates test cases for common invalid inputs.
 *
 * @returns Array of common invalid inputs for testing.
 *
 * @example
 * const invalidInputs = getCommonInvalidInputs();
 * invalidInputs.forEach(input => {
 *   expect(() => myFunction(input)).toThrow();
 * });
 *
 * @example
 * // Test type validation
 * const invalidInputs = getCommonInvalidInputs();
 * invalidInputs.forEach((input, i) => {
 *   it(`should throw for invalid input ${i}`, () => {
 *     expect(() => myFunction(input as never)).toThrow(TypeError);
 *   });
 * });
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getCommonInvalidInputs(): unknown[] {
  return [
    null,
    undefined,
    NaN,
    '',
    [],
    {},
    true,
    false,
    () => {},
    Symbol('test'),
    new Date(),
    /regex/,
  ];
}
