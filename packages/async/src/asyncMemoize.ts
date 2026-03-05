/**
 * Internal cache entry holding a resolved value and optional expiry timestamp.
 */
interface MemoizeCacheEntry<T> {
  value: T;
  /** Unix ms at which this entry expires, or null for no expiry. */
  expiresAt: number | null;
}

/**
 * Wraps an async function so that successive calls with identical arguments
 * are served from an in-memory cache instead of re-executing the function.
 * An optional TTL causes cache entries to expire after a given number of
 * milliseconds, and a custom `keyFn` lets callers control how arguments
 * are serialized into cache keys.
 *
 * @param fn - The async function to memoize.
 * @param options - Memoization options.
 * @param options.ttl - Time-to-live in milliseconds. After this duration the
 * cached entry is evicted and `fn` is called again. Omit for indefinite caching.
 * @param options.keyFn - Custom function to derive a string cache key from the
 * call arguments. Defaults to `JSON.stringify(args)`.
 * @returns A new function with the same signature as `fn` that transparently
 * caches resolved values.
 *
 * @throws {Error} If `options.ttl` is a negative number.
 * @example
 * // Basic memoization — second call is served from cache
 * const fetchUser = asyncMemoize(async (id: number) => {
 *   const res = await fetch(`/api/users/${id}`);
 *   return res.json();
 * });
 * await fetchUser(1); // hits the network
 * await fetchUser(1); // served from cache
 *
 * @example
 * // With a 5-second TTL
 * const getConfig = asyncMemoize(
 *   async () => fetchRemoteConfig(),
 *   { ttl: 5000 },
 * );
 *
 * @example
 * // Custom key function for complex arguments
 * const search = asyncMemoize(
 *   async (query: string, page: number) => apiSearch(query, page),
 *   { keyFn: (query, page) => `${query}:${page}` },
 * );
 *
 * @note Rejected promises are NOT cached. A failed call will be retried on the
 * next invocation with the same arguments. Create a new memoized function
 * instance to reset the cache entirely.
 *
 * @complexity Time: O(1) per cached call, Space: O(k) where k is unique key count
 */
export function asyncMemoize<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  options: {
    ttl?: number;
    keyFn?: (...args: Args) => string;
  } = {},
): (...args: Args) => Promise<T> {
  const { ttl, keyFn } = options;

  if (ttl !== undefined) {
    if (ttl < 0) {
      throw new Error(`ttl must be non-negative, got ${ttl}`);
    }
  }

  const cache = new Map<string, MemoizeCacheEntry<T>>();

  return (...args: Args): Promise<T> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);

    if (cached !== undefined) {
      if (cached.expiresAt === null || cached.expiresAt > now) {
        return Promise.resolve(cached.value);
      }
      // TTL expired — evict
      cache.delete(key);
    }

    return fn(...args).then((value) => {
      const expiresAt = ttl !== undefined ? Date.now() + ttl : null;
      cache.set(key, { value, expiresAt });
      return value;
    });
  };
}
