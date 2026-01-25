/**
 * Converts a string to binary string representation (8-bit).
 *
 * @param input - The string to convert to binary.
 * @param separator - Optional separator between bytes (default: '').
 * @returns Binary string representation.
 *
 * @throws {TypeError} If input or separator is not a string.
 *
 * @example
 * // Convert to binary
 * serializeToBinary('A'); // '01000001'
 *
 * @example
 * // With separator
 * serializeToBinary('AB', ' '); // '01000001 01000010'
 *
 * @note Each character becomes 8-bit binary representation.
 *
 * @complexity Time: O(n), Space: O(n) where n is string length
 */
export function serializeToBinary(
  input: string,
  separator: string = '',
): string {
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }

  if (typeof separator !== 'string') {
    throw new TypeError(`separator must be a string, got ${typeof separator}`);
  }

  const binaryArray: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const binary = charCode.toString(2).padStart(8, '0');
    binaryArray.push(binary);
  }

  return binaryArray.join(separator);
}
