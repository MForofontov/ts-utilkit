/**
 * Wraps a synchronous function so that repeated calls with identical arguments
 * are served from an in-memory cache instead of re-executing the function.
 * An optional `keyFn` lets callers control how arguments are serialised into
 * cache keys, which is useful for complex object arguments or performance-
 * sensitive hot paths.
 *
 * @param fn - The synchronous function to memoize.
 * @param keyFn - Optional function that converts the call arguments to a string
 *   cache key. Defaults to `JSON.stringify(args)`.
 * @returns A new function with the same signature as `fn` that transparently
 *   caches return values.
 *
 * @example
 * // Basic memoization — second call is served from cache
 * const square = memoize((n: number) => {
 *   console.log('computing');
 *   return n * n;
 * });
 * square(4); // logs 'computing', returns 16
 * square(4); // returns 16 (from cache, no log)
 *
 * @example
 * // Custom key function for object arguments
 * const getUser = memoize(
 *   (id: number, role: string) => fetchUser(id, role),
 *   (id, role) => `${id}:${role}`,
 * );
 *
 * @example
 * // Memoizing a fibonacci computation
 * const fib = memoize((n: number): number =>
 *   n <= 1 ? n : fib(n - 1) + fib(n - 2),
 * );
 * fib(40); // computed once, subsequent calls served from cache
 *
 * @note The cache lives for the lifetime of the returned memoized function.
 *   Create a new memoized function instance to reset the cache.
 * @note Async functions should use `asyncMemoize` from `@ts-utilkit/async`.
 * @note `JSON.stringify` is used as the default key strategy; circular
 *   references or non-serialisable arguments require a custom `keyFn`.
 *
 * @complexity Time: O(1) per cached call, Space: O(k) where k is unique key count
 */
export function memoize<T, Args extends unknown[]>(
  fn: (...args: Args) => T,
  keyFn?: (...args: Args) => string,
): (...args: Args) => T {

  const cache = new Map<string, T>();

  return (...args: Args): T => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as T;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
