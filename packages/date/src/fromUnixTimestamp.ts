/**
 * Converts a Unix timestamp (seconds since the Unix epoch) to a `Date` object.
 *
 * @param timestamp - The Unix timestamp in seconds (integer or float).
 * @returns A `Date` object corresponding to the given Unix timestamp.
 *
 * @throws {Error} If timestamp is NaN.
 *
 * @example
 * // Epoch zero
 * fromUnixTimestamp(0); // Date: 1970-01-01T00:00:00.000Z
 *
 * @example
 * // A real-world timestamp
 * fromUnixTimestamp(1_735_689_600); // Date: 2025-01-01T00:00:00.000Z
 *
 * @example
 * // Sub-second precision via fractional input
 * fromUnixTimestamp(1_735_689_600.5); // Date: 2025-01-01T00:00:00.500Z
 *
 * @example
 * // Negative timestamp (before epoch)
 * fromUnixTimestamp(-86_400); // Date: 1969-12-31T00:00:00.000Z
 *
 * @note Unix timestamps are in **seconds** — multiply by 1000 to convert to milliseconds.
 * @note Pairs with `toUnixTimestamp` for round-trip conversion.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function fromUnixTimestamp(timestamp: number): Date {
  if (isNaN(timestamp)) {
    throw new Error('timestamp must be a valid number, not NaN');
  }

  return new Date(timestamp * 1_000);
}
