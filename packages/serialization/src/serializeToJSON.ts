/**
 * Safely serializes data to JSON string with error handling and options.
 *
 * @param data - The data to serialize.
 * @param pretty - Whether to format with indentation (default: false).
 * @param space - Number of spaces for indentation when pretty is true (default: 2).
 * @returns The JSON string representation.
 *
 * @throws {TypeError} If space is not a number.
 * @throws {Error} If data contains circular references or cannot be serialized.
 *
 * @example
 * // Serialize object
 * serializeToJSON({ name: 'John', age: 30 }); // '{"name":"John","age":30}'
 *
 * @example
 * // Serialize with pretty formatting
 * serializeToJSON({ name: 'John' }, true); // '{\n  "name": "John"\n}'
 *
 * @note Functions, symbols, and undefined values are removed during serialization.
 *
 * @complexity Time: O(n), Space: O(n) where n is data size
 */
export function serializeToJSON(
  data: any,
  pretty: boolean = false,
  space: number = 2,
): string {
  if (typeof pretty !== 'boolean') {
    throw new TypeError(`pretty must be a boolean, got ${typeof pretty}`);
  }

  if (typeof space !== 'number') {
    throw new TypeError(`space must be a number, got ${typeof space}`);
  }

  if (isNaN(space)) {
    throw new TypeError('space must be a valid number, not NaN');
  }

  try {
    return JSON.stringify(data, null, pretty ? space : undefined);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to serialize to JSON: ${error.message}`);
    }
    throw new Error('Failed to serialize to JSON: Unknown error');
  }
}
