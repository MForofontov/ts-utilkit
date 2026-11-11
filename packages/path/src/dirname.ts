import path from 'node:path';

/**
 * Returns the directory name of a path (POSIX).
 *
 * @param input - The path.
 * @returns The directory portion.
 *
 * @example
 * dirname('/foo/bar/baz.txt'); // '/foo/bar'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function dirname(input: string): string {
  return path.posix.dirname(input);
}
