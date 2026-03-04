/**
 * Safely parses JSON from a string, commonly used in web scraping for API responses.
 *
 * @deprecated Use `safeJSONParse` from `@ts-utilkit/utility` instead.
 * `safeJSONParse(str, null)` is equivalent and is the canonical implementation.
 * Will be removed in the next major version.
 *
 * @template T - The expected type of the parsed JSON.
 * @param jsonString - The JSON string to parse.
 * @returns Parsed JSON object or null if parsing fails.
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
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}
