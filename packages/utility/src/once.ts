/**
 * Caches the first successful synchronous return value, including undefined.
 * @param fn - Function to wrap; its receiver and arguments are preserved.
 * @returns A wrapper that retries after throws and reuses the first successful result.
 * @throws {TypeError} If fn is not a function.
 * @throws {Error} If the wrapper is called recursively before its first return.
 * @example const initialize = once(() => loadConfiguration()); initialize(); initialize();
 * @note A returned promise is cached immediately, even if it later rejects.
 * Use asyncMemoize for retry-on-rejection caching. Recursive calls throw rather
 * than observing an uninitialized result; an unsuccessful outer call can retry.
 * @complexity Time: O(1) per cached call, Space: O(1), excluding fn execution.
 */
export function once<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  let called = false;
  let running = false;
  let result: R;
  return function (this: unknown, ...args: Args): R {
    if (called) return result;
    if (running)
      throw new Error('once cannot be called recursively before completion');
    running = true;
    try {
      result = fn.apply(this, args);
      called = true;
      return result;
    } finally {
      running = false;
    }
  };
}
