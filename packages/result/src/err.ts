import type { Err } from './types';

/**
 * Creates a failed `Result` containing `error`.
 *
 * @param error - The error value.
 * @returns An `Err` result.
 *
 * @example
 * err(new Error('failed')); // { ok: false, error: Error('failed') }
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}
