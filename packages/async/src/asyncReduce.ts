/**
 * Accumulates items sequentially, awaiting each reducer result before continuing.
 * @param items - Items to reduce, including sparse slots as undefined.
 * @param reducer - Async reducer receiving the accumulator, item, and original index.
 * @param initialValue - Initial accumulator; returned for empty input.
 * @returns The final accumulator, or a rejection if the reducer fails.
 * @throws {TypeError} If items is not an array or reducer is not a function.
 * @example await asyncReduce([1, 2], (sum, id) => getPrice(id).then(n => sum + n), 0);
 * @note Synchronous reducer throws become promise rejections; subsequent items are skipped.
 * @complexity Time: O(n) scheduling plus callback duration, Space: O(1).
 */
export function asyncReduce<T, R>(
  items: T[],
  reducer: (acc: R, item: T, index: number) => Promise<R>,
  initialValue: R,
): Promise<R> {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (typeof reducer !== 'function')
    throw new TypeError('reducer must be a function');
  return (async () => {
    let accumulator = initialValue;
    for (let index = 0; index < items.length; index++) {
      accumulator = await reducer(accumulator, items[index], index);
    }
    return accumulator;
  })();
}
