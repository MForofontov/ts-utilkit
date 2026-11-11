import type { Err, Result } from './types';

/**
 * Type guard that narrows a `Result` to `Err`.
 *
 * @param result - The result to check.
 * @returns `true` if the result is `Err`.
 *
 * @example
 * const r = err('nope');
 * if (isErr(r)) {
 *   console.log(r.error); // 'nope'
 * }
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.ok === false;
}
