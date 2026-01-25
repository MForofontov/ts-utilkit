/**
 * Converts an object to URL query string format.
 *
 * @param data - Object to serialize to query string.
 * @param options - Options for encoding (encodeValues, arrayFormat).
 * @returns The query string (without leading ?).
 *
 * @throws {TypeError} If data is not an object or options are invalid.
 *
 * @example
 * // Basic query string
 * serializeToQueryString({ name: 'John', age: 30 }); // 'name=John&age=30'
 *
 * @example
 * // Array with brackets format
 * serializeToQueryString({ items: [1, 2, 3] }, { arrayFormat: 'brackets' });
 * // 'items[]=1&items[]=2&items[]=3'
 *
 * @note Null and undefined values are skipped.
 *
 * @complexity Time: O(n), Space: O(n) where n is number of properties
 */
export function serializeToQueryString(
  data: Record<string, any>,
  options: {
    encodeValues?: boolean;
    arrayFormat?: 'repeat' | 'brackets' | 'comma';
  } = {},
): string {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new TypeError(
      `data must be an object, got ${Array.isArray(data) ? 'array' : typeof data}`,
    );
  }

  const { encodeValues = true, arrayFormat = 'repeat' } = options;

  if (typeof encodeValues !== 'boolean') {
    throw new TypeError(
      `encodeValues must be a boolean, got ${typeof encodeValues}`,
    );
  }

  if (!['repeat', 'brackets', 'comma'].includes(arrayFormat)) {
    throw new TypeError(
      `arrayFormat must be 'repeat', 'brackets', or 'comma', got ${arrayFormat}`,
    );
  }

  const parts: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      continue;
    }

    const encodedKey = encodeValues ? encodeURIComponent(key) : key;

    if (Array.isArray(value)) {
      if (arrayFormat === 'comma') {
        const encodedValue = encodeValues
          ? value.map((v) => encodeURIComponent(String(v))).join(',')
          : value.join(',');
        parts.push(`${encodedKey}=${encodedValue}`);
      } else if (arrayFormat === 'brackets') {
        value.forEach((v) => {
          const encodedValue = encodeValues
            ? encodeURIComponent(String(v))
            : String(v);
          parts.push(`${encodedKey}[]=${encodedValue}`);
        });
      } else {
        // repeat
        value.forEach((v) => {
          const encodedValue = encodeValues
            ? encodeURIComponent(String(v))
            : String(v);
          parts.push(`${encodedKey}=${encodedValue}`);
        });
      }
    } else {
      const encodedValue = encodeValues
        ? encodeURIComponent(String(value))
        : String(value);
      parts.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return parts.join('&');
}
