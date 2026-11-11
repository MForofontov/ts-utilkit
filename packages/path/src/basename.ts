import path from 'node:path';

/**
 * Returns the last portion of a path (POSIX).
 *
 * @param input - The path.
 * @param ext - Optional extension to strip from the basename.
 * @returns The basename.
 *
 * @example
 * basename('/foo/bar.txt'); // 'bar.txt'
 * basename('/foo/bar.txt', '.txt'); // 'bar'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function basename(input: string, ext?: string): string {
  return path.posix.basename(input, ext);
}
