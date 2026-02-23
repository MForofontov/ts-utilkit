/**
 * Wraps an async function so that concurrent calls with identical arguments
 * share a single in-flight Promise instead of launching duplicate executions.
 *
 * While a call with key K is outstanding, any further calls with the same key
 * immediately receive the same Promise. Once the in-flight Promise settles
 * (resolves **or** rejects), it is removed from the registry, so the next
 * call with key K starts a fresh execution.
 *
 * @param fn - The async function to wrap.
 * @param keyFn - Optional function to derive a string deduplication key from
 * the call arguments. Defaults to `JSON.stringify(args)`.
 * @returns A new function with the same signature as `fn`.
 *
 * @throws {TypeError} If `fn` is not a function.
 * @throws {TypeError} If `keyFn` is provided but is not a function.
 *
 * @example
 * // Without deduplication — 100 concurrent callers each trigger a network request
 * // With deduplication — all 100 share a single request
 * const getUser = asyncDeduplication(async (id: number) => {
 *   const res = await fetch(`/api/users/${id}`);
 *   return res.json();
 * });
 *
 * // All three calls launched at the same time share one fetch
 * const [a, b, c] = await Promise.all([getUser(1), getUser(1), getUser(1)]);
 *
 * @example
 * // Custom key function
 * const search = asyncDeduplication(
 *   async (query: string, page: number) => apiSearch(query, page),
 *   (query, page) => `${query}:${page}`,
 * );
 *
 * @example
 * // Rejection is shared — all in-flight callers receive the same error
 * const risky = asyncDeduplication(async (id: number) => {
 *   if (id < 0) throw new Error('invalid id');
 *   return fetchItem(id);
 * });
 * await Promise.allSettled([risky(-1), risky(-1)]); // both reject with same error
 *
 * @note This is different from `asyncMemoize`: deduplication only prevents
 * concurrent duplicates; it does NOT cache results after the call settles.
 * Use `asyncMemoize` if you want long-lived result caching.
 *
 * @complexity Time: O(1) per call, Space: O(k) where k is concurrent unique-key count
 */
export function asyncDeduplication<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  keyFn?: (...args: Args) => string,
): (...args: Args) => Promise<T> {
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }

  if (keyFn !== undefined && typeof keyFn !== 'function') {
    throw new TypeError(`keyFn must be a function, got ${typeof keyFn}`);
  }

  const inFlight = new Map<string, Promise<T>>();

  return (...args: Args): Promise<T> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);

    const existing = inFlight.get(key);
    if (existing !== undefined) {
      return existing;
    }

    const promise = fn(...args).finally(() => {
      inFlight.delete(key);
    });

    inFlight.set(key, promise);
    return promise;
  };
}
