import path from 'node:path';

/**
 * Returns the extension of a path, including the leading `.` (POSIX).
 *
 * @param input - The path.
 * @returns The extension, or an empty string if none.
 *
 * @example
 * extname('file.tar.gz'); // '.gz'
 * extname('README'); // ''
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function extname(input: string): string {
  return path.posix.extname(input);
}
