import { err } from './err';
import { ok } from './ok';
import type { Result } from './types';

/**
 * Runs a synchronous function and wraps the outcome as a `Result`.
 *
 * @param fn - Function that may throw.
 * @returns `ok(returnValue)` on success, or `err(caught)` on throw.
 *
 * @example
 * fromThrowable(() => JSON.parse('{"a":1}')); // ok({ a: 1 })
 * fromThrowable(() => JSON.parse('bad')); // err(SyntaxError)
 *
 * @complexity Time: O(1) plus cost of `fn`, Space: O(1)
 */
export function fromThrowable<T>(fn: () => T): Result<T, unknown> {
  try {
    return ok(fn());
  } catch (error) {
    return err(error);
  }
}
