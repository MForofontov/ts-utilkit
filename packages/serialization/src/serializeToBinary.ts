/**
 * Converts a string to binary string representation (8-bit).
 *
 * @param input - The string to convert to binary.
 * @param separator - Optional separator between bytes (default: '').
 * @returns Binary string representation.
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

  const binaryArray: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const binary = charCode.toString(2).padStart(8, '0');
    binaryArray.push(binary);
  }

  return binaryArray.join(separator);
}
