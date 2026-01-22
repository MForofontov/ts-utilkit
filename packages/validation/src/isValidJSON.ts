/**
 * Validates if a string is valid JSON (JavaScript Object Notation).
 *
 * @param jsonString - The JSON string to validate.
 * @returns True if the string is valid JSON, false otherwise.
 *
 * @throws {TypeError} If jsonString is not a string.
 *
 * @example
 * // Valid JSON strings
 * isValidJSON('{"name": "John", "age": 30}'); // true
 * isValidJSON('["apple", "banana", "cherry"]'); // true
 * isValidJSON('"hello world"'); // true
 * isValidJSON('123'); // true
 * isValidJSON('true'); // true
 * isValidJSON('null'); // true
 *
 * @example
 * // Invalid JSON strings
 * isValidJSON('{"name": "John", "age": 30,}'); // false (trailing comma)
 * isValidJSON("{'name': 'John'}"); // false (single quotes)
 * isValidJSON('{name: "John"}'); // false (unquoted key)
 * isValidJSON('undefined'); // false
 * isValidJSON(''); // false (empty string)
 *
 * @note This function uses JSON.parse() to validate the JSON string.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function isValidJSON(jsonString: string): boolean {
  if (typeof jsonString !== 'string') {
    throw new TypeError(
      `jsonString must be a string, got ${typeof jsonString}`,
    );
  }

  if (jsonString.trim() === '') {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}
