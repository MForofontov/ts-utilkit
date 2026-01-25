/**
 * Safely parses JSON from a string, commonly used in web scraping for API responses.
 *
 * @template T - The expected type of the parsed JSON.
 * @param jsonString - The JSON string to parse.
 * @returns Parsed JSON object or null if parsing fails.
 *
 * @throws {TypeError} If jsonString is not a string.
 *
 * @example
 * const data = parseJSON<{ name: string }>('{"name":"John"}');
 * // { name: 'John' }
 *
 * @example
 * // Invalid JSON returns null
 * const data = parseJSON('invalid json');
 * // null
 *
 * @complexity Time: O(n) where n is string length, Space: O(n)
 */
export function parseJSON<T = unknown>(jsonString: string): T | null {
  if (typeof jsonString !== 'string') {
    throw new TypeError(
      `jsonString must be a string, got ${typeof jsonString}`,
    );
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}
