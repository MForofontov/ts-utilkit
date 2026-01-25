/**
 * Deep merges multiple configuration objects, with later objects overriding earlier ones.
 *
 * @template T - The configuration object type.
 * @param configs - Configuration objects to merge.
 * @returns The merged configuration object.
 *
 * @throws {TypeError} If any config is not an object or is null.
 * @throws {Error} If no configs are provided.
 *
 * @example
 * // Merge default and user config
 * deepMergeConfig({ port: 3000, debug: false }, { debug: true });
 * // Result: { port: 3000, debug: true }
 *
 * @example
 * // Merge nested configurations
 * deepMergeConfig(
 *   { db: { host: 'localhost', port: 5432 } },
 *   { db: { port: 3306 } }
 * );
 * // Result: { db: { host: 'localhost', port: 3306 } }
 *
 * @note Arrays are replaced, not merged. Null values override.
 *
 * @complexity Time: O(n * m), Space: O(n * m) where n is number of configs, m is average depth
 */
export function deepMergeConfig<T extends Record<string, any>>(
  ...configs: T[]
): T {
  if (configs.length === 0) {
    throw new Error('At least one config object must be provided');
  }

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    if (
      config === null ||
      typeof config !== 'object' ||
      Array.isArray(config)
    ) {
      throw new TypeError(
        `Config at index ${i} must be an object, got ${Array.isArray(config) ? 'array' : typeof config}`,
      );
    }
  }

  const result: any = {};

  for (const config of configs) {
    mergeInto(result, config);
  }

  return result as T;
}

/**
 * Helper function to merge source into target.
 */
function mergeInto(target: any, source: any): void {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];

      if (
        sourceValue === null ||
        typeof sourceValue !== 'object' ||
        Array.isArray(sourceValue)
      ) {
        // Primitive, null, or array - replace directly
        target[key] = sourceValue;
      } else {
        // Object - merge recursively
        if (
          target[key] === undefined ||
          target[key] === null ||
          typeof target[key] !== 'object' ||
          Array.isArray(target[key])
        ) {
          target[key] = {};
        }
        mergeInto(target[key], sourceValue);
      }
    }
  }
}
