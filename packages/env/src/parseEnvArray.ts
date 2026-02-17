/**
 * Parses an environment variable as an array of strings using a delimiter.
 *
 * @param key - The environment variable name to retrieve.
 * @param delimiter - The delimiter to split the value (default: ',').
 * @param defaultValue - Optional default array if variable is not set.
 * @returns The parsed array or default value.
 *
 * @throws {TypeError} If key or delimiter is not a string, or defaultValue is not an array.
 * @throws {Error} If key is empty.
 *
 * @example
 * // Parse comma-separated list
 * parseEnvArray('ALLOWED_HOSTS', ',', []); // ['host1', 'host2', 'host3']
 *
 * @example
 * // Parse colon-separated path
 * parseEnvArray('PATH_DIRS', ':', []); // ['/usr/bin', '/usr/local/bin']
 *
 * @note Trims whitespace from each element.
 *
 * @complexity Time: O(n), Space: O(n) where n is number of elements
 */
export function parseEnvArray(
  key: string,
  delimiter: string = ',',
  defaultValue?: string[],
): string[] | undefined {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (typeof delimiter !== 'string') {
    throw new TypeError(`delimiter must be a string, got ${typeof delimiter}`);
  }

  if (defaultValue !== undefined && !Array.isArray(defaultValue)) {
    throw new TypeError(
      `defaultValue must be an array, got ${typeof defaultValue}`,
    );
  }

  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  if (delimiter.length === 0) {
    throw new Error('delimiter cannot be an empty string');
  }

  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  return value
    .split(delimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
