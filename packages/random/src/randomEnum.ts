/**
 * Picks a random value from an enum or object.
 *
 * @template T - The type of enum or object.
 * @param enumObj - The enum or object to pick from.
 * @returns A random value from the enum/object.
 *
 * @throws {TypeError} If enumObj is not an object.
 * @throws {Error} If enumObj has no enumerable values.
 *
 * @example
 * // From enum
 * enum Color { Red = 'red', Green = 'green', Blue = 'blue' }
 * randomEnum(Color); // 'red', 'green', or 'blue'
 *
 * @example
 * // From object
 * const status = { ACTIVE: 'active', INACTIVE: 'inactive' };
 * randomEnum(status); // 'active' or 'inactive'
 *
 * @note For numeric enums, returns the string keys, not numeric values.
 *
 * @complexity Time: O(n), Space: O(n) where n is number of enum values
 */
export function randomEnum<T extends Record<string, any>>(
  enumObj: T,
): T[keyof T] {
  if (typeof enumObj !== 'object' || enumObj === null) {
    throw new TypeError('enumObj must be an object');
  }

  const values = Object.values(enumObj).filter(
    (value) => typeof value !== 'number', // Filter out reverse mappings in numeric enums
  );

  if (values.length === 0) {
    throw new Error('enumObj must have at least one enumerable value');
  }

  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as T[keyof T];
}
