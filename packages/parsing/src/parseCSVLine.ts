/**
 * Parses a single CSV line into an array of fields.
 * Handles quoted fields, escaped quotes, and custom delimiters.
 *
 * @param input - The CSV line to parse.
 * @param delimiter - Field delimiter (default: ",").
 * @param quote - Quote character (default: '"').
 * @returns An array of parsed fields.
 *
 * @throws {TypeError} If input is not a string.
 * @throws {TypeError} If delimiter is not a string.
 * @throws {TypeError} If quote is not a string.
 * @throws {Error} If input is empty.
 * @throws {Error} If delimiter or quote is not exactly one character.
 * @throws {Error} If quotes are not properly closed.
 *
 * @example
 * // Basic usage
 * parseCSVLine("a,b,c"); // Returns ["a", "b", "c"]
 *
 * @example
 * // Quoted fields
 * parseCSVLine('a,"b,c",d'); // Returns ["a", "b,c", "d"]
 *
 * @example
 * // Escaped quotes
 * parseCSVLine('a,"b""c",d'); // Returns ["a", 'b"c', "d"]
 *
 * @example
 * // Custom delimiter
 * parseCSVLine("a|b|c", "|"); // Returns ["a", "b", "c"]
 *
 * @example
 * // Empty fields
 * parseCSVLine("a,,c"); // Returns ["a", "", "c"]
 *
 * @note This function follows RFC 4180 CSV parsing rules.
 * Quoted fields can contain delimiters and newlines.
 * Quotes within quoted fields must be escaped by doubling them.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the length of input string
 */
export function parseCSVLine(
  input: string,
  delimiter: string = ',',
  quote: string = '"',
): string[] {
  // Input validation
  if (typeof input !== 'string') {
    throw new TypeError(`input must be a string, got ${typeof input}`);
  }
  if (typeof delimiter !== 'string') {
    throw new TypeError(`delimiter must be a string, got ${typeof delimiter}`);
  }
  if (typeof quote !== 'string') {
    throw new TypeError(`quote must be a string, got ${typeof quote}`);
  }

  if (input.length === 0) {
    throw new Error('input string cannot be empty');
  }
  if (delimiter.length !== 1) {
    throw new Error(`delimiter must be exactly one character, got "${delimiter}"`);
  }
  if (quote.length !== 1) {
    throw new Error(`quote must be exactly one character, got "${quote}"`);
  }

  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (char === quote) {
      if (inQuotes) {
        // Check if it's an escaped quote (double quote)
        if (i + 1 < input.length && input[i + 1] === quote) {
          currentField += quote;
          i += 2;
          continue;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        // Start of quoted field
        inQuotes = true;
        i++;
        continue;
      }
    }

    if (!inQuotes && char === delimiter) {
      // Field delimiter
      fields.push(currentField);
      currentField = '';
      i++;
      continue;
    }

    currentField += char;
    i++;
  }

  // Add the last field
  fields.push(currentField);

  // Check for unclosed quotes
  if (inQuotes) {
    throw new Error('Unclosed quoted field in CSV line');
  }

  return fields;
}
