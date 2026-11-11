import path from 'node:path';

/**
 * Computes the relative path from `from` to `to` (POSIX).
 *
 * @param from - Starting path.
 * @param to - Destination path.
 * @returns The relative path.
 *
 * @example
 * relativePath('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
 * // '../../impl/bbb'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function relativePath(from: string, to: string): string {
  return path.posix.relative(from, to);
}
