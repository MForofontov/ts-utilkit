/**
 * Extracts table data from HTML content.
 *
 * @param html - The HTML content containing tables.
 * @returns Array of tables, where each table is an array of rows (arrays of cell values).
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>';
 * const tables = extractTables(html);
 * // [[['A', 'B'], ['C', 'D']]]
 *
 * @example
 * // Multiple tables
 * const html = '<table><tr><td>1</td></tr></table><table><tr><td>2</td></tr></table>';
 * const tables = extractTables(html);
 * // [[['1']], [['2']]]
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is table data size
 */
export function extractTables(html: string): string[][][] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const tables: string[][][] = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tableMatch: RegExpExecArray | null;

  while ((tableMatch = tableRegex.exec(html)) !== null) {
    const tableContent = tableMatch[1];
    const rows: string[][] = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch: RegExpExecArray | null;

    while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
      const rowContent = rowMatch[1];
      const cells: string[] = [];
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      let cellMatch: RegExpExecArray | null;

      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        let cellText = cellMatch[1];
        // Remove nested tags and clean up text
        cellText = cellText.replace(/<[^>]+>/g, '');
        cellText = cellText.replace(/&nbsp;/g, ' ');
        cellText = cellText.replace(/\s+/g, ' ').trim();
        cells.push(cellText);
      }

      if (cells.length > 0) {
        rows.push(cells);
      }
    }

    if (rows.length > 0) {
      tables.push(rows);
    }
  }

  return tables;
}
