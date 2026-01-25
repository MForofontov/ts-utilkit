/**
 * Safely deserializes JSON string to data with error handling and validation.
 *
 * @template T - The expected type of the deserialized data.
 * @param jsonString - The JSON string to deserialize.
 * @param validate - Optional validation function to verify deserialized data.
 * @returns The deserialized data.
 *
 * @throws {TypeError} If jsonString is not a string.
 * @throws {Error} If JSON is invalid or validation fails.
 *
 * @example
 * // Deserialize JSON string
 * deserializeFromJSON<{ name: string }>('{"name":"John"}'); // { name: 'John' }
 *
 * @example
 * // Deserialize with validation
 * deserializeFromJSON('{"age":30}', (data) => typeof data.age === 'number');
 *
 * @note Returns the parsed data if valid JSON.
 *
 * @complexity Time: O(n), Space: O(n) where n is string length
 */
export function deserializeFromJSON<T = any>(
  jsonString: string,
  validate?: (data: any) => boolean,
): T {
  if (typeof jsonString !== 'string') {
    throw new TypeError(
      `jsonString must be a string, got ${typeof jsonString}`,
    );
  }

  if (validate !== undefined && typeof validate !== 'function') {
    throw new TypeError(`validate must be a function, got ${typeof validate}`);
  }

  let data: any;

  try {
    data = JSON.parse(jsonString);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
    throw new Error('Failed to parse JSON: Unknown error');
  }

  if (validate && !validate(data)) {
    throw new Error('Validation failed for deserialized data');
  }

  return data as T;
}
