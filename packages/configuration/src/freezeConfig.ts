/**
 * Deep freezes a configuration object, making it immutable at all levels.
 *
 * @template T - The configuration object type.
 * @param config - The configuration object to freeze.
 * @returns The frozen configuration object.
 *
 * @throws {TypeError} If config is not an object or is null.
 *
 * @example
 * // Freeze configuration
 * const config = freezeConfig({ port: 3000, db: { host: 'localhost' } });
 * config.port = 4000; // Throws in strict mode, silently fails otherwise
 *
 * @example
 * // Prevent nested modifications
 * const config = freezeConfig({ db: { host: 'localhost' } });
 * config.db.host = 'remote'; // Throws in strict mode
 *
 * @note Uses Object.freeze recursively. Arrays are also frozen.
 *
 * @complexity Time: O(n), Space: O(1) where n is total number of properties
 */
export function freezeConfig<T extends Record<string, any>>(
  config: T,
): Readonly<T> {
  if (config === null || typeof config !== 'object') {
    throw new TypeError(`config must be an object, got ${typeof config}`);
  }

  // Freeze the object itself
  Object.freeze(config);

  // Recursively freeze all nested objects
  Object.keys(config).forEach((key) => {
    const value = config[key];

    if (
      value !== null &&
      typeof value === 'object' &&
      !Object.isFrozen(value)
    ) {
      freezeConfig(value);
    }
  });

  return config as Readonly<T>;
}
