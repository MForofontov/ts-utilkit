/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds.
 *
 * @param func - The function to throttle.
 * @param limit - The time interval in milliseconds (minimum time between executions).
 * @returns A throttled version of the function that enforces rate limiting.
 *
 * @throws {TypeError} If func is not a function.
 * @throws {TypeError} If limit is not a number.
 * @throws {Error} If limit is negative or NaN.
 *
 * @example
 * // Scroll event throttling
 * const throttledScroll = throttle(() => {
 *   console.log('Scrolled!');
 * }, 1000);
 * window.addEventListener('scroll', throttledScroll);
 * // Logs at most once per second, even with rapid scrolling
 *
 * @example
 * // Mouse move tracking
 * const throttledMove = throttle((event) => {
 *   console.log('Mouse position:', event.clientX, event.clientY);
 * }, 100);
 * document.addEventListener('mousemove', throttledMove);
 *
 * @example
 * // Button click rate limiting
 * const throttledClick = throttle(() => {
 *   console.log('Button clicked!');
 * }, 2000);
 * button.addEventListener('click', throttledClick);
 * // Ignores rapid clicks, max one execution per 2 seconds
 *
 * @example
 * // API polling control
 * const throttledPoll = throttle(async () => {
 *   await fetch('/api/status');
 * }, 5000);
 * // Ensures polling doesn't exceed once per 5 seconds
 *
 * @note Executes immediately on first call, then enforces rate limit.
 * @note Uses timestamps to track last execution time.
 * @note Includes trailing call mechanism - ensures last call executes if within limit.
 * @note Preserves function context (this) and passes through all arguments.
 * @note Common use cases: scroll events, mouse movements, window resize, API polling.
 * @note Different from debounce: throttle enforces max rate, debounce waits for quiet period.
 *
 * @complexity Time: O(1) per invocation, Space: O(1)
 */
export function throttle<Args extends unknown[]>(
  func: (...args: Args) => void,
  limit: number,
): (...args: Args) => void {
  if (typeof func !== 'function') {
    throw new TypeError(`func must be a function, got ${typeof func}`);
  }
  if (typeof limit !== 'number') {
    throw new TypeError(`limit must be a number, got ${typeof limit}`);
  }
  if (Number.isNaN(limit) || limit < 0) {
    throw new Error('limit must be a non-negative number');
  }

  let lastFunc: NodeJS.Timeout | null;
  let lastRan: number | null = null;
  return function (this: unknown, ...args: Args) {
    if (!lastRan || Date.now() - lastRan >= limit) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(
        () => {
          func.apply(this, args);
          lastRan = Date.now();
          lastFunc = null;
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}
