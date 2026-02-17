/**
 * Retrieves a required environment variable, throwing an error if not set.
 *
 * @param key - The environment variable name to retrieve.
 * @returns The environment variable value.
 *
 * @throws {TypeError} If key is not a string.
 * @throws {Error} If key is empty or environment variable is not set.
 *
 * @example
 * // Get required environment variable
 * requireEnv('DATABASE_URL'); // Throws if not set
 *
 * @example
 * // Use in configuration
 * const dbUrl = requireEnv('DATABASE_URL');
 *
 * @note Useful for enforcing required configuration at startup.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function requireEnv(key: string): string {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    throw new Error(`Required environment variable '${key}' is not set`);
  }

  return value;
}
