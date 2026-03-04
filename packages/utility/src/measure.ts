/**
 * Result object returned by `measure`.
 */
export interface MeasureResult<T> {
  /** The return value of the measured function. */
  result: T;
  /** Elapsed wall-clock time in milliseconds (float precision). */
  durationMs: number;
  /** The label passed to `measure`, or `undefined` if none was provided. */
  label: string | undefined;
}

/**
 * Wraps a synchronous function call and returns both the function's return
 * value and the wall-clock time taken to execute it, measured with
 * `performance.now()`.
 *
 * @param fn - The synchronous function to execute and time.
 * @param label - Optional descriptive label included in the result for
 *   identification when logging multiple measurements.
 * @returns A `MeasureResult<T>` with `result`, `durationMs`, and `label`.
 *
 * @example
 * // Measure a computation
 * const { result, durationMs } = measure(() => heavyComputation(1000));
 * console.log(`Result: ${result}, took ${durationMs.toFixed(2)}ms`);
 *
 * @example
 * // With a label for identification
 * const { result, durationMs, label } = measure(
 *   () => sortArray(bigArray),
 *   'sort-benchmark',
 * );
 * console.log(`[${label}] ${durationMs.toFixed(2)}ms`);
 *
 * @example
 * // Measure JSON serialisation
 * const { durationMs } = measure(() => JSON.stringify(largeObject), 'serialise');
 *
 * @note If `fn` throws, the error propagates normally. Use `tryCatch` first if
 *   you need to measure potentially failing functions.
 * @note For async functions wrap in a self-executing async function or use
 *   `performance.now()` directly with await.
 *
 * @complexity Time: O(1) + O(fn), Space: O(1)
 */
export function measure<T>(fn: () => T, label?: string): MeasureResult<T> {
  const start = performance.now();
  const result = fn();
  const durationMs = performance.now() - start;

  return { result, durationMs, label };
}
