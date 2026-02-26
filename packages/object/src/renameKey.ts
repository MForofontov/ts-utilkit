/**
 * Returns a new object with a single key renamed, preserving all other keys
 * and values unchanged. The key order in the result follows the original
 * object's insertion order, with the renamed key at its original position.
 *
 * @template T - The type of the object values.
 * @param obj - The source object.
 * @param oldKey - The key to rename.
 * @param newKey - The new name for the key.
 * @returns A new object with the key renamed.
 *
 * @throws {TypeError} If obj is not a non-null object.
 * @throws {TypeError} If oldKey is not a string.
 * @throws {TypeError} If newKey is not a string.
 * @throws {Error} If oldKey does not exist on the object.
 * @throws {Error} If newKey already exists on the object (prevents silent overwrite).
 *
 * @example
 * // Basic rename
 * renameKey({ id: 1, name: 'Alice' }, 'id', 'userId');
 * // { userId: 1, name: 'Alice' }
 *
 * @example
 * // Rename preserves insertion order
 * renameKey({ a: 1, b: 2, c: 3 }, 'b', 'beta');
 * // { a: 1, beta: 2, c: 3 }
 *
 * @example
 * // Useful for normalising API response field names
 * renameKey(apiResponse, 'user_id', 'userId');
 *
 * @note The original object is not mutated; a shallow copy is returned.
 * @note To rename multiple keys, use transformKeys with a mapping function.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of keys
 */
export function renameKey<T>(
  obj: Record<string, T>,
  oldKey: string,
  newKey: string,
): Record<string, T> {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new TypeError(`obj must be a non-null object, got ${obj === null ? 'null' : typeof obj}`);
  }
  if (typeof oldKey !== 'string') {
    throw new TypeError(`oldKey must be a string, got ${typeof oldKey}`);
  }
  if (typeof newKey !== 'string') {
    throw new TypeError(`newKey must be a string, got ${typeof newKey}`);
  }
  if (!Object.prototype.hasOwnProperty.call(obj, oldKey)) {
    throw new Error(`Key "${oldKey}" does not exist on the object`);
  }
  if (oldKey !== newKey && Object.prototype.hasOwnProperty.call(obj, newKey)) {
    throw new Error(`Key "${newKey}" already exists on the object`);
  }

  const result: Record<string, T> = {};
  for (const key of Object.keys(obj)) {
    result[key === oldKey ? newKey : key] = obj[key];
  }
  return result;
}
