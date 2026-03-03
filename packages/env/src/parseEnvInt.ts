/**
 * Parses an environment variable as an integer with optional default value.
 *
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default value if variable is not set or invalid.
 * @returns The parsed integer value or default value.
 *
 * @throws {Error} If key is empty.
 *
 * @example
 * // Parse port number with default
 * parseEnvInt('PORT', 3000); // 3000 if PORT not set
 *
 * @example
 * // Parse timeout value
 * parseEnvInt('TIMEOUT_MS', 5000); // Parsed integer or 5000
 *
 * @note Returns defaultValue if parsing fails or value is NaN.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function parseEnvInt(key: string): number | undefined;
export function parseEnvInt(key: string, defaultValue: number): number;
export function parseEnvInt(
  key: string,
  defaultValue?: number,
): number | undefined {

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
}
