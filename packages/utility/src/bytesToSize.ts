/**
 * Converts bytes to a human-readable size string with appropriate units.
 *
 * @param bytes - The number of bytes (must be non-negative).
 * @param binary - If true, uses base-1024 (binary) with IEC units (KiB, MiB, etc.). If false, uses base-1000 (decimal) with SI units (KB, MB, etc.). Default: true.
 * @returns The size as a formatted string with appropriate units.
 *
 * @throws {TypeError} If bytes is not a number or binary is not a boolean.
 * @throws {Error} If bytes is negative or NaN.
 *
 * @example
 * // Binary system (default) - base 1024
 * bytesToSize(1024); // "1.00 KiB"
 * bytesToSize(1048576); // "1.00 MiB"
 * bytesToSize(1073741824); // "1.00 GiB"
 *
 * @example
 * // Decimal system - base 1000
 * bytesToSize(1000, false); // "1.00 KB"
 * bytesToSize(1000000, false); // "1.00 MB"
 * bytesToSize(1000000000, false); // "1.00 GB"
 *
 * @example
 * // Comparison between systems
 * bytesToSize(1536, true); // "1.50 KiB" (binary)
 * bytesToSize(1536, false); // "1.54 KB" (decimal)
 *
 * @example
 * // Large sizes
 * bytesToSize(1024 ** 5); // "1.00 PiB" (pebibyte)
 * bytesToSize(1000 ** 6, false); // "1.00 EB" (exabyte)
 *
 * @example
 * // Edge cases
 * bytesToSize(0); // "0 Bytes"
 * bytesToSize(512); // "512.00 Bytes"
 *
 * @note Binary system (base-1024) uses IEC units: Bytes, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB
 * @note Decimal system (base-1000) uses SI units: Bytes, KB, MB, GB, TB, PB, EB, ZB, YB
 * @note Results are formatted to 2 decimal places.
 * @note Binary is recommended for memory/storage capacity, decimal for network speeds and file sizes.
 * @note Uses logarithms to determine the appropriate unit efficiently.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function bytesToSize(bytes: number, binary: boolean = true): string {
  // Validate bytes parameter
  if (typeof bytes !== 'number') {
    throw new TypeError(`bytes must be a number, got ${typeof bytes}`);
  }
  if (isNaN(bytes)) {
    throw new Error('bytes must be a valid number, not NaN');
  }
  if (bytes < 0) {
    throw new Error(`bytes must be non-negative, got ${bytes}`);
  }

  // Validate binary parameter
  if (typeof binary !== 'boolean') {
    throw new TypeError(`binary must be a boolean, got ${typeof binary}`);
  }

  // Handle zero bytes
  if (bytes === 0) return '0 Bytes';

  // Define units for binary (IEC) and decimal (SI) systems
  const binarySizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];
  const decimalSizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const sizes = binary ? binarySizes : decimalSizes;
  const base = binary ? 1024 : 1000;

  // Calculate the appropriate unit index
  const i = Math.floor(Math.log(bytes) / Math.log(base));

  // Clamp index to valid range
  const index = Math.min(i, sizes.length - 1);

  // Calculate and format the result
  const value = bytes / Math.pow(base, index);
  return `${value.toFixed(2)} ${sizes[index]}`;
}
