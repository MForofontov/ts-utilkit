import { deserializeFromCSV } from '../src/deserializeFromCSV';

/**
 * Unit tests for the deserializeFromCSV function.
 */
describe('deserializeFromCSV', () => {
  // Normal/typical usage
  it('1. should deserialize CSV with headers', () => {
    // Arrange
    const input = 'name,age\nJohn,30\nJane,25';
    const expected = [
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' },
    ];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should deserialize without headers', () => {
    // Arrange
    const input = '1,2\n3,4';
    const expected = [
      { col0: '1', col1: '2' },
      { col0: '3', col1: '4' },
    ];

    // Act
    const result = deserializeFromCSV(input, { hasHeaders: false });

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should use custom delimiter', () => {
    // Arrange
    const input = 'a;b\n1;2';
    const expected = [{ a: '1', b: '2' }];

    // Act
    const result = deserializeFromCSV(input, { delimiter: ';' });

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should handle quoted values', () => {
    // Arrange
    const input = 'name,age\n"Doe, John",30';
    const expected = [{ name: 'Doe, John', age: '30' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle escaped quotes', () => {
    // Arrange
    const input = 'name\n"John ""The Rock"" Doe"';
    const expected = [{ name: 'John "The Rock" Doe' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should handle values with quotes', () => {
    // Arrange
    const input = 'text\n"Hello World"';
    const expected = [{ text: 'Hello World' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle multiple rows', () => {
    // Arrange
    const input = 'id,name\n1,Alice\n2,Bob\n3,Charlie';

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ id: '1', name: 'Alice' });
    expect(result[2]).toEqual({ id: '3', name: 'Charlie' });
  });

  it('8. should handle single row', () => {
    // Arrange
    const input = 'name,age\nJohn,30';
    const expected = [{ name: 'John', age: '30' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty values', () => {
    // Arrange
    const input = 'a,b,c\n1,,3';
    const expected = [{ a: '1', b: '', c: '3' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should skip empty lines', () => {
    // Arrange
    const input = 'name,age\nJohn,30\n\nJane,25';
    const expected = [
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' },
    ];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle many columns', () => {
    // Arrange
    const input = 'a,b,c,d,e\n1,2,3,4,5';
    const expected = [{ a: '1', b: '2', c: '3', d: '4', e: '5' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle trailing commas', () => {
    // Arrange
    const input = 'a,b\n1,2,';
    const expected = [{ a: '1', b: '2' }];

    // Act
    const result = deserializeFromCSV(input);

    // Assert
    expect(result[0].a).toBe('1');
    expect(result[0].b).toBe('2');
  });

  // Error cases
  it('13. should throw TypeError when csvString is not a string', () => {
    // Arrange
    const input: any = ['name', 'age'];
    const expectedMessage = 'csvString must be a string, got object';

    // Act & Assert
    expect(() => deserializeFromCSV(input)).toThrow(TypeError);
    expect(() => deserializeFromCSV(input)).toThrow(expectedMessage);
  });

  it('14. should throw Error when csvString is empty', () => {
    // Arrange
    const input = '';
    const expectedMessage = 'csvString cannot be empty';

    // Act & Assert
    expect(() => deserializeFromCSV(input)).toThrow(Error);
    expect(() => deserializeFromCSV(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when delimiter is not string', () => {
    // Arrange
    const input = 'a,b\n1,2';
    const options: any = { delimiter: 123 };
    const expectedMessage = 'delimiter must be a string, got number';

    // Act & Assert
    expect(() => deserializeFromCSV(input, options)).toThrow(TypeError);
    expect(() => deserializeFromCSV(input, options)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when hasHeaders is not boolean', () => {
    // Arrange
    const input = 'a,b\n1,2';
    const options: any = { hasHeaders: 'true' };
    const expectedMessage = 'hasHeaders must be a boolean, got string';

    // Act & Assert
    expect(() => deserializeFromCSV(input, options)).toThrow(TypeError);
    expect(() => deserializeFromCSV(input, options)).toThrow(expectedMessage);
  });

  it('17. should throw Error when only whitespace', () => {
    // Arrange
    const input = '   \n   ';
    const expectedMessage = 'csvString must contain at least one line';

    // Act & Assert
    expect(() => deserializeFromCSV(input)).toThrow(Error);
    expect(() => deserializeFromCSV(input)).toThrow(expectedMessage);
  });
});
