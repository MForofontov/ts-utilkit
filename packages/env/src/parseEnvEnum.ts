/**
 * Parses an environment variable and validates it against a fixed set of allowed values.
 *
 * Useful for typed configuration enumerations such as `NODE_ENV`, log levels,
 * deployment regions, or any setting where only a known set of strings is valid.
 * When a `defaultValue` is supplied the function returns it if the variable is
 * absent; when no default is given and the variable is absent, an error is thrown.
 *
 * @template T - A string literal union type representing the allowed values
 *   (e.g. `'development' | 'production' | 'test'`).
 * @param key - The environment variable name to retrieve.
 * @param allowedValues - An array of the only acceptable string values.
 * @param defaultValue - Optional value to return when the variable is not set.
 *   Must itself be one of the allowed values.
 * @returns The validated environment variable value, or the default value if
 *   the variable is not set and a default was provided.
 *
 * @throws {Error} If key is an empty string.
 * @throws {Error} If the variable is not set and no default was provided.
 * @throws {Error} If the variable's value is not in allowedValues.
 *
 * @example
 * // Required enum — throws if NODE_ENV is not set or not one of the allowed values
 * const env = parseEnvEnum<'development' | 'production' | 'test'>(
 *   'NODE_ENV',
 *   ['development', 'production', 'test'],
 * );
 *
 * @example
 * // Optional enum with default
 * const logLevel = parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error'], 'info');
 *
 * @example
 * // Invalid value throws a descriptive error
 * // process.env.LOG_LEVEL = 'verbose' (not in allowed list)
 * parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error']);
 * // Throws: "Environment variable 'LOG_LEVEL' has invalid value 'verbose'. Allowed: debug, info, warn, error"
 *
 * @note All comparisons are case-sensitive.
 * @note The allowedValues array is used as both a runtime guard and a TypeScript
 *   type constraint via the generic parameter T.
 *
 * @complexity Time: O(k) where k is the length of allowedValues, Space: O(1)
 */
export function parseEnvEnum<T extends string>(
  key: string,
  allowedValues: T[],
  defaultValue?: T,
): T {
  if (key.length === 0) {
    throw new Error('key cannot be an empty string');
  }

  const raw = process.env[key];

  if (raw === undefined || raw === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Required environment variable '${key}' is not set`);
  }

  if (!(allowedValues as string[]).includes(raw)) {
    throw new Error(
      `Environment variable '${key}' has invalid value '${raw}'. Allowed: ${allowedValues.join(', ')}`,
    );
  }

  return raw as T;
}
