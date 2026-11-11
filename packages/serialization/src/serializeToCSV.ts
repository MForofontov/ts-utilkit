/**
 * Converts an array of objects to CSV string format.
 *
 * @param data - Array of objects to serialize.
 * @param options - CSV options (delimiter, includeHeaders).
 * @returns The CSV string representation.
 *
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
 * @note Values containing delimiters, quotes, or CR/LF are quoted. Blank values
 * are also quoted in single-column or whitespace-delimited output to retain rows.
 *
 * @complexity Time: O(n * m), Space: O(n * m) where n is rows, m is columns
 */
export function serializeToCSV(
  data: Record<string, any>[],
  options: { delimiter?: string; includeHeaders?: boolean } = {},
): string {
  if (data.length === 0) {
    throw new Error('data array cannot be empty');
  }

  const { delimiter = ',', includeHeaders = true } = options;

  const keys = Object.keys(data[0]);

  if (keys.length === 0) {
    throw new Error('Objects must have at least one key');
  }

  const escapeValue = (value: unknown): string => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- CSV cells deliberately retain native String coercion for arbitrary values.
    const str = String(value ?? '');
    if (
      (str.trim().length === 0 &&
        (keys.length === 1 || delimiter.trim().length === 0)) ||
      str.includes(delimiter) ||
      str.includes('\r') ||
      str.includes('\n') ||
      str.includes('"')
    ) {
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
