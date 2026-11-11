import type { Ok, Result } from './types';

/**
 * Type guard that narrows a `Result` to `Ok`.
 *
 * @param result - The result to check.
 * @returns `true` if the result is `Ok`.
 *
 * @example
 * const r = ok(1);
 * if (isOk(r)) {
 *   console.log(r.value); // 1
 * }
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok === true;
}
