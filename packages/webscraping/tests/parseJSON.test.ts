import { parseJSON } from '../src/parseJSON';

/**
 * Unit tests for the parseJSON function.
 */
describe('parseJSON', () => {
  // Normal usage tests
  it('1. should parse valid JSON object', () => {
    // Arrange
    const jsonString = '{"name":"John","age":30}';
    const expected = { name: 'John', age: 30 };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should parse valid JSON array', () => {
    // Arrange
    const jsonString = '[1,2,3,4,5]';
    const expected = [1, 2, 3, 4, 5];

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should parse nested JSON objects', () => {
    // Arrange
    const jsonString = '{"user":{"name":"John","address":{"city":"NYC"}}}';
    const expected = { user: { name: 'John', address: { city: 'NYC' } } };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should parse JSON with null values', () => {
    // Arrange
    const jsonString = '{"name":"John","age":null}';
    const expected = { name: 'John', age: null };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should parse JSON with boolean values', () => {
    // Arrange
    const jsonString = '{"active":true,"verified":false}';
    const expected = { active: true, verified: false };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should parse JSON with string values', () => {
    // Arrange
    const jsonString = '{"message":"Hello World"}';
    const expected = { message: 'Hello World' };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should parse JSON with number values', () => {
    // Arrange
    const jsonString = '{"int":42,"float":3.14,"negative":-10}';
    const expected = { int: 42, float: 3.14, negative: -10 };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should parse empty JSON object', () => {
    // Arrange
    const jsonString = '{}';
    const expected = {};

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should parse empty JSON array', () => {
    // Arrange
    const jsonString = '[]';
    const expected: never[] = [];

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should parse JSON with TypeScript generic type', () => {
    // Arrange
    interface User {
      name: string;
      age: number;
    }
    const jsonString = '{"name":"John","age":30}';
    const expected: User = { name: 'John', age: 30 };

    // Act
    const result = parseJSON<User>(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return null for invalid JSON', () => {
    // Arrange
    const jsonString = 'invalid json';

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('12. should return null for malformed JSON object', () => {
    // Arrange
    const jsonString = '{"name":"John",}'; // Trailing comma

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('13. should return null for unclosed JSON object', () => {
    // Arrange
    const jsonString = '{"name":"John"';

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('14. should return null for unclosed JSON array', () => {
    // Arrange
    const jsonString = '[1,2,3';

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('15. should return null for empty string', () => {
    // Arrange
    const jsonString = '';

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('16. should return null for single-quoted JSON (invalid)', () => {
    // Arrange
    const jsonString = "{'name':'John'}";

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toBeNull();
  });

  it('17. should handle JSON with escaped characters', () => {
    // Arrange
    const jsonString = '{"message":"Line 1\\nLine 2"}';
    const expected = { message: 'Line 1\nLine 2' };

    // Act
    const result = parseJSON(jsonString);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('18. should throw TypeError when jsonString is not a string', () => {
    // Arrange
    const jsonString = 123 as unknown as string;
    const expectedMessage = 'jsonString must be a string, got number';

    // Act & Assert
    expect(() => parseJSON(jsonString)).toThrow(TypeError);
    expect(() => parseJSON(jsonString)).toThrow(expectedMessage);
  });
});
