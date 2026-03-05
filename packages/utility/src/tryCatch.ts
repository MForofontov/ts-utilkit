/**
 * Result object returned by `tryCatch`. Exactly one of `value` or `error`
 * will be meaningful on any given call:
 * - On success: `value` holds the return value of `fn` and `error` is `undefined`.
 * - On failure without `onError`: `value` is `undefined` and `error` holds the
 *   caught error.
 * - On failure with `onError`: `value` holds the fallback return value of
 *   `onError` and `error` holds the caught error.
 */
export interface TryCatchResult<T> {
  /** The return value of `fn` on success, or the fallback from `onError`. */
  value: T | undefined;
  /** The caught error, or `undefined` if execution succeeded. */
  error: Error | undefined;
}

/**
 * Executes a function safely, catching any thrown error and returning a
 * structured `{ value, error }` result instead of propagating the exception.
 * An optional `onError` callback can provide a fallback value when the
 * function throws.
 *
 * @param fn - The function to execute safely.
 * @param onError - Optional callback invoked with the caught error that
 *   provides a fallback value.
 * @returns A `TryCatchResult<T>` object with `value` and `error` fields.
 *
 * @example
 * // Safe JSON parse — no try/catch in calling code
 * const { value, error } = tryCatch(() => JSON.parse('not json'));
 * // value: undefined, error: SyntaxError
 *
 * @example
 * // Successful execution — error is undefined
 * const { value, error } = tryCatch(() => JSON.parse('{"ok":true}'));
 * // value: { ok: true }, error: undefined
 *
 * @example
 * // With fallback via onError
 * const { value } = tryCatch(
 *   () => JSON.parse('bad'),
 *   () => ({ fallback: true }),
 * );
 * // value: { fallback: true }
 *
 * @note Non-Error throws (e.g. thrown strings or numbers) are automatically
 *   wrapped in an `Error` with the thrown value converted via `String()`.
 * @note For async functions, wrap in an async IIFE or await separately;
 *   `tryCatch` is synchronous only.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function tryCatch<T>(
  fn: () => T,
  onError?: (error: Error) => T,
): TryCatchResult<T> {
  try {
    return { value: fn(), error: undefined };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    if (onError !== undefined) {
      return { value: onError(error), error };
    }
    return { value: undefined, error };
  }
}
