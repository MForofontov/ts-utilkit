import { deserializeFromJSON } from '../src/deserializeFromJSON';

/**
 * Unit tests for the deserializeFromJSON function.
 */
describe('deserializeFromJSON', () => {
  // Normal/typical usage
  it('1. should deserialize JSON string to object', () => {
    // Arrange
    const input = '{"name":"John","age":30}';
    const expected = { name: 'John', age: 30 };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should deserialize nested JSON', () => {
    // Arrange
    const input = '{"user":{"name":"John","info":{"age":30}}}';
    const expected = { user: { name: 'John', info: { age: 30 } } };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should deserialize JSON array', () => {
    // Arrange
    const input = '[1,2,3,4,5]';
    const expected = [1, 2, 3, 4, 5];

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should deserialize with type parameter', () => {
    // Arrange
    const input = '{"name":"John","age":30}';

    // Act
    const result = deserializeFromJSON<{ name: string; age: number }>(input);

    // Assert
    expect(result.name).toBe('John');
    expect(result.age).toBe(30);
  });

  it('5. should deserialize with validation function', () => {
    // Arrange
    const input = '{"age":30}';
    const validate = (data: any): boolean => typeof data.age === 'number';

    // Act
    const result = deserializeFromJSON(input, validate);

    // Assert
    expect(result).toEqual({ age: 30 });
  });

  it('6. should deserialize null', () => {
    // Arrange
    const input = 'null';

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toBeNull();
  });

  it('7. should deserialize boolean values', () => {
    // Arrange
    const input = '{"a":true,"b":false}';
    const expected = { a: true, b: false };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should deserialize numbers', () => {
    // Arrange
    const input = '{"int":42,"float":3.14,"negative":-10}';
    const expected = { int: 42, float: 3.14, negative: -10 };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = '{}';
    const expected = {};

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input = '[]';
    const expected: any[] = [];

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle escaped characters', () => {
    // Arrange
    const input = '{"text":"Hello\\n\\"World\\""}';
    const expected = { text: 'Hello\n"World"' };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle whitespace in JSON', () => {
    // Arrange
    const input = '  { "name" : "John" }  ';
    const expected = { name: 'John' };

    // Act
    const result = deserializeFromJSON(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('13. should throw TypeError when jsonString is not a string', () => {
    // Arrange
    const input: any = { name: 'John' };
    const expectedMessage = 'jsonString must be a string, got object';

    // Act & Assert
    expect(() => deserializeFromJSON(input)).toThrow(TypeError);
    expect(() => deserializeFromJSON(input)).toThrow(expectedMessage);
  });

  it('14. should throw TypeError when validate is not a function', () => {
    // Arrange
    const input = '{"age":30}';
    const invalidValidate: any = 'not a function';
    const expectedMessage = 'validate must be a function, got string';

    // Act & Assert
    expect(() => deserializeFromJSON(input, invalidValidate)).toThrow(
      TypeError,
    );
    expect(() => deserializeFromJSON(input, invalidValidate)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw Error for invalid JSON', () => {
    // Arrange
    const input = '{name: "John"}'; // Invalid - missing quotes

    // Act & Assert
    expect(() => deserializeFromJSON(input)).toThrow(Error);
    expect(() => deserializeFromJSON(input)).toThrow('Failed to parse JSON');
  });

  it('16. should throw Error when validation fails', () => {
    // Arrange
    const input = '{"age":"thirty"}';
    const validate = (data: any): boolean => typeof data.age === 'number';
    const expectedMessage = 'Validation failed for deserialized data';

    // Act & Assert
    expect(() => deserializeFromJSON(input, validate)).toThrow(Error);
    expect(() => deserializeFromJSON(input, validate)).toThrow(expectedMessage);
  });
});
