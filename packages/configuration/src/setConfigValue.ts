/**
 * Sets a nested configuration value using dot notation, creating paths as needed.
 *
 * @param config - The configuration object to modify.
 * @param path - Dot-notation path to set (e.g., 'db.host.primary').
 * @param value - The value to set at the path.
 * @returns The modified configuration object.
 *
 * @throws {TypeError} If config is not an object or path is not a string.
 * @throws {Error} If path is empty.
 *
 * @example
 * // Set nested value
 * setConfigValue({}, 'db.host', 'localhost');
 * // Result: { db: { host: 'localhost' } }
 *
 * @example
 * // Override existing value
 * setConfigValue({ db: { port: 5432 } }, 'db.port', 3306);
 * // Result: { db: { port: 3306 } }
 *
 * @note Modifies the config object in place and returns it.
 *
 * @complexity Time: O(n), Space: O(n) where n is path depth
 */
export function setConfigValue(
  config: Record<string, any>,
  path: string,
  value: any,
): Record<string, any> {
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

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (
      current[key] === undefined ||
      current[key] === null ||
      typeof current[key] !== 'object' ||
      Array.isArray(current[key])
    ) {
      current[key] = {};
    }

    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  return config;
}
