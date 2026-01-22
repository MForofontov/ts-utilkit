/**
 * Parses a human-readable data size string into bytes.
 * Supports various units: B, KB, MB, GB, TB, PB, EB, ZB, YB.
 *
 * @param input - The data size string to parse (e.g., "5KB", "10 MB", "1.5GB").
 * @param binary - Whether to use binary (1024) or decimal (1000) multiplier (default: true).
 * @returns The size in bytes.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {TypeError} If binary is not a boolean.
 * @throws {Error} If input is empty.
 * @throws {Error} If input format is invalid.
 * @throws {Error} If the numeric value is negative or NaN.
 * @throws {Error} If the unit is not recognized.
 *
 * @example
 * // Basic usage
 * parseDataSize("5KB"); // Returns 5120 (binary)
 *
 * @example
 * // With decimal multiplier
 * parseDataSize("5KB", false); // Returns 5000
 *
 * @example
 * // With spaces
 * parseDataSize("10 MB"); // Returns 10485760
 *
 * @example
 * // Fractional values
 * parseDataSize("1.5GB"); // Returns 1610612736
 *
 * @example
 * // Case insensitive
 * parseDataSize("2kb"); // Returns 2048
 *
 * @note Units are case-insensitive. Whitespace between number and unit is optional.
 * Binary mode (default) uses 1024 multiplier, decimal mode uses 1000.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function parseDataSize(input: string, binary: boolean = true): number {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }
  if (typeof binary !== 'boolean') {
    throw new TypeError(`binary must be a boolean, got ${typeof binary}`);
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }

  // Parse the input
  const match = input.trim().match(/^(-?[\d.]+)\s*([a-zA-Z]+)$/);
  if (!match) {
    throw new Error(
      `Invalid data size format: "${input}" (expected format: "5KB" or "5 KB")`,
    );
  }

  const numericValue = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  if (isNaN(numericValue)) {
    throw new Error(`Invalid numeric value: "${match[1]}"`);
  }
  if (numericValue < 0) {
    throw new Error(
      `Numeric value must be non-negative, got ${numericValue}`,
    );
  }

  // Define units and their multipliers
  const multiplier = binary ? 1024 : 1000;
  const units: Record<string, number> = {
    B: 1,
    KB: multiplier,
    MB: multiplier ** 2,
    GB: multiplier ** 3,
    TB: multiplier ** 4,
    PB: multiplier ** 5,
    EB: multiplier ** 6,
    ZB: multiplier ** 7,
    YB: multiplier ** 8,
  };

  if (!(unit in units)) {
    throw new Error(
      `Unrecognized unit: "${unit}" (valid units: B, KB, MB, GB, TB, PB, EB, ZB, YB)`,
    );
  }

  return Math.floor(numericValue * units[unit]);
}
