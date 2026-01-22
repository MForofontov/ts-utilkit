/**
 * Applies default values to an object while preserving existing properties.
 *
 * @param obj - The source object whose properties take precedence.
 * @param defaults - The default values to apply where properties don't exist in source.
 * @returns A new object combining properties from both inputs.
 *
 * @throws {TypeError} If obj is not an object or is null.
 * @throws {TypeError} If defaults is not an object or is null.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const defaults = { b: 3, c: 4 };
 * const result = applyDefaults(obj, defaults);
 * // { a: 1, b: 2, c: 4 }
 *
 * @example
 * // User settings with fallback defaults
 * const userSettings = { theme: 'dark' };
 * const defaultSettings = { theme: 'light', lang: 'en', timeout: 30 };
 * applyDefaults(userSettings, defaultSettings);
 * // { theme: 'dark', lang: 'en', timeout: 30 }
 *
 * @example
 * // Empty object gets all defaults
 * applyDefaults({}, { a: 1, b: 2 });
 * // { a: 1, b: 2 }
 *
 * @example
 * // Object with all properties overrides all defaults
 * applyDefaults({ a: 5, b: 10 }, { a: 1, b: 2 });
 * // { a: 5, b: 10 }
 *
 * @example
 * // Real-world: API request options with defaults
 * const userOptions = { timeout: 10000 };
 * const defaultOptions = { method: 'GET', timeout: 5000, retries: 3 };
 * const options = applyDefaults(userOptions, defaultOptions);
 * // { method: 'GET', timeout: 10000, retries: 3 }
 *
 * @note Creates a new object without modifying the originals.
 * @note Properties in obj take precedence over properties in defaults.
 * @note Only performs shallow merging - doesn't deep merge nested objects.
 * @note Equivalent to { ...defaults, ...obj } but with type safety and validation.
 * @note Useful for configuration objects and function options.
 *
 * @complexity Time: O(n + m), Space: O(n + m) - Where n, m are property counts
 */
export function applyDefaults<T extends Record<string, unknown>>(
  obj: T,
  defaults: Partial<T>,
): T {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('The first argument must be a non-null object');
  }
  if (typeof defaults !== 'object' || defaults === null) {
    throw new TypeError('The second argument must be a non-null object');
  }

  return { ...defaults, ...obj };
}
