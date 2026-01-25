/**
 * Parses an environment variable as a floating-point number with optional default value.
 *
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default value if variable is not set or invalid.
 * @returns The parsed float value or default value.
 *
 * @throws {TypeError} If key is not a string or defaultValue is not a number.
 * @throws {Error} If key is empty.
 *
 * @example
 * // Parse tax rate with default
 * parseEnvFloat('TAX_RATE', 0.15); // 0.15 if TAX_RATE not set
 *
 * @example
 * // Parse threshold value
 * parseEnvFloat('THRESHOLD', 1.5); // Parsed float or 1.5
 *
 * @note Returns defaultValue if parsing fails or value is NaN.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function parseEnvFloat(
  key: string,
  defaultValue?: number,
): number | undefined {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (defaultValue !== undefined && typeof defaultValue !== 'number') {
    throw new TypeError(
      `defaultValue must be a number, got ${typeof defaultValue}`,
    );
  }

  if (defaultValue !== undefined && isNaN(defaultValue)) {
    throw new TypeError('defaultValue must be a valid number, not NaN');
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  const parsed = parseFloat(value);

  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
}
