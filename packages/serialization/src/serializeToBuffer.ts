/**
 * Serializes data to Buffer using JSON encoding.
 *
 * @param data - The data to serialize to Buffer.
 * @param encoding - The character encoding (default: 'utf8').
 * @returns Buffer containing serialized data.
 *
 * @throws {TypeError} If encoding is not a string.
 * @throws {Error} If serialization fails.
 *
 * @example
 * // Serialize to Buffer
 * serializeToBuffer({ name: 'John' }); // <Buffer ...>
 *
 * @example
 * // Serialize with different encoding
 * serializeToBuffer('hello', 'base64');
 *
 * @note Uses JSON.stringify internally for objects.
 *
 * @complexity Time: O(n), Space: O(n) where n is data size
 */
export function serializeToBuffer(
  data: any,
  encoding: BufferEncoding = 'utf8',
): Buffer {
  if (typeof encoding !== 'string') {
    throw new TypeError(`encoding must be a string, got ${typeof encoding}`);
  }

  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    return Buffer.from(jsonString, encoding);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to serialize to Buffer: ${error.message}`);
    }
    throw new Error('Failed to serialize to Buffer: Unknown error');
  }
}
