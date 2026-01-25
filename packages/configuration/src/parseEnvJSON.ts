/**
 * Parses an environment variable as JSON with optional default value.
 *
 * @template T - The expected type of the parsed JSON.
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default value if variable is not set or invalid JSON.
 * @returns The parsed JSON object or default value.
 *
 * @throws {TypeError} If key is not a string.
 * @throws {Error} If key is empty.
 *
 * @example
 * // Parse JSON configuration
 * parseEnvJSON<{ db: string }>('CONFIG', { db: 'localhost' });
 *
 * @example
 * // Parse array from JSON
 * parseEnvJSON<number[]>('PORTS', [3000, 4000]);
 *
 * @note Returns defaultValue if JSON parsing fails.
 *
 * @complexity Time: O(n), Space: O(n) where n is JSON string length
 */
export function parseEnvJSON<T = any>(
  key: string,
  defaultValue?: T,
): T | undefined {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}
