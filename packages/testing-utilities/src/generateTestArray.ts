/**
 * Generates random test data for array testing.
 *
 * @template T - The type of elements in the array.
 * @param length - Length of the array to generate.
 * @param generator - Function to generate each element (default: random number 0-100).
 * @returns Array of generated test data.
 *
 * @throws {Error} If length is not a non-negative number.
 * @throws {TypeError} If generator is not a function.
 *
 * @example
 * const testArray = generateTestArray(100, () => Math.random() * 1000);
 * const result = myArrayFunction(testArray);
 *
 * @example
 * // Generate array of objects
 * const users = generateTestArray(50, i => ({
 *   id: i,
 *   name: `User${i}`,
 *   active: Math.random() > 0.5
 * }));
 *
 * @complexity Time: O(n) where n is length, Space: O(n)
 */
export function generateTestArray<T>(
  length: number,
  generator: (index: number) => T = ((i: number) =>
    Math.floor(Math.random() * 100)) as (index: number) => T,
): T[] {
  if (typeof length !== 'number' || length < 0) {
    throw new Error('length must be a non-negative number');
  }
  if (typeof generator !== 'function') {
    throw new TypeError(
      `generator must be a function, got ${typeof generator}`,
    );
  }

  return Array.from({ length }, (_, i) => generator(i));
}
