/**
 * Creates a throttled version of an event handler that limits execution to once per
 * specified time window, ensuring the handler is called at most once per interval.
 *
 * @param handler - The event handler function to throttle.
 * @param limit - The minimum time in milliseconds between executions.
 * @param options - Optional configuration object.
 * @param options.leading - If true, execute on the leading edge (default: true).
 * @param options.trailing - If true, execute on the trailing edge (default: true).
 * @returns A throttled version of the handler with a cancel method.
 *
 * @throws {TypeError} If handler is not a function.
 * @throws {TypeError} If limit is not a number.
 * @throws {Error} If limit is negative or NaN.
 *
 * @example
 * // Basic throttling
 * const throttledHandler = throttleEvent((event) => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 200);
 *
 * window.addEventListener('scroll', throttledHandler);
 *
 * @example
 * // Leading edge only
 * const throttledClick = throttleEvent(() => {
 *   console.log('Clicked');
 * }, 1000, { leading: true, trailing: false });
 *
 * button.addEventListener('click', throttledClick);
 *
 * @example
 * // Canceling pending execution
 * const throttled = throttleEvent(() => console.log('Executed'), 1000);
 * throttled();
 * throttled.cancel();
 *
 * @note Useful for rate-limiting frequent events like scroll, resize, or mousemove.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function throttleEvent<T extends unknown[]>(
  handler: (...args: T) => void,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {},
): ((...args: T) => void) & { cancel: () => void } {
  if (typeof handler !== 'function') {
    throw new TypeError(`handler must be a function, got ${typeof handler}`);
  }
  if (typeof limit !== 'number') {
    throw new TypeError(`limit must be a number, got ${typeof limit}`);
  }
  if (isNaN(limit)) {
    throw new Error('limit must be a valid number, not NaN');
  }
  if (limit < 0) {
    throw new Error(`limit must be non-negative, got ${limit}`);
  }

  const { leading = true, trailing = true } = options;

  if (typeof leading !== 'boolean') {
    throw new TypeError(`leading must be a boolean, got ${typeof leading}`);
  }
  if (typeof trailing !== 'boolean') {
    throw new TypeError(`trailing must be a boolean, got ${typeof trailing}`);
  }

  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: T | null = null;

  const throttledFn = (...args: T): void => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    lastArgs = args;

    if (lastCallTime === 0 && !leading) {
      lastCallTime = now;
      return;
    }

    if (timeSinceLastCall >= limit) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      handler(...args);
    } else if (trailing && timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timeoutId = null;
        if (lastArgs !== null) {
          handler(...lastArgs);
          lastArgs = null;
        }
      }, limit - timeSinceLastCall);
    }
  };

  throttledFn.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastCallTime = 0;
    lastArgs = null;
  };

  return throttledFn;
}
