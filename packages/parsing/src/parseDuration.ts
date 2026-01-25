/**
 * Parses a human-readable duration string into milliseconds.
 * Supports various units: ms, s, m, h, d, w.
 *
 * @param input - The duration string to parse (e.g., "5s", "10 min", "2h 30m").
 * @returns The duration in milliseconds.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {Error} If input is empty.
 * @throws {Error} If input format is invalid.
 * @throws {Error} If the numeric value is negative or NaN.
 * @throws {Error} If the unit is not recognized.
 *
 * @example
 * // Basic usage
 * parseDuration("5s"); // Returns 5000
 *
 * @example
 * // Minutes
 * parseDuration("10m"); // Returns 600000
 *
 * @example
 * // Hours
 * parseDuration("2h"); // Returns 7200000
 *
 * @example
 * // Combined units
 * parseDuration("1h 30m 15s"); // Returns 5415000
 *
 * @example
 * // With spaces
 * parseDuration("5 seconds"); // Returns 5000
 *
 * @note Supports abbreviated units (ms, s, m, h, d, w) and full names (milliseconds, seconds, minutes, hours, days, weeks).
 * Units are case-insensitive. Multiple units can be combined with spaces.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is the length of input string
 */
export function parseDuration(input: string): number {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }

  // Define units and their multipliers (in milliseconds)
  const units: Record<string, number> = {
    ms: 1,
    millisecond: 1,
    milliseconds: 1,
    s: 1000,
    sec: 1000,
    second: 1000,
    seconds: 1000,
    m: 60000,
    min: 60000,
    minute: 60000,
    minutes: 60000,
    h: 3600000,
    hr: 3600000,
    hour: 3600000,
    hours: 3600000,
    d: 86400000,
    day: 86400000,
    days: 86400000,
    w: 604800000,
    week: 604800000,
    weeks: 604800000,
  };

  let totalMilliseconds = 0;

  // Match all number-unit pairs
  const regex = /(-?[\d.]+)\s*([a-zA-Z]+)/g;
  let match: RegExpExecArray | null;
  let hasMatches = false;

  while ((match = regex.exec(input)) !== null) {
    hasMatches = true;
    const numericValue = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    if (isNaN(numericValue)) {
      throw new Error(`Invalid numeric value: "${match[1]}"`);
    }
    if (numericValue < 0) {
      throw new Error(
        `Numeric value must be non-negative, got ${numericValue}`,
      );
    }

    if (!(unit in units)) {
      throw new Error(
        `Unrecognized unit: "${unit}" (valid units: ms, s/sec/second, m/min/minute, h/hr/hour, d/day, w/week)`,
      );
    }

    totalMilliseconds += numericValue * units[unit];
  }

  if (!hasMatches) {
    throw new Error(
      `Invalid duration format: "${input}" (expected format: "5s" or "1h 30m")`,
    );
  }

  return Math.floor(totalMilliseconds);
}
