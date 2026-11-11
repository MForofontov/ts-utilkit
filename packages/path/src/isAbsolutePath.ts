import path from 'node:path';

/**
 * Returns whether a path is absolute (POSIX).
 *
 * @param input - The path to check.
 * @returns `true` if the path is absolute.
 *
 * @example
 * isAbsolutePath('/usr/bin'); // true
 * isAbsolutePath('relative/path'); // false
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isAbsolutePath(input: string): boolean {
  return path.posix.isAbsolute(input);
}
