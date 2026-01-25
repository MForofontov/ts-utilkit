/**
 * Converts an array of objects to CSV string format.
 *
 * @param data - Array of objects to serialize.
 * @param options - CSV options (delimiter, includeHeaders).
 * @returns The CSV string representation.
 *
 * @throws {TypeError} If data is not an array or options are invalid.
 * @throws {Error} If data is empty or objects have no keys.
 *
 * @example
 * // Convert to CSV with headers
 * serializeToCSV([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
 * // 'name,age\nJohn,30\nJane,25'
 *
 * @example
 * // Custom delimiter without headers
 * serializeToCSV([{ a: 1, b: 2 }], { delimiter: ';', includeHeaders: false });
 * // '1;2'
 *
 * @note Values containing delimiter or newlines are quoted.
 *
 * @complexity Time: O(n * m), Space: O(n * m) where n is rows, m is columns
 */
export function serializeToCSV(
  data: Record<string, any>[],
  options: { delimiter?: string; includeHeaders?: boolean } = {},
): string {
  if (!Array.isArray(data)) {
    throw new TypeError(`data must be an array, got ${typeof data}`);
  }

  if (data.length === 0) {
    throw new Error('data array cannot be empty');
  }

  const { delimiter = ',', includeHeaders = true } = options;

  if (typeof delimiter !== 'string') {
    throw new TypeError(`delimiter must be a string, got ${typeof delimiter}`);
  }

  if (typeof includeHeaders !== 'boolean') {
    throw new TypeError(
      `includeHeaders must be a boolean, got ${typeof includeHeaders}`,
    );
  }

  const keys = Object.keys(data[0]);

  if (keys.length === 0) {
    throw new Error('Objects must have at least one key');
  }

  const escapeValue = (value: any): string => {
    const str = String(value ?? '');
    if (str.includes(delimiter) || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(keys.map(escapeValue).join(delimiter));
  }

  for (const row of data) {
    const values = keys.map((key) => escapeValue(row[key]));
    lines.push(values.join(delimiter));
  }

  return lines.join('\n');
}
