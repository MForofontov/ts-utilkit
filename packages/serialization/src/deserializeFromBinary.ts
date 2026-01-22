/**
 * Converts binary string representation to normal string.
 *
 * @param binaryString - The binary string to convert.
 * @param separator - Optional separator between bytes (default: '').
 * @returns The decoded string.
 *
 * @throws {TypeError} If binaryString or separator is not a string.
 * @throws {Error} If binary string is invalid.
 *
 * @example
 * // Convert from binary
 * deserializeFromBinary('01000001'); // 'A'
 *
 * @example
 * // With separator
 * deserializeFromBinary('01000001 01000010', ' '); // 'AB'
 *
 * @note Each 8-bit segment is converted to a character.
 *
 * @complexity Time: O(n), Space: O(n) where n is binary string length
 */
export function deserializeFromBinary(
  binaryString: string,
  separator: string = '',
): string {
  if (typeof binaryString !== 'string') {
    throw new TypeError(
      `binaryString must be a string, got ${typeof binaryString}`,
    );
  }

  if (typeof separator !== 'string') {
    throw new TypeError(`separator must be a string, got ${typeof separator}`);
  }

  const binaryArray = separator ? binaryString.split(separator) : [];

  // If no separator, split into 8-bit chunks
  if (!separator) {
    if (binaryString.length % 8 !== 0) {
      throw new Error(
        'Binary string length must be divisible by 8 when no separator is used',
      );
    }

    for (let i = 0; i < binaryString.length; i += 8) {
      binaryArray.push(binaryString.slice(i, i + 8));
    }
  }

  const chars: string[] = [];

  for (const binary of binaryArray) {
    if (!/^[01]+$/.test(binary)) {
      throw new Error(`Invalid binary string segment: ${binary}`);
    }

    const charCode = parseInt(binary, 2);
    chars.push(String.fromCharCode(charCode));
  }

  return chars.join('');
}
