import { err } from './err';
import { ok } from './ok';
import type { Result } from './types';

/**
 * Maps the error value of a `Result` with `fn`, leaving successes unchanged.
 *
 * @param result - The source result.
 * @param fn - Transform applied to the `Err` value.
 * @returns A new result with the transformed error, or the original value.
 *
 * @example
 * mapErr(err('fail'), (e) => e.toUpperCase()); // err('FAIL')
 * mapErr(ok(1), (e: string) => e.toUpperCase()); // ok(1)
 *
 * @complexity Time: O(1) plus cost of `fn`, Space: O(1)
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  if (!result.ok) {
    return err(fn(result.error));
  }
  return ok(result.value);
}
