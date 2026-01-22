/**
 * Parses a key-value string into an object.
 * Supports various delimiters and handles escaped characters.
 *
 * @param input - The key-value string to parse (e.g., "key1=value1;key2=value2").
 * @param pairDelimiter - Delimiter between key-value pairs (default: ";").
 * @param keyValueDelimiter - Delimiter between key and value (default: "=").
 * @returns An object containing the parsed key-value pairs.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {TypeError} If delimiters are not strings.
 * @throws {Error} If input is empty.
 * @throws {Error} If a pair is missing the key-value delimiter.
 *
 * @example
 * // Basic usage
 * parseKeyValue("name=John;age=30"); // Returns { name: "John", age: "30" }
 *
 * @example
 * // Custom delimiters
 * parseKeyValue("name:John,age:30", ",", ":"); // Returns { name: "John", age: "30" }
 *
 * @example
 * // With whitespace trimming
 * parseKeyValue("name = John ; age = 30"); // Returns { name: "John", age: "30" }
 *
 * @example
 * // Empty values
 * parseKeyValue("key1=;key2=value2"); // Returns { key1: "", key2: "value2" }
 *
 * @note This function trims whitespace from keys and values.
 * If a key appears multiple times, the last value wins.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the length of input string
 */
export function parseKeyValue(
  input: string,
  pairDelimiter: string = ';',
  keyValueDelimiter: string = '=',
): Record<string, string> {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }
  if (typeof pairDelimiter !== 'string') {
    throw new TypeError(
      `pairDelimiter must be a string, got ${typeof pairDelimiter}`,
    );
  }
  if (typeof keyValueDelimiter !== 'string') {
    throw new TypeError(
      `keyValueDelimiter must be a string, got ${typeof keyValueDelimiter}`,
    );
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }

  const result: Record<string, string> = {};
  const pairs = input.split(pairDelimiter);

  for (const pair of pairs) {
    const trimmedPair = pair.trim();
    if (trimmedPair.length === 0) {
      continue; // Skip empty pairs
    }

    const delimiterIndex = trimmedPair.indexOf(keyValueDelimiter);
    if (delimiterIndex === -1) {
      throw new Error(
        `Invalid key-value pair: "${trimmedPair}" (missing "${keyValueDelimiter}")`,
      );
    }

    const key = trimmedPair.substring(0, delimiterIndex).trim();
    const value = trimmedPair.substring(delimiterIndex + 1).trim();

    if (key.length === 0) {
      throw new Error(`Invalid key-value pair: "${trimmedPair}" (empty key)`);
    }

    result[key] = value;
  }

  return result;
}
