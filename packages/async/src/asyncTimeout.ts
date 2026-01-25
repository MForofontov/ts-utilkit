/**
 * Adds a timeout to any promise, rejecting if the timeout is exceeded.
 *
 * @param promise - The promise to add timeout to.
 * @param timeoutMs - Timeout duration in milliseconds.
 * @param timeoutMessage - Custom error message for timeout (default: 'Operation timed out').
 * @returns Promise that resolves with the original promise result or rejects on timeout.
 *
 * @throws {TypeError} If promise is not a Promise or timeoutMs is not a number.
 * @throws {Error} If timeoutMs is negative or timeoutMessage is not a string.
 * @throws {Error} With timeout message if the operation times out.
 *
 * @example
 * // Basic timeout
 * const result = await asyncTimeout(
 *   fetch('/api/data'),
 *   5000
 * ); // Times out after 5 seconds
 *
 * @example
 * // Custom timeout message
 * const result = await asyncTimeout(
 *   longRunningOperation(),
 *   10000,
 *   'Long operation timed out'
 * );
 *
 * @example
 * // Timeout with async function
 * const result = await asyncTimeout(
 *   (async () => {
 *     await delay(15000);
 *     return 'completed';
 *   })(),
 *   10000
 * ); // Will throw timeout error
 *
 * @note The timeout does not cancel the original promise, it just stops waiting for it.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function asyncTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage?: string,
): Promise<T> {
  // Runtime validation for promise parameter (defensive check despite TypeScript typing)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Validating promise interface at runtime
  if (!promise || typeof promise.then !== 'function') {
    throw new TypeError(`promise must be a Promise, got ${typeof promise}`);
  }

  if (typeof timeoutMs !== 'number' || isNaN(timeoutMs)) {
    throw new TypeError(`timeoutMs must be a number, got ${typeof timeoutMs}`);
  }

  if (timeoutMs < 0) {
    throw new Error(`timeoutMs must be non-negative, got ${timeoutMs}`);
  }

  // Validate timeoutMessage if provided
  if (timeoutMessage !== undefined && typeof timeoutMessage !== 'string') {
    throw new Error(
      `timeoutMessage must be a string, got ${typeof timeoutMessage}`,
    );
  }

  // Default message
  const actualMessage = timeoutMessage ?? 'Operation timed out';

  return new Promise<T>((resolve, reject) => {
    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(actualMessage));
    }, timeoutMs);

    // Wait for original promise
    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error: unknown) => {
        clearTimeout(timeoutId);
        // Propagate original error without wrapping to preserve error type and stack
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Preserving original rejection reason
        reject(error);
      });
  });
}
