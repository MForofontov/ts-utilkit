/**
 * Retries an async function with configurable attempts and delay between retries.
 *
 * @param fn - The async function to retry.
 * @param options - Configuration options for retry behavior.
 * @param options.maxAttempts - Maximum number of attempts (default: 3).
 * @param options.delay - Delay between retries in milliseconds (default: 1000).
 * @param options.backoff - Backoff strategy: 'fixed', 'linear', or 'exponential' (default: 'fixed').
 * @param options.onRetry - Callback function called on each retry attempt.
 * @returns Promise that resolves with the successful result or rejects with the final error.
 *
 * @throws {TypeError} If fn is not a function.
 * @throws {Error} If maxAttempts is less than 1 or delay is negative.
 *
 * @example
 * // Basic retry with default settings
 * const result = await asyncRetry(async () => {
 *   const response = await fetch('/api/data');
 *   if (!response.ok) throw new Error('Network error');
 *   return response.json();
 * }); // Retries up to 3 times with 1s delay
 *
 * @example
 * // Custom retry configuration
 * const result = await asyncRetry(
 *   async () => unstableApiCall(),
 *   {
 *     maxAttempts: 5,
 *     delay: 500,
 *     backoff: 'exponential',
 *     onRetry: (attempt, error) => console.log(`Retry ${attempt}: ${error.message}`)
 *   }
 * );
 *
 * @example
 * // Linear backoff retry
 * const result = await asyncRetry(
 *   async () => databaseQuery(),
 *   { maxAttempts: 4, delay: 1000, backoff: 'linear' }
 * ); // Delays: 1s, 2s, 3s, 4s
 *
 * @note The function will throw the last error if all retry attempts fail.
 *
 * @complexity Time: O(n) where n is maxAttempts, Space: O(1)
 */
export function asyncRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: 'fixed' | 'linear' | 'exponential';
    onRetry?: (attempt: number, error: Error) => void;
  } = {},
): Promise<T> {
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }

  const { maxAttempts = 3, delay = 1000, backoff = 'fixed', onRetry } = options;

  if (typeof maxAttempts !== 'number' || maxAttempts < 1) {
    throw new Error(
      `maxAttempts must be a positive number, got ${maxAttempts}`,
    );
  }

  if (typeof delay !== 'number' || delay < 0) {
    throw new Error(`delay must be a non-negative number, got ${delay}`);
  }

  if (!['fixed', 'linear', 'exponential'].includes(backoff)) {
    throw new Error(
      `backoff must be 'fixed', 'linear', or 'exponential', got ${backoff}`,
    );
  }

  if (onRetry !== undefined && typeof onRetry !== 'function') {
    throw new TypeError(`onRetry must be a function, got ${typeof onRetry}`);
  }

  // After validation, return the async implementation
  return (async () => {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxAttempts) {
          throw lastError;
        }

        if (onRetry) {
          onRetry(attempt, lastError);
        }

        // Calculate delay based on backoff strategy
        let currentDelay: number;
        switch (backoff) {
          case 'linear':
            currentDelay = delay * attempt;
            break;
          case 'exponential':
            currentDelay = delay * Math.pow(2, attempt - 1);
            break;
          case 'fixed':
          default:
            currentDelay = delay;
            break;
        }

        await new Promise((resolve) => setTimeout(resolve, currentDelay));
      }
    }

    // This should never be reached, but TypeScript requires it
    throw lastError!;
  })();
}
