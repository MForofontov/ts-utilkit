import { deserializeFromBuffer } from '../src/deserializeFromBuffer';

/**
 * Unit tests for the deserializeFromBuffer function.
 */
describe('deserializeFromBuffer', () => {
  // Normal/typical usage
  it('1. should deserialize Buffer to object', () => {
    // Arrange
    const input = Buffer.from('{"name":"John","age":30}');
    const expected = { name: 'John', age: 30 };

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should deserialize Buffer to array', () => {
    // Arrange
    const input = Buffer.from('[1,2,3]');
    const expected = [1, 2, 3];

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should deserialize Buffer to string without parsing', () => {
    // Arrange
    const input = Buffer.from('Hello World');
    const expected = 'Hello World';

    // Act
    const result = deserializeFromBuffer(input, 'utf8', false);

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should use custom encoding', () => {
    // Arrange
    const input = Buffer.from('Hello', 'utf8');

    // Act
    const result = deserializeFromBuffer<string>(input, 'utf8', false);

    // Assert
    expect(result).toBe('Hello');
  });

  it('5. should deserialize nested object', () => {
    // Arrange
    const input = Buffer.from('{"user":{"name":"John","info":{"age":30}}}');
    const expected = { user: { name: 'John', info: { age: 30 } } };

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should deserialize with type parameter', () => {
    // Arrange
    const input = Buffer.from('{"name":"John","age":30}');

    // Act
    const result = deserializeFromBuffer<{ name: string; age: number }>(input);

    // Assert
    expect(result.name).toBe('John');
    expect(result.age).toBe(30);
  });

  it('7. should deserialize null', () => {
    // Arrange
    const input = Buffer.from('null');

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toBeNull();
  });

  it('8. should deserialize boolean values', () => {
    // Arrange
    const input = Buffer.from('{"active":true,"deleted":false}');
    const expected = { active: true, deleted: false };

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = Buffer.from('{}');
    const expected = {};

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input = Buffer.from('[]');
    const expected: any[] = [];

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle empty Buffer when not parsing', () => {
    // Arrange
    const input = Buffer.from('');

    // Act
    const result = deserializeFromBuffer<string>(input, 'utf8', false);

    // Assert
    expect(result).toBe('');
  });

  it('12. should handle special characters', () => {
    // Arrange
    const input = Buffer.from('{"text":"Hello\\n\\"World\\""}');
    const expected = { text: 'Hello\n"World"' };

    // Act
    const result = deserializeFromBuffer(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('13. should throw TypeError when buffer is not a Buffer', () => {
    // Arrange
    const input: any = 'not a buffer';
    const expectedMessage = 'buffer must be a Buffer, got string';

    // Act & Assert
    expect(() => deserializeFromBuffer(input)).toThrow(TypeError);
    expect(() => deserializeFromBuffer(input)).toThrow(expectedMessage);
  });

  it('14. should throw TypeError when encoding is not a string', () => {
    // Arrange
    const input = Buffer.from('hello');
    const invalidEncoding: any = 123;
    const expectedMessage = 'encoding must be a string, got number';

    // Act & Assert
    expect(() => deserializeFromBuffer(input, invalidEncoding)).toThrow(
      TypeError,
    );
    expect(() => deserializeFromBuffer(input, invalidEncoding)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw TypeError when parseJSON is not boolean', () => {
    // Arrange
    const input = Buffer.from('{}');
    const invalidParseJSON: any = 'true';
    const expectedMessage = 'parseJSON must be a boolean, got string';

    // Act & Assert
    expect(() =>
      deserializeFromBuffer(input, 'utf8', invalidParseJSON),
    ).toThrow(TypeError);
    expect(() =>
      deserializeFromBuffer(input, 'utf8', invalidParseJSON),
    ).toThrow(expectedMessage);
  });

  it('16. should throw Error for invalid JSON', () => {
    // Arrange
    const input = Buffer.from('{name: "John"}'); // Invalid JSON

    // Act & Assert
    expect(() => deserializeFromBuffer(input)).toThrow(Error);
    expect(() => deserializeFromBuffer(input)).toThrow(
      'Failed to deserialize from Buffer',
    );
  });
});
