/**
 * Debounces a promise-returning function, resolving only after the
 * specified delay has elapsed since the last invocation.
 *
 * @param func - The async function to debounce.
 * @param wait - The debounce delay in milliseconds.
 * @returns A debounced version of the function that returns a Promise.
 *
 * @throws {TypeError} If func is not a function or wait is not a number.
 * @throws {Error} If wait is negative or NaN.
 *
 * @example
 * // Basic usage with API calls
 * const fetchData = async (query: string) => fetch(`/api/search?q=${query}`);
 * const fetchDebounced = debounceAsync(fetchData, 300);
 * fetchDebounced('typescript'); // Only calls after 300ms of inactivity
 *
 * @example
 * // User input search
 * const searchAPI = debounceAsync(async (term: string) => {
 *   const response = await fetch(`/search?q=${term}`);
 *   return response.json();
 * }, 500);
 * // Only executes after user stops typing for 500ms
 *
 * @example
 * // Multiple rapid calls (only last one executes)
 * const save = debounceAsync(async (data: object) => {
 *   return await saveToDatabase(data);
 * }, 1000);
 * save({ name: 'A' }); // Cancelled
 * save({ name: 'B' }); // Cancelled
 * save({ name: 'C' }); // Executes after 1000ms
 *
 * @example
 * // With different argument types
 * const logAsync = debounceAsync(async (msg: string, level: number) => {
 *   console.log(`[${level}] ${msg}`);
 * }, 200);
 *
 * @note Useful for rate-limiting API calls, search inputs, or expensive async operations.
 * @note The timer resets on each call until the function stops being invoked.
 * @note Only the most recent call's arguments are used when the function finally executes.
 * @note Earlier invocations are cancelled, not queued (only the last call executes).
 * @note Returns a Promise that resolves with the result of the async function.
 *
 * @complexity Time: O(1) per invocation, Space: O(1)
 */
export function debounceAsync<Args extends unknown[], R>(
  func: (...args: Args) => Promise<R>,
  wait: number,
): (...args: Args) => Promise<R> {
  if (typeof func !== 'function') {
    throw new TypeError(`func must be a function, got ${typeof func}`);
  }
  if (typeof wait !== 'number') {
    throw new TypeError(`wait must be a number, got ${typeof wait}`);
  }
  if (Number.isNaN(wait) || wait < 0) {
    throw new Error('wait must be a non-negative number');
  }

  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) =>
    new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => resolve(func(...args)), wait);
    });
}
