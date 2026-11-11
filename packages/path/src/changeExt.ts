import path from 'node:path';

/**
 * Replaces or appends a file extension on a path (POSIX).
 *
 * @param input - The path.
 * @param newExt - New extension (with or without leading `.`).
 * @returns The path with the updated extension.
 *
 * @example
 * changeExt('photo.jpg', '.png'); // 'photo.png'
 * changeExt('archive', 'tar'); // 'archive.tar'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function changeExt(input: string, newExt: string): string {
  const ext = newExt.startsWith('.') ? newExt : `.${newExt}`;
  const currentExt = path.posix.extname(input);
  if (currentExt) {
    return input.slice(0, -currentExt.length) + ext;
  }
  return input + ext;
}
