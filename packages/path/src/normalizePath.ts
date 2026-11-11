import path from 'node:path';

/**
 * Normalizes a path, resolving `.` and `..` segments (POSIX).
 *
 * @param input - The path to normalize.
 * @returns The normalized path.
 *
 * @example
 * normalizePath('a/b/../c'); // 'a/c'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function normalizePath(input: string): string {
  return path.posix.normalize(input);
}
