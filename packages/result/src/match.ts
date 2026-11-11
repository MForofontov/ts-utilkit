import type { Result } from './types';

/**
 * Pattern-matches a `Result`, calling `onOk` or `onErr` accordingly.
 *
 * @param result - The result to match.
 * @param handlers - Callbacks for success and failure branches.
 * @returns The value returned by the matching handler.
 *
 * @example
 * match(ok(2), {
 *   ok: (v) => v * 2,
 *   err: () => 0,
 * }); // 4
 *
 * @complexity Time: O(1) plus cost of the chosen handler, Space: O(1)
 */
export function match<T, E, U>(
  result: Result<T, E>,
  handlers: {
    ok: (value: T) => U;
    err: (error: E) => U;
  },
): U {
  if (result.ok) {
    return handlers.ok(result.value);
  }
  return handlers.err(result.error);
}
