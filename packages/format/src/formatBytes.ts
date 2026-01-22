/**
 * Formats a number of bytes into a human-readable string with appropriate units.
 * Supports both binary (1024) and decimal (1000) multipliers.
 *
 * @param bytes - The number of bytes to format.
 * @param decimals - Number of decimal places to include (default: 2).
 * @param binary - Whether to use binary (1024) or decimal (1000) multiplier (default: true).
 * @returns A formatted string with the appropriate unit (e.g., "5.00 KB").
 *
 * @throws {TypeError} If bytes is not a number or is NaN.
 * @throws {TypeError} If decimals is not a number or is NaN.
 * @throws {TypeError} If binary is not a boolean.
 * @throws {Error} If bytes is negative.
 * @throws {Error} If decimals is negative.
 *
 * @example
 * // Basic usage
 * formatBytes(1024); // Returns "1.00 KB"
 *
 * @example
 * // Decimal mode
 * formatBytes(1000, 2, false); // Returns "1.00 KB"
 *
 * @example
 * // Custom decimal places
 * formatBytes(1536, 0); // Returns "2 KB"
 *
 * @example
 * // Large values
 * formatBytes(1073741824); // Returns "1.00 GB"
 *
 * @example
 * // Zero bytes
 * formatBytes(0); // Returns "0 Bytes"
 *
 * @note Binary mode (default) uses units: B, KB, MB, GB, TB, PB, EB, ZB, YB.
 * Decimal mode uses the same units but with 1000 as the multiplier.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatBytes(
  bytes: number,
  decimals: number = 2,
  binary: boolean = true,
): string {
  // Input validation
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    throw new TypeError(`bytes must be a number, got ${typeof bytes}`);
  }
  if (typeof decimals !== 'number' || isNaN(decimals)) {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (typeof binary !== 'boolean') {
    throw new TypeError(`binary must be a boolean, got ${typeof binary}`);
  }

  if (bytes < 0) {
    throw new Error(`bytes must be non-negative, got ${bytes}`);
  }
  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }

  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = binary ? 1024 : 1000;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure we don't exceed the units array
  const unitIndex = Math.min(i, units.length - 1);
  const value = bytes / Math.pow(k, unitIndex);

  return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}
