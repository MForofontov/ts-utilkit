/**
 * Parses an environment variable as a boolean value.
 *
 * Truthy values: 'true', '1', 'yes', 'on' (case-insensitive)
 * Falsy values: 'false', '0', 'no', 'off' (case-insensitive)
 *
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default value if variable is not set.
 * @returns The parsed boolean value or default value.
 *
 * @throws {TypeError} If key is not a string or defaultValue is not a boolean.
 * @throws {Error} If key is empty.
 *
 * @example
 * // Parse debug flag
 * parseEnvBool('DEBUG', false); // true if DEBUG='true', false otherwise
 *
 * @example
 * // Parse feature flag
 * parseEnvBool('FEATURE_ENABLED', true); // Parsed boolean or true
 *
 * @note Returns defaultValue if variable is not set or doesn't match known patterns.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function parseEnvBool(
  key: string,
  defaultValue?: boolean,
): boolean | undefined {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (defaultValue !== undefined && typeof defaultValue !== 'boolean') {
    throw new TypeError(
      `defaultValue must be a boolean, got ${typeof defaultValue}`,
    );
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  const normalized = value.toLowerCase().trim();

  if (['true', '1', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'no', 'off'].includes(normalized)) {
    return false;
  }

  return defaultValue;
}
