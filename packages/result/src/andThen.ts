import { err } from './err';
import type { Result } from './types';

/**
 * Chains a fallible operation on a successful `Result` (flatMap).
 *
 * @param result - The source result.
 * @param fn - Function returning another `Result` from the success value.
 * @returns The nested result, or the original error.
 *
 * @example
 * andThen(ok(2), (n) => ok(n * 2)); // ok(4)
 * andThen(ok(2), () => err('no')); // err('no')
 *
 * @complexity Time: O(1) plus cost of `fn`, Space: O(1)
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  if (result.ok) {
    return fn(result.value);
  }
  return err(result.error);
}
