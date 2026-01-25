/**
 * Creates a debounced version of an event handler that delays execution until after
 * a specified wait time has elapsed since the last invocation.
 *
 * @param handler - The event handler function to debounce.
 * @param delay - The delay in milliseconds to wait before executing the handler.
 * @param immediate - If true, execute handler on the leading edge instead of trailing (default: false).
 * @returns A debounced version of the handler with a cancel method.
 *
 * @throws {TypeError} If handler is not a function.
 * @throws {TypeError} If delay is not a number.
 * @throws {Error} If delay is negative.
 *
 * @example
 * // Basic debouncing
 * const debouncedHandler = debounceEvent((value) => {
 *   console.log('Search:', value);
 * }, 300);
 *
 * input.addEventListener('input', (e) => debouncedHandler(e.target.value));
 *
 * @example
 * // Leading edge debounce
 * const debouncedClick = debounceEvent(() => {
 *   console.log('Clicked');
 * }, 1000, true);
 *
 * button.addEventListener('click', debouncedClick);
 *
 * @example
 * // Canceling pending execution
 * const debounced = debounceEvent(() => console.log('Executed'), 1000);
 * debounced();
 * debounced.cancel(); // Prevents execution
 *
 * @note Useful for rate-limiting expensive operations like API calls or DOM updates.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function debounceEvent<T extends unknown[]>(
  handler: (...args: T) => void,
  delay: number,
  immediate: boolean = false,
): ((...args: T) => void) & { cancel: () => void } {
  if (typeof handler !== 'function') {
    throw new TypeError(`handler must be a function, got ${typeof handler}`);
  }
  if (typeof delay !== 'number') {
    throw new TypeError(`delay must be a number, got ${typeof delay}`);
  }
  if (isNaN(delay)) {
    throw new Error('delay must be a valid number, not NaN');
  }
  if (delay < 0) {
    throw new Error(`delay must be non-negative, got ${delay}`);
  }
  if (typeof immediate !== 'boolean') {
    throw new TypeError(`immediate must be a boolean, got ${typeof immediate}`);
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFn = (...args: T): void => {
    const callNow = immediate && timeoutId === null;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        handler(...args);
      }
    }, delay);

    if (callNow) {
      handler(...args);
    }
  };

  debouncedFn.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFn;
}
