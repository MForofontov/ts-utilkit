import { asyncMap } from './asyncMap';

/**
 * Maps items in bounded batches, retaining successes and failures in input order.
 * @param items - Items to map; sparse slots are passed as undefined.
 * @param mapper - Async mapper receiving the item and original index.
 * @param concurrency - Positive integer batch limit, or Infinity; defaults to 5.
 * @returns Ordered settled results, preserving original rejection reasons.
 * @throws {TypeError} If items is not an array or mapper is not a function.
 * @throws {Error} If concurrency is not a positive integer or Infinity.
 * @example await asyncMapSettled([1, 2], id => fetchUser(id), 2);
 * @note Both synchronous mapper throws and promise rejections become rejected results.
 * @complexity Time: O(n) scheduling plus callback duration, Space: O(n).
 */
export function asyncMapSettled<T, R>(
  items: T[],
  mapper: (item: T, index: number) => Promise<R>,
  concurrency?: number,
): Promise<PromiseSettledResult<R>[]> {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (typeof mapper !== 'function')
    throw new TypeError('mapper must be a function');
  return asyncMap<T, PromiseSettledResult<R>>(
    Array.from(items),
    async (item, index) => {
      try {
        return { status: 'fulfilled', value: await mapper(item, index) };
      } catch (reason) {
        return { status: 'rejected', reason };
      }
    },
    concurrency,
  );
}
