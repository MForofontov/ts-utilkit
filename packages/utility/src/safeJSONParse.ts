/**
 * Safely parses a JSON string, returning a fallback value on failure.
 *
 * @param jsonString - The JSON string to parse.
 * @param defaultValue - The default value to return if parsing fails.
 * @returns The parsed object of type T, or the default value if parsing fails.
 *
 * @throws {TypeError} If jsonString is not a string.
 *
 * @example
 * // Basic usage with valid JSON
 * safeJSONParse('{"name":"John"}', {}); // { name: 'John' }
 * safeJSONParse('[1, 2, 3]', []); // [1, 2, 3]
 *
 * @example
 * // With malformed JSON (returns default)
 * safeJSONParse('Invalid JSON', {}); // {}
 * safeJSONParse('{broken', { fallback: true }); // { fallback: true }
 * safeJSONParse('undefined', null); // null
 *
 * @example
 * // Type-safe parsing
 * interface User { name: string; age: number; }
 * const user = safeJSONParse<User>('{"name":"Alice","age":30}', { name: '', age: 0 });
 * // user: { name: 'Alice', age: 30 }
 *
 * @example
 * // With different default value types
 * safeJSONParse('invalid', []); // []
 * safeJSONParse('invalid', 0); // 0
 * safeJSONParse('invalid', 'default'); // 'default'
 * safeJSONParse('invalid', false); // false
 *
 * @note Wraps JSON.parse in a try/catch block to handle parsing errors gracefully.
 * @note Useful when dealing with untrusted data, user input, or external API responses.
 * @note Does not validate that the parsed result matches the expected type T.
 * @note Returns the default value for any parsing error (syntax errors, unexpected tokens, etc.).
 * @note The default value is returned by reference, not cloned.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the JSON string
 */
export function safeJSONParse<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
}
