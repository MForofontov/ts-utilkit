import { delay as delayFn } from '@ts-utilkit/utility';

/**
 * Repeatedly calls an async function at a fixed interval until a condition
 * function returns `true` for the result, or until a timeout is exceeded.
 *
 * @param fn - Async function to call on each poll attempt. Must return a Promise.
 * @param condition - Synchronous predicate; polling stops when this returns `true`.
 * @param options - Polling configuration.
 * @param options.intervalMs - Milliseconds to wait between poll attempts (default: 1000).
 * @param options.timeoutMs - Maximum total milliseconds before a timeout error is thrown
 * (default: 30000).
 * @param options.onPoll - Optional callback invoked after every poll, receiving the
 * result and the 1-based attempt number.
 * @returns Promise that resolves with the first result that satisfies `condition`.
 *
 * @throws {Error} If `options.intervalMs` is not a positive number.
 * @throws {Error} If `options.timeoutMs` is not a positive number.
 * @throws {Error} If the timeout is exceeded before the condition is met.
 *
 * @example
 * // Poll a job status endpoint until the job is complete
 * const job = await asyncPoll(
 *   () => fetch('/api/jobs/123').then(r => r.json()),
 *   (result) => result.status === 'complete',
 *   { intervalMs: 2000, timeoutMs: 60000 },
 * );
 *
 * @example
 * // Poll with progress logging
 * const result = await asyncPoll(
 *   () => checkDatabaseReady(),
 *   (ready) => ready === true,
 *   {
 *     intervalMs: 500,
 *     timeoutMs: 10000,
 *     onPoll: (result, attempt) => console.log(`Attempt ${attempt}:`, result),
 *   },
 * );
 *
 * @example
 * // Condition met immediately on first poll
 * const value = await asyncPoll(
 *   async () => 42,
 *   (n) => n === 42,
 *   { intervalMs: 100, timeoutMs: 1000 },
 * ); // Resolves immediately with 42
 *
 * @note Timeout is evaluated at the START of each poll attempt. An individual
 * `fn()` call that runs longer than `timeoutMs` will still complete before
 * the timeout error is thrown on the following iteration check.
 *
 * @complexity Time: O(t / i) where t is timeoutMs and i is intervalMs, Space: O(1)
 */
export function asyncPoll<T>(
  fn: () => Promise<T>,
  condition: (result: T) => boolean,
  options: {
    intervalMs?: number;
    timeoutMs?: number;
    onPoll?: (result: T, attempt: number) => void;
  } = {},
): Promise<T> {
  const { intervalMs = 1000, timeoutMs = 30000, onPoll } = options;

  if (intervalMs <= 0) {
    throw new Error(`intervalMs must be a positive number, got ${intervalMs}`);
  }

  if (timeoutMs <= 0) {
    throw new Error(`timeoutMs must be a positive number, got ${timeoutMs}`);
  }

  return (async () => {
    const deadline = Date.now() + timeoutMs;
    let attempt = 0;

    while (true) {
      if (Date.now() >= deadline) {
        throw new Error(
          `asyncPoll timed out after ${timeoutMs}ms (${attempt} attempts)`,
        );
      }

      const result = await fn();
      attempt++;

      if (onPoll) {
        onPoll(result, attempt);
      }

      if (condition(result)) {
        return result;
      }

      await delayFn(intervalMs);
    }
  })();
}
