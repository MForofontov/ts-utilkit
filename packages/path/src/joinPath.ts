import path from 'node:path';

/**
 * Joins path segments using POSIX separators.
 *
 * @param segments - Path segments to join.
 * @returns The joined path.
 *
 * @example
 * joinPath('a', 'b', 'c'); // 'a/b/c'
 *
 * @complexity Time: O(n), Space: O(n) where n is total segment length
 */
export function joinPath(...segments: string[]): string {
  return path.posix.join(...segments);
}
