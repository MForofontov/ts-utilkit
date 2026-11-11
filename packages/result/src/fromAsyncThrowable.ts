import { err } from './err';
import { ok } from './ok';
import type { Result } from './types';

/**
 * Runs a callback and wraps its awaited outcome as a Result.
 * @param fn - Callback returning a value, promise, or thenable.
 * @returns ok(value) on success or err(reason) on synchronous throw or rejection.
 * @example await fromAsyncThrowable(() => Promise.resolve(42)); // ok(42)
 * @note Error values retain their original identity, including non-Error reasons.
 * @complexity Time: callback duration, Space: O(1), excluding callback resources.
 */
export async function fromAsyncThrowable<T>(
  fn: () => PromiseLike<T> | T,
): Promise<Result<T, unknown>> {
  try {
    return ok(await fn());
  } catch (error) {
    return err(error);
  }
}
