/**
 * Deserializes Buffer to data using JSON decoding.
 *
 * @template T - The expected type of the deserialized data.
 * @param buffer - The Buffer to deserialize.
 * @param encoding - The character encoding (default: 'utf8').
 * @param parseJSON - Whether to parse as JSON (default: true).
 * @returns The deserialized data.
 *
 * @throws {TypeError} If buffer is not a Buffer or encoding is not a string.
 * @throws {Error} If deserialization fails.
 *
 * @example
 * // Deserialize Buffer
 * const buf = Buffer.from('{"name":"John"}');
 * deserializeFromBuffer<{ name: string }>(buf); // { name: 'John' }
 *
 * @example
 * // Deserialize as string without parsing
 * deserializeFromBuffer(buf, 'utf8', false); // '{"name":"John"}'
 *
 * @note Attempts to parse JSON if parseJSON is true.
 *
 * @complexity Time: O(n), Space: O(n) where n is buffer size
 */
export function deserializeFromBuffer<T = any>(
  buffer: Buffer,
  encoding: BufferEncoding = 'utf8',
  parseJSON: boolean = true,
): T {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError(`buffer must be a Buffer, got ${typeof buffer}`);
  }

  if (typeof encoding !== 'string') {
    throw new TypeError(`encoding must be a string, got ${typeof encoding}`);
  }

  if (typeof parseJSON !== 'boolean') {
    throw new TypeError(`parseJSON must be a boolean, got ${typeof parseJSON}`);
  }

  try {
    const str = buffer.toString(encoding);

    if (!parseJSON) {
      return str as T;
    }

    return JSON.parse(str) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to deserialize from Buffer: ${error.message}`);
    }
    throw new Error('Failed to deserialize from Buffer: Unknown error');
  }
}
