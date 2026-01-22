/**
 * Returns a promise that resolves after a specified delay.
 *
 * @param ms - The delay in milliseconds (must be non-negative).
 * @returns A promise that resolves after the specified delay with no value.
 *
 * @throws {TypeError} If ms is not a number.
 * @throws {Error} If ms is negative or NaN.
 *
 * @example
 * // Basic usage
 * await delay(2000); // Waits 2 seconds
 * console.log('Waited 2 seconds');
 *
 * @example
 * // With promise chaining
 * delay(1000).then(() => console.log('After 1 second'));
 *
 * @example
 * // In async workflows
 * async function processSteps() {
 *   console.log('Step 1');
 *   await delay(500);
 *   console.log('Step 2');
 *   await delay(500);
 *   console.log('Step 3');
 * }
 *
 * @note This is a promisified wrapper around setTimeout for use in async/await contexts.
 * @note Useful for pausing execution in async workflows, rate limiting, or adding delays between operations.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function delay(ms: number): Promise<void> {
  if (typeof ms !== 'number') {
    throw new TypeError(`ms must be a number, got ${typeof ms}`);
  }
  if (Number.isNaN(ms) || ms < 0) {
    throw new Error('ms must be a non-negative number');
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}
