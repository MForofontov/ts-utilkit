/**
 * Parses CSV string to array of objects.
 *
 * @param csvString - The CSV string to parse.
 * @param options - CSV options (delimiter, hasHeaders).
 * @returns Array of objects representing CSV rows.
 *
 * @throws {Error} If csvString is empty.
 *
 * @example
 * // Parse CSV with headers
 * deserializeFromCSV('name,age\nJohn,30\nJane,25');
 * // [{ name: 'John', age: '30' }, { name: 'Jane', age: '25' }]
 *
 * @example
 * // Parse without headers (uses col0, col1, etc.)
 * deserializeFromCSV('1,2\n3,4', { hasHeaders: false });
 * // [{ col0: '1', col1: '2' }, { col0: '3', col1: '4' }]
 *
 * @note Handles quoted values and escaped quotes.
 *
 * @complexity Time: O(n * m), Space: O(n * m) where n is rows, m is columns
 */
export function deserializeFromCSV(
  csvString: string,
  options: { delimiter?: string; hasHeaders?: boolean } = {},
): Record<string, string>[] {
  if (csvString.length === 0) {
    throw new Error('csvString cannot be empty');
  }

  const { delimiter = ',', hasHeaders = true } = options;

  if (delimiter.length !== 1 || /["\r\n]/.test(delimiter)) {
    throw new Error(
      'delimiter must be one character other than a quote or newline',
    );
  }

  const parseRow = (row: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      const nextChar = row[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    values.push(current);
    return values;
  };

  const lines: string[] = [];
  let line = '';
  let inQuotes = false;
  for (let i = 0; i < csvString.length; i++) {
    const char = csvString[i];
    if (char === '"') {
      if (inQuotes && csvString[i + 1] === '"') {
        line += '""';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
    }
    if (char === '\n' && !inQuotes) {
      if (line.trim().length > 0) lines.push(line.replace(/\r$/, ''));
      line = '';
    } else {
      line += char;
    }
  }
  if (inQuotes) throw new Error('Unclosed quoted field in CSV');
  if (line.trim().length > 0) lines.push(line.replace(/\r$/, ''));

  if (lines.length === 0) {
    throw new Error('csvString must contain at least one line');
  }

  const headers = hasHeaders
    ? parseRow(lines[0])
    : parseRow(lines[0]).map((_, i) => `col${i}`);
  const dataLines = hasHeaders ? lines.slice(1) : lines;

  return dataLines.map((line) => {
    const values = parseRow(line);
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? '']),
    );
  });
}
