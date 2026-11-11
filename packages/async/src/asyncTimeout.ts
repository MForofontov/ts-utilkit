/**
 * Adds a timeout to any promise, rejecting if the timeout is exceeded.
 *
 * @param promise - The promise to add timeout to.
 * @param timeoutMs - Non-negative timeout in milliseconds, or Infinity for an unbounded wait.
 * @param timeoutMessage - Custom error message for timeout (default: 'Operation timed out').
 * @returns Promise that resolves with the original promise result or rejects on timeout.
 *
 * @throws {Error} If timeoutMs is negative, NaN, or not a number, or timeoutMessage is not a string.
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
 * @note Long waits are scheduled in bounded timer chunks using a monotonic clock.
 * @note Fractional deadlines are never rounded down to an earlier timeout.
 *
 * @complexity Time: O(1) per timer chunk, Space: O(1)
 */
export function asyncTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage?: string,
): Promise<T> {
  if (
    typeof timeoutMs !== 'number' ||
    Number.isNaN(timeoutMs) ||
    timeoutMs < 0
  ) {
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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const startedAt = performance.now();
    const stopTimer = (): void => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };
    const schedule = (remaining: number): void => {
      timeoutId = setTimeout(
        () => {
          timeoutId = undefined;
          const left = timeoutMs - (performance.now() - startedAt);
          if (left > 0) schedule(left);
          else reject(new Error(actualMessage));
        },
        Math.min(remaining, 2_147_483_647),
      );
    };
    if (timeoutMs !== Infinity) schedule(timeoutMs);

    void promise.then(
      (result) => {
        stopTimer();
        resolve(result);
      },
      (error: unknown) => {
        stopTimer();
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Preserve the original rejection reason
        reject(error);
      },
    );
  });
}
