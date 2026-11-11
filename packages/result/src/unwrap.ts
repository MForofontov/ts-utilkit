import type { Result } from './types';

/**
 * Extracts the success value or throws if the result is an error.
 *
 * @param result - The result to unwrap.
 * @returns The success value.
 *
 * @throws {Error} If the result is `Err`.
 *
 * @example
 * unwrap(ok(1)); // 1
 * unwrap(err(new Error('x'))); // throws
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  if (result.error instanceof Error) {
    throw result.error;
  }
  throw new Error(String(result.error));
}
