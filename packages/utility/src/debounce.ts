/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce.
 * @param delay - The debounce delay in milliseconds (time to wait before executing).
 * @returns A debounced version of the function that delays execution.
 *
 * @throws {TypeError} If func is not a function.
 * @throws {TypeError} If delay is not a number.
 * @throws {Error} If delay is negative or NaN.
 *
 * @example
 * // Search input debouncing
 * const debouncedSearch = debounce((query) => {
 *   console.log('Searching for:', query);
 * }, 300);
 * debouncedSearch('hello'); // Only executes after 300ms of no more calls
 *
 * @example
 * // Window resize handler
 * const debouncedResize = debounce(() => {
 *   console.log('Window resized!');
 * }, 250);
 * window.addEventListener('resize', debouncedResize);
 *
 * @example
 * // Form validation
 * const validateInput = debounce((value) => {
 *   // Validate after user stops typing
 *   console.log('Validating:', value);
 * }, 500);
 *
 * @example
 * // API call rate limiting
 * const debouncedApi = debounce(async () => {
 *   await fetch('/api/data');
 * }, 1000);
 *
 * @note Uses setTimeout to postpone function execution.
 * @note Each new call resets the timer; only the last invocation runs after the delay.
 * @note Preserves function context (this) and passes through all arguments.
 * @note Common use cases: search inputs, window resize, scroll events, form validation.
 * @note Different from throttle: debounce waits for quiet period, throttle enforces max rate.
 *
 * @complexity Time: O(1) per invocation, Space: O(1)
 */
export function debounce<Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay: number,
): (...args: Args) => void {
  if (typeof func !== 'function') {
    throw new TypeError(`func must be a function, got ${typeof func}`);
  }
  if (typeof delay !== 'number') {
    throw new TypeError(`delay must be a number, got ${typeof delay}`);
  }
  if (Number.isNaN(delay) || delay < 0) {
    throw new Error('delay must be a non-negative number');
  }

  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
