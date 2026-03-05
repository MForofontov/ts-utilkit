/**
 * Reverses the characters in a string.
 *
 * @deprecated Use native `str.split('').reverse().join('')` directly,
 * or `[...str].reverse().join('')` for proper Unicode support.
 * Will be removed in the next major version.
 *
 * @param str - The string to reverse.
 * @returns The reversed string.
 *
 * @example
 * reverseString('hello'); // 'olleh'
 * reverseString('abcd');  // 'dcba'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
