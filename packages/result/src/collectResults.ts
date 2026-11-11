import { ok } from './ok';
import { err } from './err';
import type { Result } from './types';

/**
 * Collects successful values in order, returning the first error encountered.
 * @param results - Result values to collect.
 * @returns Ok with the collected values (including an empty array), or the first Err.
 * @throws {TypeError} If results is not an array.
 * @example collectResults([ok(1), ok(2)]); // ok([1, 2])
 * @example collectResults([ok(1), err('invalid')]); // err('invalid')
 * @complexity Time: O(n), Space: O(n).
 */
export function collectResults<T, E>(results: Result<T, E>[]): Result<T[], E> {
  if (!Array.isArray(results)) throw new TypeError('results must be an array');
  const values: T[] = [];
  for (const result of results) {
    if (!result.ok) return err(result.error);
    values.push(result.value);
  }
  return ok(values);
}
