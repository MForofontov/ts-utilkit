import { formatBytes } from '@ts-utilkit/format';

/**
 * Converts bytes to a human-readable size string with appropriate units.
 *
 * @deprecated Use `formatBytes` from `@ts-utilkit/format` directly.
 * Will be removed in the next major version.
 *
 * @param bytes - The number of bytes (must be non-negative).
 * @param binary - If true, uses base-1024 (binary) with IEC units (KiB, MiB, etc.).
 *   If false, uses base-1000 (decimal) with SI units (KB, MB, etc.). Default: true.
 * @returns The size as a formatted string with appropriate units.
 *
 * @throws {TypeError} If bytes is not a number or binary is not a boolean.
 * @throws {Error} If bytes is negative or NaN.
 *
 * @example
 * bytesToSize(1024);       // '1.00 KiB'
 * bytesToSize(1000, false); // '1.00 KB'
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function bytesToSize(bytes: number, binary: boolean = true): string {
  if (typeof bytes !== 'number') {
    throw new TypeError(`bytes must be a number, got ${typeof bytes}`);
  }
  if (isNaN(bytes)) {
    throw new Error('bytes must be a valid number, not NaN');
  }
  if (bytes < 0) {
    throw new Error(`bytes must be non-negative, got ${bytes}`);
  }
  if (typeof binary !== 'boolean') {
    throw new TypeError(`binary must be a boolean, got ${typeof binary}`);
  }
  return formatBytes(bytes, 2, binary, binary);
}
