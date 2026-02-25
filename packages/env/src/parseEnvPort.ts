/**
 * Parses an environment variable as a valid TCP/UDP port number (1–65535).
 *
 * Port `0` is reserved and therefore excluded. If the variable is absent or
 * empty and a `defaultValue` is supplied, the default is returned after being
 * validated against the same 1–65535 range. If no default is provided and the
 * variable is absent, an error is thrown.
 *
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default port number (must be 1–65535).
 * @returns The validated port number as an integer.
 *
 * @throws {TypeError} If key is not a string.
 * @throws {TypeError} If defaultValue is provided but is not a number.
 * @throws {Error} If key is an empty string.
 * @throws {Error} If defaultValue is provided but outside the range 1–65535 or NaN.
 * @throws {Error} If the variable is not set and no default was provided.
 * @throws {Error} If the variable's value is not a valid integer in the range 1–65535.
 *
 * @example
 * // Required port — throws if PORT is absent or invalid
 * const port = parseEnvPort('PORT');
 *
 * @example
 * // Optional port with sensible default
 * const port = parseEnvPort('PORT', 3000); // 3000 if PORT not set
 *
 * @example
 * // Invalid port number
 * // process.env.PORT = '99999'
 * parseEnvPort('PORT');
 * // Throws: "Environment variable 'PORT' must be a valid port (1–65535), got '99999'"
 *
 * @example
 * // Non-numeric value
 * // process.env.PORT = 'abc'
 * parseEnvPort('PORT');
 * // Throws: "Environment variable 'PORT' must be a valid port (1–65535), got 'abc'"
 *
 * @note Fractional values (e.g. `'3000.5'`) are rejected because the raw string
 *   cannot be cleanly parsed as an integer.
 * @note Port 0 is excluded as it is the "any available port" sentinel — use
 *   `parseEnvInt` directly if you need that behaviour.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function parseEnvPort(key: string, defaultValue?: number): number {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  if (defaultValue !== undefined) {
    if (typeof defaultValue !== 'number') {
      throw new TypeError(`defaultValue must be a number, got ${typeof defaultValue}`);
    }
    if (isNaN(defaultValue) || !Number.isInteger(defaultValue) || defaultValue < 1 || defaultValue > 65535) {
      throw new Error(
        `defaultValue must be a valid port (1–65535), got ${defaultValue}`,
      );
    }
  }

  const raw = process.env[key];

  if (raw === undefined || raw === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Required environment variable '${key}' is not set`);
  }

  const parsed = Number(raw);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(
      `Environment variable '${key}' must be a valid port (1–65535), got '${raw}'`,
    );
  }

  return parsed;
}
