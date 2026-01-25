import { serializeToCSV } from '../src/serializeToCSV';

/**
 * Unit tests for the serializeToCSV function.
 */
describe('serializeToCSV', () => {
  // Normal/typical usage
  it('1. should serialize array of objects to CSV with headers', () => {
    // Arrange
    const input = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    const expected = 'name,age\nJohn,30\nJane,25';

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should serialize without headers', () => {
    // Arrange
    const input = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    const expected = 'John,30\nJane,25';

    // Act
    const result = serializeToCSV(input, { includeHeaders: false });

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should use custom delimiter', () => {
    // Arrange
    const input = [{ a: 1, b: 2 }];
    const expected = 'a;b\n1;2';

    // Act
    const result = serializeToCSV(input, { delimiter: ';' });

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should quote values containing delimiter', () => {
    // Arrange
    const input = [{ name: 'Doe, John', age: 30 }];

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toContain('"Doe, John"');
  });

  it('5. should quote values containing newlines', () => {
    // Arrange
    const input = [{ text: 'Hello\nWorld' }];

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toContain('"Hello\nWorld"');
  });

  it('6. should escape double quotes', () => {
    // Arrange
    const input = [{ name: 'John "The Rock" Doe' }];

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toContain('""The Rock""');
  });

  it('7. should handle multiple rows', () => {
    // Arrange
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    // Act
    const result = serializeToCSV(input);
    const lines = result.split('\n');

    // Assert
    expect(lines).toHaveLength(4); // Header + 3 rows
  });

  it('8. should handle boolean values', () => {
    // Arrange
    const input = [{ active: true, deleted: false }];
    const expected = 'active,deleted\ntrue,false';

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('9. should handle null and undefined values', () => {
    // Arrange
    const input = [{ a: null, b: undefined, c: 1 }];

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toContain(',,'); // Empty values for null/undefined
  });

  it('10. should handle single object', () => {
    // Arrange
    const input = [{ name: 'John' }];
    const expected = 'name\nJohn';

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('11. should handle objects with many columns', () => {
    // Arrange
    const input = [{ a: 1, b: 2, c: 3, d: 4, e: 5 }];

    // Act
    const result = serializeToCSV(input);
    const header = result.split('\n')[0];

    // Assert
    expect(header.split(',')).toHaveLength(5);
  });

  it('12. should handle numeric values', () => {
    // Arrange
    const input = [{ int: 42, float: 3.14, negative: -10 }];
    const expected = 'int,float,negative\n42,3.14,-10';

    // Act
    const result = serializeToCSV(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Error cases
  it('13. should throw TypeError when data is not an array', () => {
    // Arrange
    const input: any = { name: 'John' };
    const expectedMessage = 'data must be an array, got object';

    // Act & Assert
    expect(() => serializeToCSV(input)).toThrow(TypeError);
    expect(() => serializeToCSV(input)).toThrow(expectedMessage);
  });

  it('14. should throw Error when array is empty', () => {
    // Arrange
    const input: any[] = [];
    const expectedMessage = 'data array cannot be empty';

    // Act & Assert
    expect(() => serializeToCSV(input)).toThrow(Error);
    expect(() => serializeToCSV(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when delimiter is not string', () => {
    // Arrange
    const input = [{ a: 1 }];
    const options: any = { delimiter: 123 };
    const expectedMessage = 'delimiter must be a string, got number';

    // Act & Assert
    expect(() => serializeToCSV(input, options)).toThrow(TypeError);
    expect(() => serializeToCSV(input, options)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when includeHeaders is not boolean', () => {
    // Arrange
    const input = [{ a: 1 }];
    const options: any = { includeHeaders: 'true' };
    const expectedMessage = 'includeHeaders must be a boolean, got string';

    // Act & Assert
    expect(() => serializeToCSV(input, options)).toThrow(TypeError);
    expect(() => serializeToCSV(input, options)).toThrow(expectedMessage);
  });

  it('17. should throw Error when objects have no keys', () => {
    // Arrange
    const input = [{}];
    const expectedMessage = 'Objects must have at least one key';

    // Act & Assert
    expect(() => serializeToCSV(input)).toThrow(Error);
    expect(() => serializeToCSV(input)).toThrow(expectedMessage);
  });
});
