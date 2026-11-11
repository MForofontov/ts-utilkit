import { err } from './err';
import { ok } from './ok';
import type { Result } from './types';

/**
 * Maps the success value of a `Result` with `fn`, leaving errors unchanged.
 *
 * @param result - The source result.
 * @param fn - Transform applied to the `Ok` value.
 * @returns A new result with the transformed value, or the original error.
 *
 * @example
 * map(ok(2), (n) => n * 2); // ok(4)
 * map(err('x'), (n: number) => n * 2); // err('x')
 *
 * @complexity Time: O(1) plus cost of `fn`, Space: O(1)
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return err(result.error);
}
