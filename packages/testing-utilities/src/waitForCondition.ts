/**
 * Waits for a condition to be true (useful for async tests).
 *
 * @param condition - Function that returns true when condition is met.
 * @param timeout - Maximum time to wait in milliseconds (default: 5000).
 * @param interval - Check interval in milliseconds (default: 50).
 * @returns Promise that resolves when condition is met or rejects on timeout.
 *
 * @throws {TypeError} If condition is not a function.
 * @throws {Error} If timeout or interval are not positive numbers.
 * @throws {Error} If condition is not met within timeout.
 *
 * @example
 * await waitForCondition(() => myAsyncState.isReady, 3000);
 * expect(myAsyncState.data).toBeDefined();
 *
 * @example
 * // Wait for DOM element to appear
 * await waitForCondition(
 *   () => document.querySelector('.loaded') !== null,
 *   5000,
 *   100
 * );
 *
 * @complexity Time: O(timeout/interval), Space: O(1)
 */
export async function waitForCondition(
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 50,
): Promise<void> {
  if (typeof condition !== 'function') {
    throw new TypeError(
      `condition must be a function, got ${typeof condition}`,
    );
  }
  if (typeof timeout !== 'number' || timeout <= 0) {
    throw new Error('timeout must be a positive number');
  }
  if (typeof interval !== 'number' || interval <= 0) {
    throw new Error('interval must be a positive number');
  }

  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Condition not met within ${timeout}ms`));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}
