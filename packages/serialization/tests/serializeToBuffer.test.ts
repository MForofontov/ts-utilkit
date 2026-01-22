import { serializeToBuffer } from '../src/serializeToBuffer';

/**
 * Unit tests for the serializeToBuffer function.
 */
describe('serializeToBuffer', () => {
  // Normal/typical usage
  it('1. should serialize object to Buffer', () => {
    // Arrange
    const input = { name: 'John', age: 30 };

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString('utf8')).toBe('{"name":"John","age":30}');
  });

  it('2. should serialize string to Buffer', () => {
    // Arrange
    const input = 'Hello World';

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString('utf8')).toBe('Hello World');
  });

  it('3. should serialize array to Buffer', () => {
    // Arrange
    const input = [1, 2, 3];

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString('utf8')).toBe('[1,2,3]');
  });

  it('4. should use custom encoding', () => {
    // Arrange
    const input = 'Hello';

    // Act
    const result = serializeToBuffer(input, 'base64');

    // Assert
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it('5. should serialize nested object', () => {
    // Arrange
    const input = { user: { name: 'John', info: { age: 30 } } };

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString()).toContain('user');
    expect(result.toString()).toContain('name');
  });

  it('6. should serialize boolean values', () => {
    // Arrange
    const input = { active: true, deleted: false };

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toContain('true');
    expect(result.toString()).toContain('false');
  });

  it('7. should serialize null', () => {
    // Arrange
    const input = null;

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toBe('null');
  });

  it('8. should serialize numbers', () => {
    // Arrange
    const input = { int: 42, float: 3.14 };

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toContain('42');
    expect(result.toString()).toContain('3.14');
  });

  // Edge cases
  it('9. should handle empty object', () => {
    // Arrange
    const input = {};

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toBe('{}');
  });

  it('10. should handle empty array', () => {
    // Arrange
    const input: any[] = [];

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toBe('[]');
  });

  it('11. should handle empty string', () => {
    // Arrange
    const input = '';

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toBe('');
    expect(result.length).toBe(0);
  });

  it('12. should handle special characters', () => {
    // Arrange
    const input = { text: 'Hello\n"World"' };

    // Act
    const result = serializeToBuffer(input);

    // Assert
    expect(result.toString()).toContain('\\n');
    expect(result.toString()).toContain('\\"');
  });

  // Error cases
  it('13. should throw TypeError when encoding is not a string', () => {
    // Arrange
    const input = 'hello';
    const invalidEncoding: any = 123;
    const expectedMessage = 'encoding must be a string, got number';

    // Act & Assert
    expect(() => serializeToBuffer(input, invalidEncoding)).toThrow(TypeError);
    expect(() => serializeToBuffer(input, invalidEncoding)).toThrow(
      expectedMessage,
    );
  });

  it('14. should throw Error for circular references', () => {
    // Arrange
    const input: any = { a: 1 };
    input.self = input;

    // Act & Assert
    expect(() => serializeToBuffer(input)).toThrow(Error);
    expect(() => serializeToBuffer(input)).toThrow(
      'Failed to serialize to Buffer',
    );
  });
});
