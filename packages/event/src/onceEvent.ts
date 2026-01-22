/**
 * Creates a wrapper function that ensures a handler is called at most once,
 * ignoring subsequent invocations. Useful for initialization handlers or one-time actions.
 *
 * @param handler - The function to wrap.
 * @returns A wrapped function that executes only once and caches the result.
 *
 * @throws {TypeError} If handler is not a function.
 *
 * @example
 * // Basic usage
 * const initOnce = onceEvent(() => {
 *   console.log('Initialization');
 *   return { initialized: true };
 * });
 *
 * initOnce(); // Logs 'Initialization' and returns { initialized: true }
 * initOnce(); // Returns cached result, doesn't log
 * initOnce(); // Returns cached result, doesn't log
 *
 * @example
 * // Event handler that should only run once
 * const handleFirstClick = onceEvent((event) => {
 *   console.log('First click!', event);
 * });
 *
 * button.addEventListener('click', handleFirstClick);
 * // Only the first click will be logged
 *
 * @example
 * // With return value
 * const getToken = onceEvent(async () => {
 *   const response = await fetch('/api/token');
 *   return response.json();
 * });
 *
 * const token1 = await getToken(); // Fetches from API
 * const token2 = await getToken(); // Returns cached promise
 *
 * @note The wrapped function returns the same result (or promise) on subsequent calls.
 * @note The handler's `this` context is preserved.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function onceEvent<T extends unknown[], R>(
  handler: (...args: T) => R,
): (...args: T) => R {
  if (typeof handler !== 'function') {
    throw new TypeError(`handler must be a function, got ${typeof handler}`);
  }

  let called = false;
  let result: R;

  return function (this: unknown, ...args: T): R {
    if (!called) {
      called = true;
      result = handler.apply(this, args);
    }
    return result;
  };
}
