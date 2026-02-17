/**
 * Retrieves an environment variable value with optional default and type conversion.
 *
 * @param key - The environment variable name to retrieve.
 * @param defaultValue - Optional default value if the variable is not set.
 * @returns The environment variable value or default value.
 *
 * @throws {TypeError} If key is not a string.
 * @throws {Error} If key is an empty string.
 *
 * @example
 * // Get environment variable with default
 * getEnv('PORT', '3000'); // '3000' if PORT not set
 *
 * @example
 * // Get required environment variable
 * getEnv('DATABASE_URL'); // undefined if not set
 *
 * @note Uses process.env for Node.js environments.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getEnv(key: string, defaultValue?: string): string | undefined {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
}
