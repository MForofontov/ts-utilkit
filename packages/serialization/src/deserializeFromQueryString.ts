/**
 * Parses URL query string to object.
 *
 * @param queryString - The query string to parse (with or without leading ?).
 * @param options - Options for decoding (decodeValues, arrayFormat).
 * @returns Object representation of query string.
 *
 * @throws {TypeError} If queryString is not a string or options are invalid.
 *
 * @example
 * // Parse query string
 * deserializeFromQueryString('name=John&age=30'); // { name: 'John', age: '30' }
 *
 * @example
 * // Parse with arrays
 * deserializeFromQueryString('items[]=1&items[]=2');
 * // { items: ['1', '2'] }
 *
 * @note Removes leading ? if present.
 *
 * @complexity Time: O(n), Space: O(n) where n is number of parameters
 */
export function deserializeFromQueryString(
  queryString: string,
  options: { decodeValues?: boolean; arrayFormat?: 'brackets' | 'auto' } = {},
): Record<string, any> {
  if (typeof queryString !== 'string') {
    throw new TypeError(
      `queryString must be a string, got ${typeof queryString}`,
    );
  }

  const { decodeValues = true, arrayFormat = 'auto' } = options;

  if (typeof decodeValues !== 'boolean') {
    throw new TypeError(
      `decodeValues must be a boolean, got ${typeof decodeValues}`,
    );
  }

  if (!['brackets', 'auto'].includes(arrayFormat)) {
    throw new TypeError(
      `arrayFormat must be 'brackets' or 'auto', got ${arrayFormat}`,
    );
  }

  // Remove leading ?
  const cleanString = queryString.startsWith('?')
    ? queryString.slice(1)
    : queryString;

  if (cleanString.length === 0) {
    return {};
  }

  const result: Record<string, any> = {};

  const pairs = cleanString.split('&');

  for (const pair of pairs) {
    if (pair.length === 0) continue;

    const [rawKey, rawValue = ''] = pair.split('=');

    const key = decodeValues ? decodeURIComponent(rawKey) : rawKey;
    const value = decodeValues ? decodeURIComponent(rawValue) : rawValue;

    // Check if it's an array key
    if (key.endsWith('[]')) {
      const baseKey = key.slice(0, -2);
      if (!result[baseKey]) {
        result[baseKey] = [];
      }
      result[baseKey].push(value);
    } else if (arrayFormat === 'auto' && result[key] !== undefined) {
      // Auto-detect repeated keys as arrays
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
