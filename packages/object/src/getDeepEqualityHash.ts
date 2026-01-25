/**
 * Generates a numeric hash for an object based on its structure and values.
 * Useful for comparing objects or using objects as keys in collections.
 *
 * @param obj - The object to generate a hash for.
 * @returns A numeric hash code representing the object's content.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Objects with the same content produce the same hash
 * const hash1 = getDeepEqualityHash({ a: 1, b: [2, 3] });
 * const hash2 = getDeepEqualityHash({ a: 1, b: [2, 3] });
 * hash1 === hash2; // true
 *
 * @example
 * // Different content produces different hash
 * const hashA = getDeepEqualityHash({ a: 1, b: 2 });
 * const hashB = getDeepEqualityHash({ a: 1, b: 3 });
 * hashA !== hashB; // true
 *
 * @example
 * // Nested objects with same structure
 * const hash1 = getDeepEqualityHash({ user: { name: 'Alice', age: 30 }, active: true });
 * const hash2 = getDeepEqualityHash({ user: { name: 'Alice', age: 30 }, active: true });
 * hash1 === hash2; // true
 *
 * @example
 * // Property order affects hash
 * const hash1 = getDeepEqualityHash({ a: 1, b: 2 });
 * const hash2 = getDeepEqualityHash({ b: 2, a: 1 });
 * hash1 !== hash2; // true (different JSON.stringify order)
 *
 * @example
 * // Real-world: Using objects as map keys
 * const cache = new Map<number, string>();
 * const config = { theme: 'dark', lang: 'en' };
 * const hash = getDeepEqualityHash(config);
 * cache.set(hash, 'Cached result for this config');
 *
 * @note Uses JSON.stringify internally, so functions, undefined values, and circular references are not supported.
 * @note Hash collisions are possible but unlikely for typical objects with different content.
 * @note Property order in the object affects the hash value.
 * @note Returns a 32-bit integer hash using bitwise left shift and character code accumulation.
 * @note Useful for cache keys, object comparison, and detecting deep structural changes.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the total number of properties (including nested)
 */
export function getDeepEqualityHash(obj: unknown): number {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return JSON.stringify(obj)
    .split('')
    .reduce((hash, char) => {
      return (hash << 5) - hash + char.charCodeAt(0);
    }, 0);
}
