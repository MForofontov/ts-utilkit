import { serializeToJSON } from '../src/serializeToJSON';

/**
 * Unit tests for the serializeToJSON function.
 */
describe('serializeToJSON', () => {
  // Normal/typical usage
  it('1. should serialize simple object to JSON', () => {
    // Arrange
    const input = { name: 'John', age: 30 };
    const expected = '{"name":"John","age":30}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should serialize nested object to JSON', () => {
    // Arrange
    const input = { user: { name: 'John', info: { age: 30 } } };
    const expected = '{"user":{"name":"John","info":{"age":30}}}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should serialize array to JSON', () => {
    // Arrange
    const input = [1, 2, 3, 4, 5];
    const expected = '[1,2,3,4,5]';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should serialize with pretty formatting', () => {
    // Arrange
    const input = { name: 'John', age: 30 };

    // Act
    const result = serializeToJSON(input, true);

    // Assert
    expect(result).toContain('\n');
    expect(result).toContain('  ');
  });

  it('5. should serialize with custom indentation', () => {
    // Arrange
    const input = { name: 'John' };

    // Act
    const result = serializeToJSON(input, true, 4);

    // Assert
    expect(result).toContain('    '); // 4 spaces
  });

  it('6. should serialize null value', () => {
    // Arrange
    const input = null;
    const expected = 'null';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should serialize boolean values', () => {
    // Arrange
    const input = { a: true, b: false };
    const expected = '{"a":true,"b":false}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should serialize numbers', () => {
    // Arrange
    const input = { int: 42, float: 3.14, negative: -10 };
    const expected = '{"int":42,"float":3.14,"negative":-10}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = {};
    const expected = '{}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input: any[] = [];
    const expected = '[]';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('11. should remove undefined values', () => {
    // Arrange
    const input = { a: 1, b: undefined, c: 2 };
    const expected = '{"a":1,"c":2}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('12. should remove functions', () => {
    // Arrange
    const input = { a: 1, b: () => {}, c: 2 };
    const expected = '{"a":1,"c":2}';

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('13. should handle special characters in strings', () => {
    // Arrange
    const input = { text: 'Hello\n"World"' };

    // Act
    const result = serializeToJSON(input);

    // Assert
    expect(result).toContain('\\n');
    expect(result).toContain('\\"');
  });

  // Error cases
  it('14. should throw TypeError when pretty is not boolean', () => {
    // Arrange
    const input = { a: 1 };
    const invalidPretty: any = 'true';
    const expectedMessage = 'pretty must be a boolean, got string';

    // Act & Assert
    expect(() => serializeToJSON(input, invalidPretty)).toThrow(TypeError);
    expect(() => serializeToJSON(input, invalidPretty)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw TypeError when space is not number', () => {
    // Arrange
    const input = { a: 1 };
    const invalidSpace: any = '2';
    const expectedMessage = 'space must be a number, got string';

    // Act & Assert
    expect(() => serializeToJSON(input, true, invalidSpace)).toThrow(TypeError);
    expect(() => serializeToJSON(input, true, invalidSpace)).toThrow(
      expectedMessage,
    );
  });

  it('16. should throw TypeError when space is NaN', () => {
    // Arrange
    const input = { a: 1 };
    const expectedMessage = 'space must be a valid number, not NaN';

    // Act & Assert
    expect(() => serializeToJSON(input, true, NaN)).toThrow(TypeError);
    expect(() => serializeToJSON(input, true, NaN)).toThrow(expectedMessage);
  });

  it('17. should throw Error for circular references', () => {
    // Arrange
    const input: any = { a: 1 };
    input.self = input;

    // Act & Assert
    expect(() => serializeToJSON(input)).toThrow(Error);
    expect(() => serializeToJSON(input)).toThrow('Failed to serialize to JSON');
  });
});
