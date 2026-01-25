/**
 * Creates a new object by transforming each property value using the provided function.
 * Preserves all original keys while applying the transformation function to each value.
 *
 * @param obj - The source object whose values will be transformed.
 * @param fn - The function to apply to each value, receives value and key as arguments.
 * @returns A new object with the same keys but transformed values.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Double all numeric values
 * const original = { a: 1, b: 2, c: 3 };
 * objectMap(original, value => value * 2);
 * // { a: 2, b: 4, c: 6 }
 *
 * @example
 * // Transform strings to uppercase
 * const names = { first: 'john', last: 'doe' };
 * objectMap(names, value => value.toUpperCase());
 * // { first: 'JOHN', last: 'DOE' }
 *
 * @example
 * // Use key in transformation
 * const data = { x: 5, y: 10 };
 * objectMap(data, (value, key) => `${key}=${value}`);
 * // { x: 'x=5', y: 'y=10' }
 *
 * @example
 * // Transform complex objects
 * const users = { u1: { age: 25 }, u2: { age: 30 } };
 * objectMap(users, user => ({ ...user, adult: user.age >= 18 }));
 * // { u1: { age: 25, adult: true }, u2: { age: 30, adult: true } }
 *
 * @example
 * // Real-world: Apply discount to prices
 * const prices = { laptop: 1000, phone: 500, tablet: 300 };
 * const discounted = objectMap(prices, price => price * 0.9);
 * // { laptop: 900, phone: 450, tablet: 270 }
 *
 * @note Creates a new object and doesn't modify the original.
 * @note Similar to Array.prototype.map() but for object values.
 * @note Keys are preserved; only values are transformed.
 * @note The transformation function receives both value and key.
 * @note Useful for batch transformations on object properties.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of properties
 */
export function objectMap<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U,
): Record<string, U> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key] = fn(obj[key], key);
      return acc;
    },
    {} as Record<string, U>,
  );
}
