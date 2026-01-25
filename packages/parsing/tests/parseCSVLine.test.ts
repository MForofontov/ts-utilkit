import { parseCSVLine } from '../src/parseCSVLine';

/**
 * Unit tests for the parseCSVLine function.
 */
describe('parseCSVLine', () => {
  // Test case 1: Parse basic CSV line
  it('1. should parse basic CSV line', () => {
    // Arrange
    const input = 'a,b,c';
    const expected = ['a', 'b', 'c'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Parse quoted fields with commas
  it('2. should parse quoted fields with commas', () => {
    // Arrange
    const input = 'a,"b,c",d';
    const expected = ['a', 'b,c', 'd'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Parse escaped quotes
  it('3. should parse escaped quotes', () => {
    // Arrange
    const input = 'a,"b""c",d';
    const expected = ['a', 'b"c', 'd'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Parse with custom delimiter
  it('4. should parse with custom delimiter', () => {
    // Arrange
    const input = 'a|b|c';
    const expected = ['a', 'b', 'c'];

    // Act
    const result = parseCSVLine(input, '|');

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Parse empty fields
  it('5. should parse empty fields', () => {
    // Arrange
    const input = 'a,,c';
    const expected = ['a', '', 'c'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Parse single field
  it('6. should parse single field', () => {
    // Arrange
    const input = 'single';
    const expected = ['single'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Parse quoted empty field
  it('7. should parse quoted empty field', () => {
    // Arrange
    const input = 'a,"",c';
    const expected = ['a', '', 'c'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Parse multiple escaped quotes
  it('8. should parse multiple escaped quotes', () => {
    // Arrange
    const input = '"a""b""c"';
    const expected = ['a"b"c'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Parse complex quoted field
  it('9. should parse complex quoted field', () => {
    // Arrange
    const input = '"hello ""world"", foo",bar';
    const expected = ['hello "world", foo', 'bar'];

    // Act
    const result = parseCSVLine(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Parse with custom quote character
  it('10. should parse with custom quote character', () => {
    // Arrange
    const input = "a,'b,c',d";
    const expected = ['a', 'b,c', 'd'];

    // Act
    const result = parseCSVLine(input, ',', "'");

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Throw TypeError for non-string input
  it('11. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseCSVLine(input)).toThrow(TypeError);
    expect(() => parseCSVLine(input)).toThrow('input must be a string');
  });

  // Test case 12: Throw Error for empty input
  it('12. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseCSVLine(input)).toThrow(Error);
    expect(() => parseCSVLine(input)).toThrow('input string cannot be empty');
  });

  // Test case 13: Throw Error for unclosed quotes
  it('13. should throw Error for unclosed quotes', () => {
    // Arrange
    const input = 'a,"b,c';

    // Act & Assert
    expect(() => parseCSVLine(input)).toThrow(Error);
    expect(() => parseCSVLine(input)).toThrow('Unclosed quoted field');
  });

  // Test case 14: Throw Error for invalid delimiter length
  it('14. should throw Error when delimiter is not one character', () => {
    // Arrange
    const input = 'a,b,c';
    const delimiter = ',,';

    // Act & Assert
    expect(() => parseCSVLine(input, delimiter)).toThrow(Error);
    expect(() => parseCSVLine(input, delimiter)).toThrow(
      'exactly one character',
    );
  });
});
