import type { Result } from './types';

/**
 * Extracts the success value, or returns `defaultValue` on error.
 *
 * @param result - The result to unwrap.
 * @param defaultValue - Fallback when the result is `Err`.
 * @returns The success value or `defaultValue`.
 *
 * @example
 * unwrapOr(ok(1), 0); // 1
 * unwrapOr(err('x'), 0); // 0
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.ok ? result.value : defaultValue;
}
