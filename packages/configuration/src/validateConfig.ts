/**
 * Validates a configuration object against a schema of required keys.
 *
 * @template T - The configuration object type.
 * @param config - The configuration object to validate.
 * @param requiredKeys - Array of required key paths (supports nested with dot notation).
 * @returns True if all required keys are present.
 *
 * @throws {TypeError} If config is not an object or requiredKeys is not an array.
 * @throws {Error} If config is null or any required key is missing.
 *
 * @example
 * // Validate simple config
 * validateConfig({ port: 3000, host: 'localhost' }, ['port', 'host']); // true
 *
 * @example
 * // Validate nested config with dot notation
 * validateConfig({ db: { host: 'localhost' } }, ['db.host']); // true
 *
 * @note Throws error if any required key is missing or undefined.
 *
 * @complexity Time: O(n * m), Space: O(1) where n is keys, m is average depth
 */
export function validateConfig<T extends Record<string, any>>(
  config: T,
  requiredKeys: string[],
): boolean {
  if (config === null || typeof config !== 'object' || Array.isArray(config)) {
    throw new TypeError(
      `config must be an object, got ${Array.isArray(config) ? 'array' : typeof config}`,
    );
  }

  if (!Array.isArray(requiredKeys)) {
    throw new TypeError(
      `requiredKeys must be an array, got ${typeof requiredKeys}`,
    );
  }

  for (const key of requiredKeys) {
    if (typeof key !== 'string') {
      throw new TypeError(
        `All required keys must be strings, got ${typeof key}`,
      );
    }

    const value = getNestedValue(config, key);

    if (value === undefined) {
      throw new Error(
        `Required configuration key '${key}' is missing or undefined`,
      );
    }
  }

  return true;
}

/**
 * Helper function to get nested value using dot notation.
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}
