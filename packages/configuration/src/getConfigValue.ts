/**
 * Retrieves a nested configuration value using dot notation with optional default.
 *
 * @template T - The expected value type.
 * @param config - The configuration object.
 * @param path - Dot-notation path to the value (e.g., 'db.host.primary').
 * @param defaultValue - Optional default value if path doesn't exist.
 * @returns The value at the path or default value.
 *
 * @throws {TypeError} If config is not an object or path is not a string.
 * @throws {Error} If path is empty.
 *
 * @example
 * // Get nested value
 * getConfigValue({ db: { host: 'localhost' } }, 'db.host'); // 'localhost'
 *
 * @example
 * // Get with default
 * getConfigValue({ db: {} }, 'db.port', 5432); // 5432
 *
 * @note Returns undefined if path doesn't exist and no default provided.
 *
 * @complexity Time: O(n), Space: O(1) where n is path depth
 */
export function getConfigValue<T = any>(
  config: Record<string, any>,
  path: string,
  defaultValue?: T,
): T | undefined {
  if (config === null || typeof config !== 'object' || Array.isArray(config)) {
    throw new TypeError(
      `config must be an object, got ${Array.isArray(config) ? 'array' : typeof config}`,
    );
  }

  if (typeof path !== 'string') {
    throw new TypeError(`path must be a string, got ${typeof path}`);
  }

  if (path.length === 0) {
    throw new Error('path cannot be an empty string');
  }

  const keys = path.split('.');
  let current: any = config;

  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? current : defaultValue;
}
