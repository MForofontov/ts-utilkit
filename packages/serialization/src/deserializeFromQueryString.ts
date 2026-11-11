/**
 * Parses URL query string to object.
 *
 * @param queryString - The query string to parse (with or without leading ?).
 * @param options - Options for decoding (decodeValues, arrayFormat).
 * @returns Object representation of query string.
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
  const { decodeValues = true, arrayFormat = 'auto' } = options;

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

    const separator = pair.indexOf('=');
    const rawKey = separator === -1 ? pair : pair.slice(0, separator);
    const rawValue = separator === -1 ? '' : pair.slice(separator + 1);

    const key = decodeValues ? decodeURIComponent(rawKey) : rawKey;
    const value = decodeValues ? decodeURIComponent(rawValue) : rawValue;

    // Check if it's an array key
    if (key.endsWith('[]')) {
      const baseKey = key.slice(0, -2);
      if (!Object.hasOwn(result, baseKey)) {
        Object.defineProperty(result, baseKey, {
          value: [],
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else if (!Array.isArray(result[baseKey])) {
        result[baseKey] = [result[baseKey]];
      }
      result[baseKey].push(value);
    } else if (arrayFormat === 'auto' && Object.hasOwn(result, key)) {
      // Auto-detect repeated keys as arrays
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      Object.defineProperty(result, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  }

  return result;
}
