import type { Ok } from './types';

/**
 * Creates a successful `Result` containing `value`.
 *
 * @param value - The success value.
 * @returns An `Ok` result.
 *
 * @example
 * ok(42); // { ok: true, value: 42 }
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}
