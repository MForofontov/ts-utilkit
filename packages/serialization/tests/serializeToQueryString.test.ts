import { serializeToQueryString } from '../src/serializeToQueryString';

/**
 * Unit tests for the serializeToQueryString function.
 */
describe('serializeToQueryString', () => {
  // Normal/typical usage
  it('1. should serialize simple object to query string', () => {
    // Arrange
    const input = { name: 'John', age: 30 };
    const expected = 'name=John&age=30';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should serialize with array using repeat format', () => {
    // Arrange
    const input = { items: [1, 2, 3] };
    const expected = 'items=1&items=2&items=3';

    // Act
    const result = serializeToQueryString(input, { arrayFormat: 'repeat' });

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should serialize with array using brackets format', () => {
    // Arrange
    const input = { items: [1, 2, 3] };
    const expected = 'items[]=1&items[]=2&items[]=3';

    // Act
    const result = serializeToQueryString(input, { arrayFormat: 'brackets' });

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should serialize with array using comma format', () => {
    // Arrange
    const input = { items: [1, 2, 3] };
    const expected = 'items=1,2,3';

    // Act
    const result = serializeToQueryString(input, { arrayFormat: 'comma' });

    // Assert
    expect(result).toBe(expected);
  });

  it('5. should encode special characters by default', () => {
    // Arrange
    const input = { text: 'Hello World!' };

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toContain('Hello%20World');
  });

  it('6. should not encode when encodeValues is false', () => {
    // Arrange
    const input = { text: 'Hello World' };
    const expected = 'text=Hello World';

    // Act
    const result = serializeToQueryString(input, { encodeValues: false });

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should handle boolean values', () => {
    // Arrange
    const input = { active: true, deleted: false };
    const expected = 'active=true&deleted=false';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should handle numeric values', () => {
    // Arrange
    const input = { id: 123, price: 45.67, count: -10 };
    const expected = 'id=123&price=45.67&count=-10';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('9. should skip null values', () => {
    // Arrange
    const input = { a: 1, b: null, c: 2 };
    const expected = 'a=1&c=2';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('10. should skip undefined values', () => {
    // Arrange
    const input = { a: 1, b: undefined, c: 2 };
    const expected = 'a=1&c=2';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('11. should handle empty object', () => {
    // Arrange
    const input = {};
    const expected = '';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('12. should handle empty array', () => {
    // Arrange
    const input = { items: [] };
    const expected = '';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe('');
  });

  it('13. should handle single property', () => {
    // Arrange
    const input = { name: 'John' };
    const expected = 'name=John';

    // Act
    const result = serializeToQueryString(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Error cases
  it('14. should throw TypeError when data is not an object', () => {
    // Arrange
    const input: any = 'not an object';
    const expectedMessage = 'data must be an object, got string';

    // Act & Assert
    expect(() => serializeToQueryString(input)).toThrow(TypeError);
    expect(() => serializeToQueryString(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when data is null', () => {
    // Arrange
    const input: any = null;
    const expectedMessage = 'data must be an object, got object';

    // Act & Assert
    expect(() => serializeToQueryString(input)).toThrow(TypeError);
    expect(() => serializeToQueryString(input)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when data is an array', () => {
    // Arrange
    const input: any = [1, 2, 3];
    const expectedMessage = 'data must be an object, got array';

    // Act & Assert
    expect(() => serializeToQueryString(input)).toThrow(TypeError);
    expect(() => serializeToQueryString(input)).toThrow(expectedMessage);
  });

  it('17. should throw TypeError when encodeValues is not boolean', () => {
    // Arrange
    const input = { a: 1 };
    const options: any = { encodeValues: 'true' };
    const expectedMessage = 'encodeValues must be a boolean, got string';

    // Act & Assert
    expect(() => serializeToQueryString(input, options)).toThrow(TypeError);
    expect(() => serializeToQueryString(input, options)).toThrow(
      expectedMessage,
    );
  });

  it('18. should throw TypeError for invalid arrayFormat', () => {
    // Arrange
    const input = { items: [1, 2] };
    const options: any = { arrayFormat: 'invalid' };
    const expectedMessage =
      "arrayFormat must be 'repeat', 'brackets', or 'comma'";

    // Act & Assert
    expect(() => serializeToQueryString(input, options)).toThrow(TypeError);
    expect(() => serializeToQueryString(input, options)).toThrow(
      expectedMessage,
    );
  });
});
