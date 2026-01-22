import { extractTables } from '../src/extractTables';

/**
 * Unit tests for the extractTables function.
 */
describe('extractTables', () => {
  // Normal usage tests
  it('1. should extract simple table', () => {
    // Arrange
    const html = `
      <table>
        <tr><td>A</td><td>B</td></tr>
        <tr><td>C</td><td>D</td></tr>
      </table>
    `;
    const expected = [
      [
        ['A', 'B'],
        ['C', 'D'],
      ],
    ];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract table with headers', () => {
    // Arrange
    const html = `
      <table>
        <tr><th>Name</th><th>Age</th></tr>
        <tr><td>John</td><td>30</td></tr>
        <tr><td>Jane</td><td>25</td></tr>
      </table>
    `;
    const expected = [
      [
        ['Name', 'Age'],
        ['John', '30'],
        ['Jane', '25'],
      ],
    ];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract multiple tables', () => {
    // Arrange
    const html = `
      <table><tr><td>Table 1</td></tr></table>
      <table><tr><td>Table 2</td></tr></table>
    `;
    const expected = [[['Table 1']], [['Table 2']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should handle mixed th and td cells', () => {
    // Arrange
    const html = `
      <table>
        <tr><th>Header 1</th><td>Data 1</td></tr>
        <tr><td>Data 2</td><th>Header 2</th></tr>
      </table>
    `;
    const expected = [
      [
        ['Header 1', 'Data 1'],
        ['Data 2', 'Header 2'],
      ],
    ];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should clean whitespace in cells', () => {
    // Arrange
    const html = `
      <table>
        <tr><td>  Text with spaces  </td><td>Normal</td></tr>
      </table>
    `;
    const expected = [[['Text with spaces', 'Normal']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should remove nested tags from cells', () => {
    // Arrange
    const html = `
      <table>
        <tr><td><strong>Bold</strong> text</td><td><a href="#">Link</a></td></tr>
      </table>
    `;
    const expected = [[['Bold text', 'Link']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should decode non-breaking spaces', () => {
    // Arrange
    const html = `
      <table>
        <tr><td>Hello&nbsp;World</td></tr>
      </table>
    `;
    const expected = [[['Hello World']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle table with attributes', () => {
    // Arrange
    const html = `
      <table class="data-table" id="table1">
        <tr class="row"><td class="cell">Data</td></tr>
      </table>
    `;
    const expected = [[['Data']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should extract table with tbody', () => {
    // Arrange
    const html = `
      <table>
        <tbody>
          <tr><td>A</td><td>B</td></tr>
          <tr><td>C</td><td>D</td></tr>
        </tbody>
      </table>
    `;
    const expected = [
      [
        ['A', 'B'],
        ['C', 'D'],
      ],
    ];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should extract table with thead and tbody', () => {
    // Arrange
    const html = `
      <table>
        <thead>
          <tr><th>Header 1</th><th>Header 2</th></tr>
        </thead>
        <tbody>
          <tr><td>Data 1</td><td>Data 2</td></tr>
        </tbody>
      </table>
    `;
    const expected = [
      [
        ['Header 1', 'Header 2'],
        ['Data 1', 'Data 2'],
      ],
    ];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no tables found', () => {
    // Arrange
    const html = '<div>No tables here</div>';
    const expected: string[][][] = [];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: string[][][] = [];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle empty table', () => {
    // Arrange
    const html = '<table></table>';
    const expected: string[][][] = [];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('14. should handle table with empty rows', () => {
    // Arrange
    const html = `
      <table>
        <tr></tr>
        <tr><td>Data</td></tr>
      </table>
    `;
    const expected = [[['Data']]];

    // Act
    const result = extractTables(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('15. should handle nested tables', () => {
    // Arrange
    const html = `
      <table>
        <tr><td>Outer</td></tr>
        <tr><td><table><tr><td>Inner</td></tr></table></td></tr>
      </table>
    `;

    // Act
    const result = extractTables(html);

    // Assert
    // Should extract both tables
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0]).toContainEqual(['Outer']);
  });

  // Error cases
  it('16. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractTables(html)).toThrow(TypeError);
    expect(() => extractTables(html)).toThrow(expectedMessage);
  });
});
